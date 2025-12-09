import React from "react";
import bgImage from "../../../assets/new_home-1/home/contactCard/bgimage.png";

const ContactCard = () => {
  return (
    <div className="mx-6 md:mx-12 my-10">
      <div
        className="relative w-full bg-cover bg-center  rounded-2xl overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between px-8 py-20 space-y-6 md:space-y-0">
          {/* Left Text (30%) */}
          <div className="text-white xl:w-[35%] lg:w-[50%] w-full">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Stay Connected with Smarter Learning
            </h2>
            <p className="text-gray-300 text-lg">
              Get course updates, fee alerts, and exclusive offers delivered to
              your inbox
            </p>
          </div>

          {/* Right Content (50%) */}
          <div className="flex items-center xl:w-[50%] lg:w-[50%] w-full bg-white bg-opacity-20 border border-yellow-500 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email......."
              className="flex-grow px-4 py-3 text-white placeholder-gray-300 bg-transparent focus:outline-none"
            />
            <button className="px-6 py-3 bg-transparent text-yellow-400 font-semibold hover:text-yellow-300 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
