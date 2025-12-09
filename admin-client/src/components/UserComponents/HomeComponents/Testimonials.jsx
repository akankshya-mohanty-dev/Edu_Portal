import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./Testimonials.css"; 
import userImg from "../../../assets/new_home-1/home/testimonials/image.png"; 
import backgroundImage from "../../../assets/new_home-1/home/testimonials/background.png"

const Testimonials = () => {
  const testimonials = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "B.Tech Student",
    text: "EduPay made paying my semester fees so easy and secure. The process was fast, transparent, and stress-free. Definitely the best student portal I’ve used.",
    image: userImg,
  },
  {
    id: 2,
    name: "Sneha Das",
    role: "MBA Student",
    text: "I love how simple and organized EduPay is. Accessing course materials, tracking payments, and getting updates has become effortless.",
    image: userImg,
  },
  {
    id: 3,
    name: "Rishabh Jain",
    role: "Coaching Student",
    text: "The platform is super smooth—no glitches, no confusion. EduPay keeps everything in one place, making my learning journey much easier.",
    image: userImg,
  },
  {
    id: 4,
    name: "Mitali Patra",
    role: "B.Sc Student",
    text: "Instant certificate download and quick payment confirmations have saved me so much time. EduPay is truly student-friendly.",
    image: userImg,
  },
  {
    id: 5,
    name: "Harsh Verma",
    role: "Diploma Student",
    text: "EduPay has a clean interface and reliable features. Paying fees and checking course updates has never been this smooth. I recommend it to every student.",
    image: userImg,
  },
];


  return (
    <section className="w-full bg-cover bg-center px-4 lg:px-10 py-16 relative text-white"  style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h2
        className="text-center text-2xl md:text-3xl font-semibold mb-10"
        style={{ fontFamily: "Belleza, sans-serif" }}
      >
        TESTIMONIALS
      </h2>

      <div className="">
        <Swiper
          modules={[Navigation,Autoplay]}
          navigation={true}
          spaceBetween={60}
          slidesPerView={1}
          loop={true}   
          autoplay={{ delay: 3000, disableOnInteraction: false }} 
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white mx-auto h-80 w-80 text-black rounded-md shadow-md p-6 flex flex-col items-center text-center relative group hover:shadow-xl transition">
                {/* Profile Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-full object-cover"
                />

                {/* Review */}
                <p className="text-sm text-gray-700 md:pr-0 pr-6 mt-6 italic">
                  "{item.text}"
                </p>

                {/* Name + Role */}
                <h3 className="mt-4 font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.role}</p>

                {/* Green bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-[#9ccf3c]"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
