import React, { useEffect, useState } from "react";
import backgroundImage1 from "../../../src/assets/new_home-1/login/image1.png";
import backgroundImage2 from "../../../src/assets/new_home-1/login/image2.png";
import backgroundImage3 from "../../../src/assets/new_home-1/login/image3.png";
import backgroundImage4 from "../../../src/assets/new_home-1/login/image4.png";
import loginLogo from "../../assets/EdupayLogo/EdupayPortal2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
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

    if (!formData.id) {
      newErrors.id = "ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let data = JSON.stringify({
        id: formData.id.toUpperCase(),
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/staffList/staff/forgot-password`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          toast.success("Password reset successfully");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\s/g, ""),
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleShowPassword = () => {
    setPassword(!password);
  };

  const handleShowConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-[60%] lg:flex hidden relative">
        <div className="relative w-full h-full">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
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
              We believe in empowering people to make Smart Educational and
              Financial Choices to create Stability, Growth, and Success in
              their lives.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="lg:w-[40%] relative w-full flex items-center justify-center px-8">
        <div className="absolute top-8 ">
          <img className="xl:w-32 md:w-24 w-20" src={loginLogo} alt="Logo" />
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-3xl mx-auto font-semibold mb-2 lg:text-start text-center">
            Forgot Password
          </h2>
          <p className="text-gray-600 mb-6 lg:text-start text-center">
            Reset your password by entering your registered ID
          </p>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className={`w-full border-b-2 focus:outline-none py-1 ${
                  errors.id ? "border-red-500" : ""
                }`}
              />
              {errors.id && (
                <p className="text-red-500 text-sm mt-1">{errors.id}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={password ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border-b-2 focus:outline-none py-1 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {password ? (
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
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border-b-2 focus:outline-none py-1 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {confirmPassword ? (
                  <>
                    <span className="absolute right-4 top-2 hover:cursor-pointer">
                      <FaEye onClick={() => handleShowConfirmPassword()} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="absolute right-4 top-2 hover:cursor-pointer">
                      <FaEyeSlash onClick={() => handleShowConfirmPassword()} />
                    </span>
                  </>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#00A260] text-white py-2 rounded hover:bg-green-800 transition duration-200 cursor-pointer"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
