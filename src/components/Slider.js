import React from "react";

function Slider({ min, max, value, handleChange , unit}) {
  return (
    <div className="slider-container relative w-[100%] max-w-screen-md mx-auto">
      <div className="relative w-[100%] flex items-center justify-center">
          <input
            type="range"
            className="slider w-full bg-slate-700"
            style={{ position: "relative", accentColor:'red', height:'30px' }}
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
          />
          <span
            className="slider-value font-bold "
            style={{
              position: "absolute",
              left: `${((value - min) / (max - min)) * 100}%`,
              top: "20px",
            }}
          >
            {value}{unit}
          </span>
      </div>
    </div>
  );
}

export default Slider;
