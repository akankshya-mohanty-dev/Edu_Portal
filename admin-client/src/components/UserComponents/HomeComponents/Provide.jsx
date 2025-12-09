import React from "react";
import img1 from "../../../assets/provide/img1.svg";
import img2 from "../../../assets/provide/img2.svg";
import img3 from "../../../assets/provide/img3.svg";
import img4 from "../../../assets/provide/img4.svg";

const services = [
  {
    icon: img1,
    title: "Ayurvedic Service",
    description:
      "Our expert practitioners provide personalized treatments tailored to your unique body type and health needs.",
  },
  {
    icon: img2,
    title: "Lifestyle Modification",
    description:
      "Our expert practitioners provide personalized treatments tailored to your unique body type and health needs.",
  },
  {
    icon: img3,
    title: "Diet and Food Pattern",
    description:
      "Our expert practitioners provide personalized treatments tailored to your unique body type and health needs.",
  },
  {
    icon: img4,
    title: "Herbal Massages",
    description:
      "Our expert practitioners provide personalized treatments tailored to your unique body type and health needs.",
  },
];
const Provide = () => {
  return (
    <section className="lg:text-center text-start lg:mx-20 mx-10 bg-white mb-10">
      <h2
        className="sm:text-5xl text-3xl font-medium text-[#000000]  mb-5 belleza lg:text-center text-start"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        WHAT WE PROVIDE
      </h2>
      <p className="text-[#252525] text-sm md:text-xl tracking-wide mt-2 mb-10 xl:w-[65%] mx-auto montserrat">
        At Lady Vines Health Care Center, we are dedicated to offering a
        holistic approach to health and well-being.
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-2 gap-6  mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={` p-6 rounded-lg hover:outline-[#76CCD380] hover:outline-2 hover:outline hover:shadow-lg transition  
            `}
          >
            <img
              src={service.icon}
              alt={service.title}
              className="w-16 mx-auto mb-10"
            />
            <h3 className="text-2xl font-semibold tracking-wide text-gray-900 mb-5">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <button className="mt-4 border-2 border-green-700 text-green-700 px-6 md:px-10 font-semibold text-sm md:text-lg lg:text-xl py-2 md:py-3 rounded hover:bg-[#003438] hover:text-white transition my-2 ">
              More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Provide;
