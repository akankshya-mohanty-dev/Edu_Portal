import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ value = 0, total = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(total)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index} className="text-yellow-400 text-lg">
            {value >= starValue ? <AiFillStar /> : <AiOutlineStar />}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
