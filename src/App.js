// import Profile from "./components/Profile";
// import Cropper from "./components/cropper";
import Slider from "./components/Slider";
import React, { useState } from "react";
import "./App.css";
import SidbarItem from "./components/SidbarItem";
const DEFAULT_OPTIONS = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
  {
    name: "Rotate",
    property: "rotate",
    value: 0,
    range: { min: 0, max: 360 },
    unit: "deg",
  },
];
function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];
  const [image, setImage] = useState("");
  const [history, setHistory] = useState([]);

  function handleBackButtonClick() {
    if (history.length > 0) {
      console.log(history);
      const previousOptions = history.pop();
      setOptions(previousOptions);
      setHistory(history.slice(0, -1)); 
    }
  }

  function handleSliderChange(event) {
    const value = parseInt(event.target.value, 10);  

    
    setOptions((currentOptions) => {
      setHistory((prevHistory) => [...prevHistory, currentOptions]);

      return currentOptions.map((option, index) => {
        if (index === selectedOptionIndex) {
          return { ...option, value: value };
        }
        return option;
      });
    });
  }

  function getImageStyle() {
    const filters = options
      .filter((option) => option.property !== "rotate")
      .map((option) => `${option.property}(${option.value}${option.unit})`)
      .join(" ");
    const transforms = options
      .filter((option) => option.property === "rotate")
      .map((option) => `${option.property}(${option.value}${option.unit})`)
      .join(" ");

    return { filter: filters, transform: transforms };
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result); // Set the image URL to the result of FileReader
      };
      reader.readAsDataURL(file);
    }
  }
  function downloadImage() {
    if (image) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const rotation = options.find(
          (option) => option.property === "rotate"
        ).value;

        const width =
          Math.abs(Math.cos((rotation * Math.PI) / 180) * img.width) +
          Math.abs(Math.sin((rotation * Math.PI) / 180) * img.height);
        const height =
          Math.abs(Math.sin((rotation * Math.PI) / 180) * img.width) +
          Math.abs(Math.cos((rotation * Math.PI) / 180) * img.height);
        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "edited_image.png";

        document.body.appendChild(link);

        // Trigger the download
        link.click();

        document.body.removeChild(link);
      };
      img.src = image;
    }
  }

  return (
    <div className="w-screen flex flex-col h-screen mt-10">
      <div className="main-image h-[60%] w-[100%] flex justify-center items-center overflow-hidden">
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={getImageStyle()}
            className="max-h-full max-w-full"
          />
        )}
      </div>
      <div className="sidebar flex items-center justify-center flex-wrap">
        {options.map((options, index) => {
          return (
            <SidbarItem
              name={options.name}
              active={index === selectedOptionIndex}
              handleclick={() => setSelectedOptionIndex(index)}
            />
          );
        })}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
        unit={selectedOption.unit}
      />
      <div className="flex items-center justify-center w-full mx-auto">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {image && <button onClick={downloadImage}>Download Image</button>}
      <button onClick={handleBackButtonClick}>Back</button>
    </div>
  );
}

export default App;
