import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNavbar from "../CommonComponents/TopNavbar";
import image1 from "../../../assets/new_home-1/home/home_section_image/1.jpg";
import image2 from "../../../assets/new_home-1/home/home_section_image/1.jpg";
import image3 from "../../../assets/new_home-1/home/home_section_image/1.jpg";
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Default slides
const defaultSlides = [
  { id: 1, image: image1, name: "", description: "" },
  { id: 2, image: image2, name: "", description: "" },
  { id: 3, image: image3, name: "", description: "" },
];

const HeroSection = ({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  containerClassName,
  buttonClassName,
}) => {
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setAutoPlay] = useState(autoPlay);
  const [activeIndex, setActiveIndex] = useState(0);

  // Next slide
  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Prev slide
  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Go to specific slide
  const goToSlide = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(autoPlay), 10000);
  };

  // Auto play effect
  useEffect(() => {
    let timer;
    if (isAutoPlay) {
      timer = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoPlay, autoPlayInterval]);

  const handleNavigation = (dir) => {
    setAutoPlay(false);
    if (dir === "next") nextSlide();
    else prevSlide();
    setTimeout(() => setAutoPlay(autoPlay), 10000);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 100, filter: "blur(20px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const indicatorVariants = {
    inactive: { scale: 1, opacity: 0.5 },
    active: { scale: 1.3, opacity: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.5 },
  };

  return (
    <div>
      <div
        className={cn(
          "w-full xl:h-[31.25rem] lg:h-[25rem] md:h-[22rem]  h-96 max-sm:h-[8rem] sm:h-[18rem] flex items-center justify-center overflow-hidden",
          className
        )}
      >
        <div
          className={cn(
            "relative w-full h-96 xl:h-[31.25rem] lg:h-[25rem]  md:h-[22rem] sm:h-[18rem]   max-sm:h-[8rem] shadow-xl",
            containerClassName
          )}
        >
          {/* Main slider */}
          <div className="relative w-full h-full overflow-hidden ">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={slides[activeIndex].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.8, ease: "easeInOut" },
                  opacity: { duration: 0.8, ease: "easeInOut" },
                }}
                className="absolute w-full h-full"
              >
                <div
                  className="w-full h-full bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage: `url(${slides[activeIndex].image})`,
                  }}
                >
                  <motion.div
                    className="absolute top-1/2 left-16 transform -translate-y-1/2 w-72 text-left text-white"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h2
                      variants={itemVariants}
                      className="text-4xl font-bold uppercase"
                    >
                      {slides[activeIndex].name}
                    </motion.h2>
                    <motion.p
                      variants={itemVariants}
                      className="mt-3 mb-6 text-gray-100"
                    >
                      {slides[activeIndex].description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-1 w-full flex justify-center">
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full bg-white cursor-pointer",
                    buttonClassName
                  )}
                  style={{ opacity: index === activeIndex ? 1 : 0.5 }}
                  variants={indicatorVariants}
                  animate={index === activeIndex ? "active" : "inactive"}
                  whileHover="hover"
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TopNavbar />
    </div>
  );
};

export default HeroSection;