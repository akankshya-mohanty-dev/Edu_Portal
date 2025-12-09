import React from "react";
// import defaultBanner from "../../../assets/common/bannerBg.png";
import defaultBanner from "../../../assets/new_home-1/product-details/backgroundImage.png";

const TopBanner = ({ heading, banner }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner || defaultBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-40 md:h-52 lg:h-72 flex items-center justify-center"
    >
      <h1 className="text-sm md:text-lg lg:text-xl text-white belleza uppercase">
        {heading}
      </h1>
    </div>
  );
};

export default TopBanner;
