import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = () => {
  const [src, selectFile] = useState(null);
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Image Cropper</h1>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-6">
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded p-2"
          />
        </div>
        <div className="col-span-7">
          {src && 
            <div>
              <ReactCrop
                src={src}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Cropper;
