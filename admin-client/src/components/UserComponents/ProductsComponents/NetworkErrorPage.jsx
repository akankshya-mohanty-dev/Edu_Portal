import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";
import { Search} from "lucide-react";
import image from "../../../assets/new_home-1/products/astroman.png";

const NetworkErrorPage = ({ searchQuery }) => {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const y = useMotionValue(0);
  const x = useMotionValue(0);
  const rotation = useTransform(y, [-20, 20], [-5, 5]);

  const springConfig = { damping: 10, stiffness: 100 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Handle component mounting
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle floating animation
  useEffect(() => {
    if (!isMounted) return;

    let isActive = true;
    let animationTimeout;

    const floatAnimation = async () => {
      try {
        while (isActive && !isDragging && isMounted) {
          if (!isActive) break;
          await controls.start({ 
            y: -8, 
            x: -5, 
            transition: { duration: 2, ease: "easeInOut" } 
          });
          
          if (!isActive) break;
          await controls.start({ 
            y: 8, 
            x: -5, 
            transition: { duration: 2, ease: "easeInOut" } 
          });
          
          if (!isActive) break;
          await controls.start({ 
            y: -10, 
            x: 5, 
            transition: { duration: 2, ease: "easeInOut" } 
          });
          
          if (!isActive) break;
          await controls.start({ 
            y: 0, 
            x: 0, 
            transition: { duration: 2, ease: "easeInOut" } 
          });
        }
      } catch (error) {
        // Animation was interrupted, which is fine
        console.debug("Animation interrupted:", error.message);
      }
    };

    if (!isDragging) {
      // Small delay to ensure component is fully ready
      animationTimeout = setTimeout(() => {
        if (isActive && isMounted) {
          floatAnimation();
        }
      }, 100);
    } else {
      controls.stop();
    }

    return () => {
      isActive = false;
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
      controls.stop();
    };
  }, [controls, isDragging, isMounted]);

  // Don't render until mounted to prevent SSR issues
  if (!isMounted) {
    return (
      <div className="relative w-full flex flex-col items-center justify-center bg-white text-gray-800 font-bold p-8 rounded-[20px] shadow-md overflow-hidden gap-6 min-h-[400px]">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center bg-white text-gray-800 font-bold p-8 rounded-[20px] overflow-hidden gap-6 min-h-[400px]">
      {/* Orange Glow background */}
      <motion.div
        className="absolute inset-[-3px] rounded-[20px] bg-[radial-gradient(#df920e,transparent,transparent)] z-[-1]"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Search Icon */}
      <motion.div
        className="relative z-[3] mb-4"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative">
          <Search className="w-16 h-16 text-[#df920e]" />
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Product (Astro Man) */}
      <motion.img
        src={image}
        alt="Not found"
        className="w-72 h-44 opacity-80 z-[5] cursor-grab active:cursor-grabbing"
        animate={controls}
        style={{ x: xSpring, y: ySpring, rotate: rotation }}
        drag
        dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          // Reset position after drag
          x.set(0);
          y.set(0);
        }}
        whileDrag={{ scale: 1.05, opacity: 0.7 }}
      />

      {/* Heading */}
      <div className="z-[2] text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#df920e]">No Results Found</h2>
        <p className="text-gray-500 text-sm">We couldn't find any products matching</p>
        {searchQuery && (
          <div className="bg-[#df920e] bg-opacity-10 border border-[#df920e] rounded-lg px-4 py-2 inline-block">
            <span className="text-[#df920e] font-semibold">"{searchQuery}"</span>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="text-center text-gray-400 text-sm space-y-1">
        <p>Try these suggestions:</p>
        <ul className="text-xs space-y-1 text-gray-500">
          <li>• Check your spelling</li>
          <li>• Use different keywords</li>
          <li>• Try more general terms</li>
        </ul>
      </div>

      {/* Buttons */}
      {/* <div className="flex items-center justify-center gap-3">
        <ActionButton onClick={onRetry} icon={<RefreshCw className="w-4 h-4" />} text="Retry" variant="primary" />
        <ActionButton onClick={onClearSearch} icon={<Package className="w-4 h-4" />} text="Browse All" variant="secondary" />
        {onGoBack && (
          <ActionButton onClick={onGoBack} icon={<ArrowLeft className="w-4 h-4" />} text="Go Back" variant="tertiary" />
        )}
      </div> */}
    </div>
  );
};

// Buttons
function ActionButton({ onClick, icon, text, variant = "primary" }) {
  const variants = {
    primary: { bg: "bg-[#df920e]", hover: "hover:bg-[#c8820c]", text: "text-white" },
    secondary: { bg: "bg-gray-100", hover: "hover:bg-gray-200", text: "text-gray-700" },
    tertiary: { bg: "bg-transparent border border-gray-400", hover: "hover:bg-gray-100", text: "text-gray-500" },
  };
  const style = variants[variant];
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${style.bg} ${style.hover} ${style.text}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
}

export default NetworkErrorPage;