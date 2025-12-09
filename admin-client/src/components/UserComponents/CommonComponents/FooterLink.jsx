import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import logo from "../../../assets/EdupayLogo/logo.png";
import { useNavigate } from "react-router-dom";
const FooterLink = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#2d2d2d] text-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-10 gap-5 px-6 md:px-12">
        {/* Logo + About */}
        <div className=" lg:border-r border-[#868686] md:py-12 md:pt-10 pt-4">
          <div className="flex md:gap-3 gap-2 items-center">
            <img
              src={logo}
              alt="image is missing"
              className="py-2 bg-contain cursor-pointer h-20 w-20"
            />
            <div>
              <h1
                className="uppercase text-[#2c70c0] font-semibold lg:text-3xl md:text-2xl text-xl -tracking-tighter"
                style={{ fontFamily: "Belleza, sans-serif" }}
              >
                Edu Pay
              </h1>
              <h2
                className="capitalize text-base font-normal text-white  tracking-wide"
                style={{ fontFamily: "Belleza, sans-serif" }}
              >
               Portal
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed my-4">
           Bringing you a trusted digital learning platform designed for students and institutions. Smart tools and secure payments for modern education.</p>
          <p className="text-sm text-white font-semibold leading-relaxed uppercase my-4">
            Follow Us
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 ">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-700 hover:bg-[#2e72c2] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-700 hover:bg-[#2e72c2] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-700 hover:bg-[#2e72c2] transition"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-700 hover:bg-[#2e72c2] transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="flex md:flex-row flex-col  md:gap-0 gap-5 md:justify-center justify-start md:py-12 py-0">
         
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 md:text-center text-start">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm md:text-center text-start">
              <li
                className="hover:text-[#2c70c0] cursor-pointer"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="items-top flex lg:justify-center justify-start lg:border-l  border-[#868686] md:py-12 py-0 md:pb-0 pb-5">
          <div className="text-left">
            <h3 className="text-white font-semibold mb-4">GET IN TOUCH</h3>
          
            <div className="mt-4">
              <p className="text-sm uppercase text-gray-400 leading-relaxed">
               Plot No. A-12, Green Valley Complex,
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
               Near Central Park, Sector-5 Extension,
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
                Metro City, Springfield, 560120
            </p>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mt-2">
              {" "}
              <a href="tel:+91 943 983 3255">+91 123 456 7890</a>
            </p>
            <p className="text-sm text-[#2c70c0] mt-2">
              edupay@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLink;
