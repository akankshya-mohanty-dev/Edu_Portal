import React, { useEffect, useState } from "react";
// import backgroundImage1 from "../../../src/assets/new_home-1/login/image1.png"
// import backgroundImage2 from "../../../src/assets/new_home-1/login/image2.png"
// import backgroundImage3 from "../../../src/assets/new_home-1/login/image3.png"
// import backgroundImage4 from "../../../src/assets/new_home-1/login/image4.png"
import backgroundImage1 from "../../../src/assets/new_home-1/home/home_section_image/image1.png"
import backgroundImage2 from "../../../src/assets/new_home-1/home/home_section_image/image1.png"
import backgroundImage3 from "../../../src/assets/new_home-1/home/home_section_image/image1.png"
import backgroundImage4 from "../../../src/assets/new_home-1/home/home_section_image/image1.png"
import loginLogo from "../../assets/EdupayLogo/EdupayPortal2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../Common/loader.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); 

    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      let data = JSON.stringify({
        email: formData.email.toUpperCase(),
        password: formData.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/userData/user-login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log("data", data);
      axios
        .request(config)
        .then((response) => {
          toast.success("Login successful");
          console.log("Full response:", response.data);
          if (response.data?.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          if (response.data?.token) {
  localStorage.setItem("token", response.data.token); 
}
          const role =
            response.data?.user?.role;
            console.log("role",role)
          if (role==="admin") {
            navigate("/dashboard");
          } else if (role === "teacher") {
            navigate("/teacher-dashboard");
          } else if (role==="student") {
            navigate("/student-dashboard");
          } else {
            toast.error("Invalid credentials or missing role.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.replace(/\s/g, "") });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleShowPassword = () => {
    console.log("enter");
    console.log("showpassword", showPassword);
    setShowPassword(!showPassword);
    console.log("showpassword", showPassword);
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen mx-auto">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {/* Left side - Image Slider */}
          <div className="w-[60%] lg:flex hidden relative overflow-hidden">
            {/* Image slider container */}
            <div className="relative w-full h-full">
              {backgroundImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`Background ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
              ))}
              
              {/* Content overlay */}
              <div className="absolute top-[45%] left-[25%] z-10">
                <h1 className="text-white xl:text-5xl text-4xl xl:font-bold font-extrabold">
                  Welcome to EduPay Portal
                </h1>
                <p className="text-white xl:text-xl text-lg font-semibold xl:w-[80%] sm:w-[95%] w-full mt-4">
                  We believe in empowering learners to make smart educational and financial choices that create growth, opportunity, and success in their lives.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="lg:w-[40%] relative w-full flex items-center justify-center px-8">
            <div className="absolute top-8 ">
              <img className="xl:w-32 md:w-24 w-20" src={loginLogo} alt="Logo" />
            </div>
            <div className="w-full max-w-md ">
              <h2 className="text-3xl font-semibold mb-2 lg:text-start text-center">
                Sign in
              </h2>
              <p className="text-gray-600 mb-6 lg:text-start text-center">
                Sign in by entering information below
              </p>
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className={`w-full border-b-2 focus:outline-none py-1 `}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full border-b-2 focus:outline-none py-1 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {showPassword ? (
                      <>
                        <span className="absolute right-4 top-2 hover:cursor-pointer">
                          <FaEye onClick={() => handleShowPassword()} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="absolute right-4 top-2 hover:cursor-pointer">
                          <FaEyeSlash onClick={() => handleShowPassword()} />
                        </span>
                      </>
                    )}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center ">
                  <label
                    htmlFor="remember"
                    className="text-sm cursor-pointer hover:underline text-gray-700"
                    onClick={() => navigate("/forgot-password")}
                  >
                    forgotPassword
                  </label>
                  
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00A260] text-white py-2 rounded hover:bg-green-800 transition duration-200 cursor-pointer"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;