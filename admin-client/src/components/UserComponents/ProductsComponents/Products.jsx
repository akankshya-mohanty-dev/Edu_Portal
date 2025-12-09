import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import image from "../../../assets/new_home-1/home/products/product1.png";
import Rating from "../HomeComponents/Rating";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NetworkErrorPage from "./NetworkErrorPage";
import { Home, ShoppingCart, User, Heart ,SlidersHorizontal } from "lucide-react";
import { useCart } from "../../../context/CartContext";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get navigation state for filters from navbar
  const navState = location.state;

  // State management
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedChildSubCategory, setSelectedChildSubCategory] =
    useState("All");
  const [selectedBrands, setSelectedBrands] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Using the same state structure as Navbar
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childSubCategories, setChildSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState(null);
  const { cartCount, updateCartCount } = useCart();
  const [filterOpen, setFilterOpen] = useState(false);


  // Initialize filters based on navbar navigation
  useEffect(() => {
    if (navState) {
      console.log("Navigation state received:", navState);

      if (navState.filterBy === "subcategory") {
        setSelectedCategory(navState.selectedCategory || "All");
        setSelectedSubCategory(navState.selectedSubCategory || "All");
        setSelectedChildSubCategory("All");
        setSelectedBrands(["All"]);
      } else if (navState.filterBy === "childsubcategory") {
        setSelectedCategory(navState.selectedCategory || "All");
        setSelectedSubCategory(navState.selectedSubCategory || "All");
        setSelectedChildSubCategory(navState.selectedChildSubCategory || "All");
        setSelectedBrands(["All"]);
      }

      // Clear the navigation state to prevent re-applying filters on refresh
      window.history.replaceState({}, document.title);
    }
  }, [navState]);

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

  // Fetch data using the same APIs as Navbar
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Using the same API calls as Navbar
      const [
        categoriesResponse,
        subCategoriesResponse,
        childSubCategoriesResponse,
        productsResponse,
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/category`),
        axios.get(`${process.env.REACT_APP_API_URL}/subcategories`),
        axios.get(`${process.env.REACT_APP_API_URL}/childSubCategories`),
        axios.get(`${process.env.REACT_APP_API_URL}/products/getAllProducts`), // Keep this for products
      ]);

      // Set categories data
      if (categoriesResponse.data.success) {
        console.log("Fetched categories:", categoriesResponse.data.categories);
        const categoryNames = [
          "All",
          ...categoriesResponse.data.categories.map((cat) => cat.name),
        ];
        setCategories(categoryNames);
      }

      // Set subcategories data
      if (subCategoriesResponse.data.success) {
        console.log(
          "Fetched subcategories:",
          subCategoriesResponse.data.subCategories
        );
        setSubCategories(subCategoriesResponse.data.subCategories);
      }

      // Set child subcategories data
      if (childSubCategoriesResponse.data.success) {
        console.log(
          "Fetched child subcategories:",
          childSubCategoriesResponse.data.childSubCategories
        );
        setChildSubCategories(
          childSubCategoriesResponse.data.childSubCategories
        );
      }

      // Set products data
      const productsData = productsResponse.data.products || [];
      console.log("Products data fetched:", productsData);
      setProducts(productsData);

      // Extract unique brands from products
      const uniqueBrands = [
        "All",
        ...new Set(
          productsData.map((p) => extractValue(p.brand)).filter(Boolean)
        ),
      ];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract value from string or object
  const extractValue = (item) => {
    if (!item) return null;
    if (typeof item === "string") return item;
    if (typeof item === "object" && item.name) return item.name;
    return null;
  };

  // Get subcategories for selected category using the same logic as Navbar
  const getSubCategoriesForCategory = (categoryName) => {
    if (categoryName === "All") {
      return ["All", ...new Set(subCategories.map((sub) => sub.name))];
    }

    // Find the category object
    const categoryObj = categories.find((cat) => cat === categoryName);
    if (!categoryObj) return ["All"];

    // Filter subcategories for this category
    const filteredSubs = subCategories
      .filter((subCat) => subCat?.category?.name === categoryName)
      .map((sub) => sub.name);

    return ["All", ...new Set(filteredSubs)];
  };

  // Get child subcategories for selected subcategory using the same logic as Navbar
  const getChildSubCategoriesForSubCategory = (subCategoryName) => {
    if (subCategoryName === "All") {
      // If category is also "All", show all child subcategories
      if (selectedCategory === "All") {
        return [
          "All",
          ...new Set(childSubCategories.map((child) => child.name)),
        ];
      }

      // Otherwise, show child subcategories for the selected category
      const categoryFilteredSubs = subCategories.filter(
        (sub) => sub?.category?.name === selectedCategory
      );

      const childSubsForCategory = childSubCategories.filter((child) =>
        categoryFilteredSubs.some((sub) => sub._id === child?.subCategory?._id)
      );

      return [
        "All",
        ...new Set(childSubsForCategory.map((child) => child.name)),
      ];
    }

    // Find the subcategory object
    const subCategoryObj = subCategories.find(
      (sub) => sub.name === subCategoryName
    );
    if (!subCategoryObj) return ["All"];

    // Filter child subcategories for this subcategory
    const filteredChildSubs = childSubCategories
      .filter(
        (childSubCat) => childSubCat?.subCategory?._id === subCategoryObj._id
      )
      .map((child) => child.name);

    return ["All", ...new Set(filteredChildSubs)];
  };

  // Get filtered brands based on current selections
  const getFilteredBrands = () => {
    let filteredProducts = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => extractValue(p.category) === selectedCategory
      );
    }

    // Filter by subcategory
    if (selectedSubCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => extractValue(p.sub_category) === selectedSubCategory
      );
    }

    // Filter by child subcategory
    if (selectedChildSubCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => extractValue(p.child_sub_category) === selectedChildSubCategory
      );
    }

    const filteredBrands = filteredProducts
      .map((p) => extractValue(p.brand))
      .filter(Boolean);

    return ["All", ...new Set(filteredBrands)];
  };

  // Category selection
  const handleCategoryChange = (category) => {
    console.log("Category changed to:", category);
    setSelectedCategory(category);
    setSelectedSubCategory("All");
    setSelectedChildSubCategory("All");
    setSelectedBrands(["All"]);
  };

  // SubCategory selection
  const handleSubCategoryChange = (subCategory) => {
    console.log("SubCategory changed to:", subCategory);
    setSelectedSubCategory(subCategory);
    setSelectedChildSubCategory("All");
    setSelectedBrands(["All"]);
  };

  // Child SubCategory selection
  const handleChildSubCategoryChange = (childSubCategory) => {
    console.log("ChildSubCategory changed to:", childSubCategory);
    setSelectedChildSubCategory(childSubCategory);
    setSelectedBrands(["All"]);
  };

  // Multiple Brand selection
  const handleBrandChange = (brand) => {
    console.log("Selected brand:", brand);

    if (brand === "All") {
      setSelectedBrands(["All"]);
    } else {
      setSelectedBrands((prev) => {
        const currentSelection = Array.isArray(prev) ? prev : ["All"];
        const filteredPrev = currentSelection.filter((b) => b !== "All");

        if (filteredPrev.includes(brand)) {
          const newSelection = filteredPrev.filter((b) => b !== brand);
          return newSelection.length === 0 ? ["All"] : newSelection;
        } else {
          return [...filteredPrev, brand];
        }
      });
    }
  };

  // Search handlers
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput.toLowerCase().trim());
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
  };

  // Filter products based on selections
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All" ||
      extractValue(p.category) === selectedCategory;
    const matchSubCategory =
      selectedSubCategory === "All" ||
      extractValue(p.sub_category) === selectedSubCategory;
    const matchChildSubCategory =
      selectedChildSubCategory === "All" ||
      extractValue(p.child_sub_category) === selectedChildSubCategory;

    const matchBrand =
      Array.isArray(selectedBrands) &&
      (selectedBrands.includes("All") ||
        selectedBrands.includes(extractValue(p.brand)));

    // Search filter with safe string extraction
    const categoryStr = extractValue(p.category) || "";
    const subCategoryStr = extractValue(p.sub_category) || "";
    const childSubCategoryStr = extractValue(p.child_sub_category) || "";
    const brandStr = extractValue(p.brand) || "";

    const matchSearch =
      searchQuery === "" ||
      (p.title && p.title.toLowerCase().includes(searchQuery)) ||
      categoryStr.toLowerCase().includes(searchQuery) ||
      subCategoryStr.toLowerCase().includes(searchQuery) ||
      childSubCategoryStr.toLowerCase().includes(searchQuery) ||
      brandStr.toLowerCase().includes(searchQuery) ||
      (p.description && p.description.toLowerCase().includes(searchQuery));

    return (
      matchCategory &&
      matchSubCategory &&
      matchChildSubCategory &&
      matchBrand &&
      matchSearch
    );
  });

  function truncateText(str, maxLength) {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }

  // Get current filtered lists using Navbar logic
  const currentSubCategories = getSubCategoriesForCategory(selectedCategory);
  const currentChildSubCategories =
    getChildSubCategoriesForSubCategory(selectedSubCategory);
  const currentBrands = getFilteredBrands();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  const handleNavigate = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/cart-item", { state: { id } });
  };

  return (
    <div
      className="flex bg-white min-h-screen px-6 md:px-12 flex-col"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Top subcategory buttons - now functional and filtered */}
      {/* <div className="flex space-x-3 overflow-x-auto scrollbar-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4">
        {currentSubCategories.map((btn, i) => (
          <button
            key={`${btn}-${i}`}
            onClick={() => handleSubCategoryChange(btn)}
            className={`px-8 rounded-md py-2 text-sm text-white md:mt-5 mt-3 flex-shrink-0 transition-colors ${
              selectedSubCategory === btn 
                ? 'bg-[#533507]' 
                : 'bg-[#644206] hover:bg-[#533507]'
            }`}
          >
            {btn}
          </button>
        ))}
      </div> */}

      <div className="flex gap-2 md:my-10 my-6">
        {/* Sidebar */}
        <aside className="w-96 md:block hidden bg-white shadow-sm p-6 border">
          {/* Enhanced Search */}
          <div className="mb-4">
            <div className="flex rounded-md shadow-sm overflow-hidden">
              <input
                type="text"
                placeholder="Search product, category, brand"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                className="flex-1 px-4 py-2 text-sm border border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-[#644206] text-white px-5 py-2 text-sm font-medium rounded-r-md hover:bg-[#533507] transition-colors"
              >
                Search
              </button>
            </div>

            {/* Search status and clear button */}
            {searchQuery && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  Showing results for: "{searchQuery}" (
                  {filteredProducts.length} products)
                </span>
                <button
                  onClick={clearSearch}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Categories */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">CATEGORY</h3>
          <ul className="mb-4 space-y-1">
            {categories.map((cat, index) => (
              <li key={`category-${cat}-${index}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="hidden peer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
                  <span className="text-sm text-gray-600">{String(cat)}</span>
                </label>
              </li>
            ))}
          </ul>

          {/* Sub Category - Now using Navbar logic */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            SUB CATEGORY
          </h3>
          <ul className="mb-4 space-y-1">
            {currentSubCategories.map((sub, index) => (
              <li key={`subcategory-${sub}-${index}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sub_category"
                    value={sub}
                    checked={selectedSubCategory === sub}
                    onChange={() => handleSubCategoryChange(sub)}
                    className="hidden peer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
                  <span className="text-sm text-gray-600">{String(sub)}</span>
                </label>
              </li>
            ))}
          </ul>

          {/* Child Sub Category - Now using Navbar logic */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">CHILD</h3>
          <ul className="mb-4 space-y-1">
            {currentChildSubCategories.map((child, index) => (
              <li key={`childsubcategory-${child}-${index}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="child_sub_category"
                    value={child}
                    checked={selectedChildSubCategory === child}
                    onChange={() => handleChildSubCategoryChange(child)}
                    className="hidden peer"
                  />
                  <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
                  <span className="text-sm text-gray-600">{String(child)}</span>
                </label>
              </li>
            ))}
          </ul>

          {/* Brands - Now filtered based on current selections */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">BRANDS</h3>
          <ul className="space-y-1 overflow-y-auto pr-1">
            {currentBrands.map((brand, index) => (
              <li key={`brand-${brand}-${index}`}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="brand"
                    value={brand}
                    checked={
                      Array.isArray(selectedBrands) &&
                      selectedBrands.includes(brand)
                    }
                    onChange={() => handleBrandChange(brand)}
                    className="hidden peer"
                  />
                  {/* Checkbox style instead of radio */}
                  <span className="w-4 h-4 border-2 border-orange-400 bg-orange-100 peer-checked:bg-orange-500 peer-checked:border-orange-500 flex items-center justify-center rounded-sm">
                    {Array.isArray(selectedBrands) &&
                      selectedBrands.includes(brand) && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                  </span>
                  <span className="text-sm text-gray-600">{String(brand)}</span>
                  {/* Show selected indicator for non-"All" brands */}
                  {Array.isArray(selectedBrands) &&
                    selectedBrands.includes(brand) &&
                    brand !== "All" && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full ml-auto">
                        Selected
                      </span>
                    )}
                </label>
              </li>
            ))}
          </ul>

          {/* Show selected brands count */}
          {Array.isArray(selectedBrands) &&
            selectedBrands.length > 0 &&
            !selectedBrands.includes("All") && (
              <div className="mt-2 text-xs text-gray-500">
                {selectedBrands.length} brand(s) selected
              </div>
            )}

          {/* Active Filters Summary */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Active Filters
            </h4>
            <div className="space-y-1 text-xs">
              <div>
                Category:{" "}
                <span className="font-medium text-orange-600">
                  {selectedCategory}
                </span>
              </div>
              <div>
                Subcategory:{" "}
                <span className="font-medium text-orange-600">
                  {selectedSubCategory}
                </span>
              </div>
              <div>
                Product:{" "}
                <span className="font-medium text-orange-600">
                  {selectedChildSubCategory}
                </span>
              </div>
              <div>
                Brands:{" "}
                <span className="font-medium text-orange-600">
                  {Array.isArray(selectedBrands)
                    ? selectedBrands.join(", ")
                    : "None"}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-700">
                Results: {filteredProducts.length} products
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 lg:pl-6">
          {/* Results header */}
          <div className="mb-4">
            <p className="text-gray-600 text-sm">
              Showing {filteredProducts.length} of {products.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* No results message */}
          {filteredProducts.length === 0 && products.length > 0 && (
            <NetworkErrorPage />
          )}

          {/* Products grid */}
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-8">
            {filteredProducts.map((product) => (
              <div>
                <div
                  key={product._id}
                  className="bg-white border rounded-lg p-3 shadow-sm group relative hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    console.log(
                      "Navigating to product details for:",
                      product._id
                    );
                    navigate("/product-details", {
                      state: { id: product._id },
                    });
                    window.scrollTo(0, 0);
                  }}
                >
                  {/* New Badge */}
                  {product.tag && (
                    <span
                      className="absolute top-3 left-3 bg-[#df920e] rounded-tr-full rounded-br-full rounded-bl-full text-white text-sm p-3"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {String(product.tag)}
                    </span>
                  )}

                  {/* Image */}
                  <img
                    src={product.main_image || image}
                    alt={product.title || "Product"}
                    className="mx-auto mt-8 w-40 xl:h-40 h-32 object-contain"
                  />

                  <div className="mt-4 text-center bg-[#f7f7f7] p-2">
                    {/* Name */}
                    <h3
                      className="text-black font-semibold text-base capitalize"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {product.title
                        ? truncateText(product.title, 20)
                        : "Product Name Not Available"}
                    </h3>

                    {/* Rating */}
                    <div className="flex justify-center mt-2">
                      <Rating value={product.star || 0} />
                    </div>

                    {/* Price */}
                    <div className="mt-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{(product.dp_price || 0).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{(product.mrp || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Cart Icon */}
                  {/* <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
                  <button 
                    className="bg-yellow-500 p-2 rounded-full text-white hover:bg-yellow-600"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation when clicking cart
                      // Add your cart logic here
                    }}
                  >
                    <AiOutlineShoppingCart />
                  </button>
                </div> */}
                </div>
                {/* Footer Nav - Only show if products are visible */}
                {filteredProducts.length > 0 && (
                  <div className="z-50 fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center py-3 sm:hidden">
                    <button
                      className="flex flex-col items-center text-gray-600 hover:text-blue-600"
                      onClick={() => navigate("/")}
                    >
                      <Home size={22} />
                      <span className="text-xs">Home</span>
                    </button>

                    <button
                      className="flex flex-col items-center text-gray-600 hover:text-blue-600"
                      onClick={() => handleNavigate(storeData?.consumerId)}
                    >
                      <ShoppingCart size={22} />
                      <span className="text-xs">Cart</span>
                    </button>

                    <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                      <Heart size={22} />
                      <span className="text-xs">Wishlist</span>
                    </button>

                    <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                      <User size={22} />
                      <span className="text-xs">Account</span>
                    </button>
                    <button
                      className="flex flex-col items-center text-gray-600 hover:text-blue-600"
                      onClick={() => setFilterOpen(true)}
                    >
                     <SlidersHorizontal size={22}/>
                      <span className="text-xs">Filter</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
        {/* Mobile Filter Sidebar */}
{filterOpen && (
  <div className="fixed inset-0 z-50 flex">
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black bg-opacity-50"
      onClick={() => setFilterOpen(false)}
    ></div>

    {/* Sidebar */}
    <div className="relative bg-white w-4/5 max-w-sm h-full shadow-lg z-50 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setFilterOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Category Filter */}
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
      <ul className="mb-4 space-y-1">
        {categories.map((cat, index) => (
          <li key={`m-category-${index}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="m_category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={() => handleCategoryChange(cat)}
                className="hidden peer"
              />
              <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
              <span className="text-sm text-gray-600">{cat}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Sub Category */}
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Sub Category</h3>
      <ul className="mb-4 space-y-1">
        {currentSubCategories.map((sub, index) => (
          <li key={`m-sub-${index}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="m_subcategory"
                value={sub}
                checked={selectedSubCategory === sub}
                onChange={() => handleSubCategoryChange(sub)}
                className="hidden peer"
              />
              <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
              <span className="text-sm text-gray-600">{sub}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Child Sub Category */}
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Product Type</h3>
      <ul className="mb-4 space-y-1">
        {currentChildSubCategories.map((child, index) => (
          <li key={`m-child-${index}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="m_childsubcategory"
                value={child}
                checked={selectedChildSubCategory === child}
                onChange={() => handleChildSubCategoryChange(child)}
                className="hidden peer"
              />
              <span className="w-2.5 h-2.5 rounded-full border border-orange-400 bg-orange-100 peer-checked:bg-orange-500"></span>
              <span className="text-sm text-gray-600">{child}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Brands */}
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Brands</h3>
      <ul className="space-y-1 mb-4">
        {currentBrands.map((brand, index) => (
          <li key={`m-brand-${index}`}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="m_brand"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="hidden peer"
              />
              <span className="w-4 h-4 border-2 border-orange-400 bg-orange-100 peer-checked:bg-orange-500 peer-checked:border-orange-500 flex items-center justify-center rounded-sm">
                {selectedBrands.includes(brand) && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span className="text-sm text-gray-600">{brand}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* Apply Button */}
      <div className="mt-6">
        <button
          className="w-full bg-orange-500 text-white py-2 rounded-md font-medium hover:bg-orange-600"
          onClick={() => setFilterOpen(false)}
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Products;
