import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { RiStarLine, RiStarOffFill } from "react-icons/ri";

const Cells = ({ position, color }) => {
  const cellsPosition = (po) => {
    if (po === "top" || po === "bottom") {
      return 'grid-cols-3 basis-[20%]';
    }
    if (po === "right" || po === "left") {
      return 'grid-cols-6 basis-[40%]';
    }
  };

  const collerizer = (i, color, po) => {
    if (po === "left" && [1, 7, 8, 9, 10, 11].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "top" && [5, 4, 7, 10, 13, 16].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "right" && [16, 10, 7, 9, 8, 6].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "bottom" && [12, 13, 10, 7, 4, 1].includes(i)) {
      return `bg-${color}-500`;
    }
  };


  return (
    <div className={`grid w-full h-full border border-black ${cellsPosition(position)}`}>
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={`path-cell text-center text-sm border border-black flex justify-center items-center relative h-7 leading-6 ${color}-${i} ${collerizer(i, color, position)}`}
        >
          {i === 14 && position === 'left' && <RiStarLine className="text-2xl text-gray-300 absolute z-0 token" />}
          {i === 6 && position === 'top' && <RiStarLine className="text-2xl text-gray-300 absolute z-0 token" />}
          {i === 3 && position === 'right' && <RiStarLine className="text-2xl text-gray-300 absolute z-0 token" />}
          {i === 11 && position === 'bottom' && <RiStarLine className="text-2xl text-gray-300 absolute z-0 token" />}
        </div>
      ))}
    </div>
  );
};

export default Cells;
