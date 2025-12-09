import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const TopNavbar = () => {
  return (
    <div
      className="bg-[#1e3f65] py-3 md:px-10 lg:px-20 hidden md:grid grid-cols-3 text-white items-center"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div>
        <a href="tel: +91 123 456 7890" className="text-base font-normal">
          +91 123 456 7890
        </a>
      </div>
      <h1 className="font-medium text-base text-center">
        Note: Get study materials delivered for free.
      </h1>
      <div className="text-right">
        <a
          href="mailto:theladyvines2020@gmail.com"
          className="outline-none font-medium"
        >
          edupay@gmail.com
        </a>
      </div>
    </div>
  );
};

export default TopNavbar;
