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

  function handleSliderChange(event) {
    const value = event.target.value;
    // Update only the currently selected option
    setOptions((currentOptions) =>
      currentOptions.map((option, index) => {
        if (index === selectedOptionIndex) {
          return { ...option, value: value };
        }
        return option;
      })
    );
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
    </div>
  );
}

export default App;
