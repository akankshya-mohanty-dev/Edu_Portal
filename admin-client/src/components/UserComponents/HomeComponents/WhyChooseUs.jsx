import React from "react";
import { FaAppleAlt, FaCarrot, FaLeaf, FaTruck } from "react-icons/fa";
import image1 from "../../../assets/new_home-1/home/chooseUs/Background.png"

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <FaAppleAlt className="text-[#2c71c1] text-3xl" />,
      title: "100% Secure Fee Payments",
      desc: "EduPay provides a smooth and secure payment experience, ensuring every transaction is protected and hassle-free for students and institutions.",
    },
    {
      id: 2,
      icon: <FaTruck className="text-[#2c71c1] text-3xl" />,
      title: "Verified Courses & Faculty",
      desc: "All courses and instructors on EduPay go through a strict verification process to maintain trust, quality, and a reliable learning experience.",
    },
    {
      id: 3,
      icon: <FaCarrot className="text-[#2c71c1] text-3xl" />,
      title: "Smart Learning Dashboard",
      desc: "Students get an organized and user-friendly dashboard that helps them track progress, access materials, and manage learning more effectively.",
    },
    {
      id: 4,
      icon: <FaLeaf className="text-[#2c71c1] text-3xl" />,
      title: "Instant Certificate Generation",
      desc: "EduPay allows students to download verified certificates instantly after course completion, making achievement tracking simple and efficient.",
    },
  ];

  return (
    <div className="w-full bg-white">

    <section className="w-full bg-white py-16 relative bg-no-repeat bg-cover" 
  style={{ backgroundImage: `url(${image1})`,fontFamily: "Poppins, sans-serif" }}>
      {/* Heading */}
      <div className="text-center  px-4 md:py-5" >
        <h2
          className="text-2xl md:text-3xl font-semibold text-gray-800"
          style={{ fontFamily: "Belleza, sans-serif" }}
        >
          WHY TO CHOOSE US
        </h2>
        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-3xl mx-auto uppercase">
          There are many e-learning portals today, but EduPay delivers a secure and reliable platform without any unwanted distractions or complications.
        </p>
      </div>

      {/* Features Grid */}
      <div className="md:mt-12 mt-3 grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 xl:mx-44">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex md:flex-row flex-col md:items-start items-center gap-4 bg-white shadow-md rounded-md py-10 px-7 hover:shadow-lg transition"
          >
            {/* Icon */}
            <div className="flex-shrink-0">{feature.icon}</div>

            {/* Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default WhyChooseUs;
