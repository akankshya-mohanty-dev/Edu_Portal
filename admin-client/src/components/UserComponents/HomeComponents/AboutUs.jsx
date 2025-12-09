import React from "react";
import img1 from "../../../assets/aboutus/img1.png";
import img2 from "../../../assets/aboutus/img2.png";
import img3 from "../../../assets/aboutus/img3.png";
import img4 from "../../../assets/aboutus/aboutusLogo.svg";
const AboutUs = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:gap-10 items-center justify-center xl:mx-20 mx-10  bg-white">
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 lg:w-1/2 ">
        <img
          src={img1}
          alt="Herbal powders"
          className="rounded-lg w-full object-cover h-[90%]"
        />
        <div className="flex flex-col md:gap-5 gap-3">
          <img
            src={img2}
            alt="Massage therapy"
            className="rounded-lg w-full object-cover xl:h-[43.5%] h-[42%]"
          />
          <img
            src={img3}
            alt="Natural healing ingredients"
            className="rounded-lg w-full object-cover xl:h-[43.5%] sm:h-[43%] h-[42%]"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="lg:w-1/2 lg:py-6 pb-4 text-gray-700">
        <h2
          className="sm:text-5xl text-3xl font-medium text-[#252525] flex items-end lg:mb-10 mb-7 belleza"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
        >
          ABOUT US
          <img src={img4} className="bg-cover" />
        </h2>
        <p className="mt-4 text-sm md:text-lg xl:text-2xl font-normal tracking-wide text-[#2F2F2F] montserrat">
          The Lady Vines Holistic Wellness Center is an innovative counseling
          service provider that promotes a comprehensive Mind, Body, Spirit
          approach to healing. We believe in empowering people to make Healthy
          Choices to create Wellness and Success in their lives.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
