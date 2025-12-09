import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/EdupayLogo/logo.png";
import logo1 from "../../assets/new_home-1/home/logo/logo1.svg";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import axios from "axios";
import { FaHome, FaUser } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { FaChevronDown } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const { cartCount, updateCartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childSubCategories, setChildSubCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [categoriesResponse, subCategoriesResponse, childSubCategoriesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/category`),
          axios.get(`${process.env.REACT_APP_API_URL}/subcategories`),
          axios.get(`${process.env.REACT_APP_API_URL}/childSubCategories`)
        ]);

        // Set the fetched data
        if (categoriesResponse.data.success) {
          console.log("Fetched categories:", categoriesResponse.data.categories);
          setCategories(categoriesResponse.data.categories);
        }
        
        if (subCategoriesResponse.data.success) {
          setSubCategories(subCategoriesResponse.data.subCategories);
        }
        
        if (childSubCategoriesResponse.data.success) {
          console.log("Fetched child subcategories:", childSubCategoriesResponse.data.childSubCategories);
          setChildSubCategories(childSubCategoriesResponse.data.childSubCategories);
        }

      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const getSubCategoriesForCategory = (categoryId) =>
    subCategories.filter((subCat) => subCat?.category?._id === categoryId);

  const getChildSubCategoriesForSubCategory = (subCategoryId) =>
    childSubCategories.filter((childSubCat) => childSubCat?.subCategory?._id === subCategoryId);

  const handleAllCategoriesHover = () => setShowAllCategories(true);
  
  const handleAllCategoriesLeave = () => {
    setShowAllCategories(false);
    setHoveredCategory(null);
    setHoveredSubCategory(null);
  };
  
  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);
    setHoveredSubCategory(null);
  };

  const handleSubCategoryHover = (subCategoryId) => {
    setHoveredSubCategory(subCategoryId);
  };

  // Option 1: Navigate to products with subcategory filter
  const handleSubCategoryClick = (subCategory, category) => {
    console.log('Clicked subcategory:', subCategory);
    
    // Close all dropdowns
    setShowAllCategories(false);
    setHoveredCategory(null);
    setHoveredSubCategory(null);
    
    // Navigate to products page with filter state
    navigate('/products', { 
      state: { 
        filterBy: 'subcategory',
        selectedCategory: category?.name || '',
        selectedSubCategory: subCategory?.name || '',
        categoryId: category?._id,
        subCategoryId: subCategory?._id
      } 
    });
  };

  // Option 2: Navigate to products with child subcategory filter
  const handleChildSubCategoryClick = (childSubCategory) => {
    console.log('Clicked child subcategory:', childSubCategory);
    
    // Find parent category and subcategory
    const parentSubCategory = subCategories.find(sub => sub._id === childSubCategory?.subCategory?._id);
    const parentCategory = categories.find(cat => cat._id === parentSubCategory?.category?._id);
    
    // Close all dropdowns
    setShowAllCategories(false);
    setHoveredCategory(null);
    setHoveredSubCategory(null);
    
    // Navigate to products page with child subcategory filter
    navigate('/products', { 
      state: { 
        filterBy: 'childsubcategory',
        selectedCategory: parentCategory?.name || '',
        selectedSubCategory: parentSubCategory?.name || '',
        selectedChildSubCategory: childSubCategory?.name || '',
        categoryId: parentCategory?._id,
        subCategoryId: parentSubCategory?._id,
        childSubCategoryId: childSubCategory?._id
      } 
    });
  };

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpenMenu(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    }
    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  useEffect(() => {
    const storeData = localStorage.getItem("Consumer");
    if (storeData) {
      const parsedData = JSON.parse(storeData);
      setStoreData(parsedData);
      if (parsedData?.userType === "consumer") {
        fetchAllCartData(parsedData?.consumerId);
      }
    }
  }, []);

  const fetchAllCartData = async (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/cartProducts/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        const count = response.data.cartItems[0]?.product?.length || 0;
        updateCartCount(count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleNavigate = (id) => {
    navigate("/cart-item", { state: { id } });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDashboard = () => {
    console.log("store data", storeData);
    navigate("/consumer-dashboard");
  };

  const handleEmployeeAdminDashboard = () => {
    console.log("enter");
    const loginData = JSON.parse(
      localStorage.getItem("staff") || localStorage.getItem("Employee")
    );
    console.log("login data", loginData);
    if (loginData.role) {
      navigate("/dashboard");
    } else if (loginData.employeeType) {
      navigate("/employee-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="">
      <div className="mx-4 lg:mx-10">
        <div className="flex flex-row justify-between items-center w-full py-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex md:gap-3 gap-2 items-center">
              <img
                src={logo}
                alt="image is missing"
                className="py-2 bg-contain cursor-pointer md:w-20 w-16 md:h-16 h-14"
                onClick={() => handleNavClick("/")}
              />
              {/* <div>
                <h1
                  className="uppercase text-[#2e72c1] font-semibold lg:text-2xl md:text-xl text-lg -tracking-tighter"
                  style={{ fontFamily: "Belleza, sans-serif" }}
                >
                 Edy Pay
                </h1>
                <h2
                  className="capitalize text-base font-normal text-[#181F00]  tracking-wide"
                  style={{ fontFamily: "Belleza, sans-serif" }}
                >
                  Portal
                </h2>
              </div> */}
            </div>
            <div className="w-1/3 md:flex hidden">
              <div className="w-full flex">
                <input
                  type="text"
                  placeholder="Search product, category, brand"
                  className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none w-full"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
                <button
                  className="bg-[#1e3f65] text-white text-sm font-semibold px-6 py-2 rounded-r-md"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Search
                </button>
              </div>
            </div>
            <ul className="flex gap-4">
              <li className="md:flex hidden">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 shadow-sm hover:bg-gray-100">
                  <GoHeartFill className="w-6 h-6 text-[#2e72c1]" />
                </button>
              </li>
              <li className="md:flex hidden">
                 <button
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 shadow-sm hover:bg-gray-100"
                  onClick={() => handleNavigate(storeData?.consumerId)}
                >
                  <BsCart3 className="w-6 h-6 text-[#2e72c1]"  />
                </button>
                
                
              </li>
              {isOpenMenu ? (
                <RxCross1
                  className="xl:hidden block text-3xl cursor-pointer"
                  onClick={handleMenu}
                />
              ) : (
                <li>
                  <button
                    className="w-12 md:hidden h-12 flex items-center justify-center rounded-xl border border-gray-200 shadow-sm hover:bg-gray-100"
                    onClick={handleMenu}
                  >
                    <HiMenuAlt3 className="w-6 h-6 text-[#2e72c1]" />
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu */}
          {isOpenMenu && (
            <div className="fixed inset-0 z-50 xl:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
                onClick={handleMenu}
              ></div>

              <div
                className={`fixed top-0 right-0 h-full w-80 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                  isOpenMenu ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">
                      <img src={logo} alt="logo.png" className="bg-contain h-20 w-20" />
                    </h2>
                    <RxCross1
                      className="text-2xl cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                      onClick={handleMenu}
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-2 mb-6">
                      {navLinks.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(link.path)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                            location.pathname === link.path
                              ? "bg-green-100 text-green-700 border-l-4 border-green-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {link.name}
                        </button>
                      ))}
                    </nav>
                    {storeData?.userType === "consumer" && (
                      <div className="space-y-3 pt-6 border-t">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Quick Actions
                        </h3>

                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 bg-[#DF920E] text-white rounded-lg hover:bg-[#004d54] transition-colors duration-200"
                          onClick={() => {
                            handleNavigate(storeData?.consumerId);
                            setIsOpenMenu(false);
                          }}
                        >
                          <TfiShoppingCart className="text-lg" />
                          <span>Shopping Cart</span>
                          {cartCount > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-6 text-center">
                              {cartCount}
                            </span>
                          )}
                        </button>

                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          onClick={() => {
                            handleDashboard();
                            setIsOpenMenu(false);
                          }}
                        >
                          <FaHome className="text-lg" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                          onClick={() => {
                            handleLogout();
                            setIsOpenMenu(false);
                          }}
                        >
                          <FaUser className="text-lg" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}

                    {(() => {
                      const staff = localStorage.getItem("staff");
                      const employee = localStorage.getItem("Employee");
                      const consumer = localStorage.getItem("Consumer");

                      if (staff) {
                        return (
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            onClick={handleEmployeeAdminDashboard}
                          >
                            <FaHome className="text-lg" />
                            Dashboard
                          </button>
                        );
                      } else if (employee) {
                        return (
                          <button
                            className="w-full flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                            onClick={handleEmployeeAdminDashboard}
                          >
                            <FaHome className="text-lg" />
                            Dashboard
                          </button>
                        );
                      } else if (consumer) {
                        return null;
                      } else {
                        return (
                          <button
                            className="px-8 py-3 bg-[#DF920E] text-white rounded-md text-xl"
                            onClick={() => handleNavClick("/login")}
                          >
                            Login
                          </button>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <div className="md:flex hidden flex-row justify-between items-center py-2 w-full pr-4 lg:pr-14 bg-[#F2F2F2]">
        {/* All Categories Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleAllCategoriesHover}
          onMouseLeave={handleAllCategoriesLeave}
        >
          <button className="flex items-center justify-between bg-[#1e3f65] text-white px-8 py-3 rounded-r-full cursor-pointer md:w-[300px] w-[250px]">
            <div className="flex items-center gap-3">
              <img src={logo} alt="categories" className="w-9 h-8 object-contain" />
              <p className="font-medium text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                All Categories
              </p>
            </div>
            
          </button>

          {showAllCategories && (
            <div className="absolute left-10 top-full z-50 flex items-start">
              {/* Categories */}
              <div className="w-64 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category?._id}
                      className="border-b border-gray-100 last:border-0 relative"
                      onMouseEnter={() => handleCategoryHover(category?._id)}
                    >
                      <button className="px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left flex items-center justify-between">
                        <span className="text-sm capitalize font-medium">{category.name}</span>
                        <FaChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subcategories */}
              {hoveredCategory && (
                <div 
                  className="w-72 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ml-0 mt-5"
                  onMouseEnter={() => {}} 
                  onMouseLeave={() => {}} 
                >
                  <ul className="max-h-80 overflow-y-auto">
                    {getSubCategoriesForCategory(hoveredCategory).map((subCategory) => (
                      <li
                        key={subCategory?._id}
                        className="border-b border-gray-100 last:border-0 relative"
                        onMouseEnter={() => handleSubCategoryHover(subCategory?._id)}
                      >
                        <button
                          onClick={() => handleSubCategoryClick(
                            subCategory, 
                            categories.find(cat => cat._id === hoveredCategory)
                          )}
                          className="px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            {subCategory.imgUrl && (
                              <div className="flex-shrink-0 h-6 w-6 rounded-md overflow-hidden bg-gray-100 mr-3">
                                <img
                                  src={subCategory.imgUrl}
                                  alt={subCategory.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <span className="truncate text-sm font-medium capitalize">
                              {subCategory.name}
                            </span>
                          </div>
                          {getChildSubCategoriesForSubCategory(subCategory._id).length > 0 && (
                            <FaChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                          )}
                        </button>
                      </li>
                    ))}
                    {getSubCategoriesForCategory(hoveredCategory).length === 0 && (
                      <li className="px-4 py-3 text-gray-500 text-sm">
                        No subcategories available
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Child Subcategories - Third Level */}
              {hoveredSubCategory && getChildSubCategoriesForSubCategory(hoveredSubCategory).length > 0 && (
                <div 
                  className="w-64 bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden ml-0 mt-10"
                  onMouseEnter={() => {}} 
                  onMouseLeave={() => {}} 
                >
                  <ul className="max-h-80 overflow-y-auto">
                    {getChildSubCategoriesForSubCategory(hoveredSubCategory).map((childSubCategory) => (
                      <li
                        key={childSubCategory?._id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <button
                          onClick={() => handleChildSubCategoryClick(childSubCategory)}
                          className="px-4 py-3 text-gray-700 hover:bg-[#6B4000] hover:text-white w-full text-left flex items-center transition-colors duration-200"
                        >
                          {childSubCategory.imgUrl && (
                            <div className="flex-shrink-0 h-6 w-6 rounded-md overflow-hidden bg-gray-100 mr-3">
                              <img
                                src={childSubCategory.imgUrl}
                                alt={childSubCategory.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <span className="truncate text-sm font-medium capitalize">
                            {childSubCategory.name}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation Links */}
        <ul
          className="xl:flex hidden flex-row"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => handleNavClick(link.path)}
              className={`mx-2 xl:mx-4 cursor-pointer text-sm lg:text-base ${
                location.pathname === link.path
                  ? "font-semibold text-[#2e72c1]"
                  : ""
              }`}
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* User Authentication Section */}
        {(() => {
          const staff = localStorage.getItem("staff");
          const employee = localStorage.getItem("Employee");
          const consumer = localStorage.getItem("Consumer");

          if (staff) {
            return (
              <button
                className="px-8 py-3 bg-[#DF920E] text-white rounded-md text-xl"
                onClick={handleEmployeeAdminDashboard}
              >
                Dashboard
              </button>
            );
          } else if (employee) {
            return (
              <button
                className="px-8 py-3 bg-[#DF920E] text-white rounded-md text-xl"
                onClick={handleEmployeeAdminDashboard}
              >
                Dashboard
              </button>
            );
          } else if (consumer) {
            return (
              <div className="relative flex items-center gap-4">
                <div className="relative" ref={userDropdownRef}>
                  <button
                    className="px-8 py-3 bg-[#DF920E] text-white rounded-md text-xl"
                    onClick={() => setShowUserDropdown((prev) => !prev)}
                  >
                    <FaUser />
                  </button>
                  {showUserDropdown && (
                    <div className="absolute right-20 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
                      <ul className="text-base font-semibold text-gray-700 p-2 space-y-2">
                        <li
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => handleDashboard()}
                        >
                          Dashboard
                        </li>
                        <li className="cursor-pointer hover:text-blue-600">
                          Settings
                        </li>
                        <li
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleLogout()}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <button
                className="px-8 py-3 bg-[#2e72c1] text-white capitalize rounded-md text-base text-semibold"
                onClick={() => handleNavClick("/login")}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Log in
              </button>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Navbar;