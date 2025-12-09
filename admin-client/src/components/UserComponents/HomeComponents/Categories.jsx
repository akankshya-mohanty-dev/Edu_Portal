import React from "react";
import category1 from "../../../assets/new_home-1/home/categories/category1.jpg";
import category2 from "../../../assets/new_home-1/home/categories/category2.jpg";
import category3 from "../../../assets/new_home-1/home/categories/category3.jpg";
import category4 from "../../../assets/new_home-1/home/categories/category4.jpg";
import category5 from "../../../assets/new_home-1/home/categories/category5.jpg";
import category6 from "../../../assets/new_home-1/home/categories/category6.jpg";
import category7 from "../../../assets/new_home-1/home/categories/category7.jpg";
import backgroundImage from "../../../assets/new_home-1/home/categories/background.png";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const categories = [
{ id: 1, title: "EduPay Learning Resources", img: category1 },
{ id: 2, title: "EduPay Student Services", img: category2 },
{ id: 3, title: "EduPay Course Materials", img: category3 },
{ id: 4, title: "EduPay Faculty Dashboard", img: category4 },
{ id: 5, title: "EduPay Exam Support", img: category5 },
{ id: 6, title: "EduPay Digital Library", img: category6 },
{ id: 7, title: "EduPay Payment & Billing", img: category7 },

];

const Categories = () => {
  return (
    <section
      className="w-full bg-white md:py-10 py-2"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="mx-4 lg:mx-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          grabCursor={true} // enables drag/swipe on desktop
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div className="flex flex-col items-center cursor-pointer group">
                {/* Circle Image */}
                <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border border-gray-200 group-hover:scale-105 transform transition duration-300">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Title */}
                <p className="mt-3 text-xs md:text-base whitespace-nowrap font-medium text-gray-700 group-hover:text-green-700 transition">
                  {cat.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
