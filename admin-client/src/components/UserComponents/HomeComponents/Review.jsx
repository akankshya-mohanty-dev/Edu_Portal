import React, { useEffect, useState } from "react";
// import { FaStar, FaLeaf, FaSmile, FaSeedling, FaHeadset } from "react-icons/fa";
import FaStar from "../../../assets/new_home-1/home/review/icon1.svg"
import FaLeaf from "../../../assets/new_home-1/home/review/icon2.svg"
import FaSmile from "../../../assets/new_home-1/home/review/icon3.svg"
import FaSeedling from "../../../assets/new_home-1/home/review/icon4.svg"
import FaHeadset from "../../../assets/new_home-1/home/review/icon5.svg"

const Review = () => {
 const stats = [
  { id: 1, icon: FaStar, value: 50000, suffix: "+", label: "Active Learners" },
  { id: 2, icon: FaLeaf, value: 1200, suffix: "+", label: "Expert Instructors" },
  { id: 3, icon: FaSmile, value: 1500, suffix: "+", label: "Courses & Study Materials" },
  { id: 4, icon: FaHeadset, value: 100, suffix: "%", label: "Secure Transactions" },
  { id: 5, icon: FaHeadset, value: 24, suffix: "/7", label: "Student Support" },
];


  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // 2 sec animation
      const stepTime = Math.max(Math.floor(duration / end), 20);

      const counter = setInterval(() => {
        start += Math.ceil(end / (duration / stepTime));
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = start;
          return newCounts;
        });
      }, stepTime);
    });
  }, []);

  return (
    <section className="w-full bg-[#1e3f65] py-16">
      <div className="flex flex-wrap justify-between items-center gap-8 text-center mx-4 lg:mx-14">
        {stats.map((item, index) => (
          <div key={item.id} className="flex flex-row items-center gap-3 min-w-[150px]">
            {/* {item.icon} */}
            <img src={item.icon}/>
            <div className="flex flex-col items-start" style={{fontFamily:"Poppins, sans-serif"}}>
              <h3 className="text-2xl font-bold text-white">
                {counts[index].toLocaleString()}
                {item.suffix}
              </h3>
              <p className="text-gray-300 text-sm">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
