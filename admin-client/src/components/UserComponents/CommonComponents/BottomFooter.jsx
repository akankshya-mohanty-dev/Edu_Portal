import React from "react";

const BottomFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-gradient-to-r from-[#2d71c1] to-[#1e3f65] text-white px-5 py-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="md:w-1/2 text-center md:text-left md:mb-0">
            <p className="text-xs md:text-sm lg:text-base">
              © {currentYear}
              {" "}EDU PAY PORTAL All Rights Reserved
            </p>
          </div>
          <div className="md:w-1/2 text-center md:text-right">
            <div className="text-xs md:text-sm lg:text-base d-none d-sm-block">
              Design & Develop by
              <a href="#" className="ms-1">
                AKANKSHYA MOHANTY
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
