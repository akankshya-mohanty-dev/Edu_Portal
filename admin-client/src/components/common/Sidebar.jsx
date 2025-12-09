// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { RiMenu4Line, RiDashboardLine } from "react-icons/ri";
// import { IoClose, IoGridOutline } from "react-icons/io5";
// import { FaAngleUp, FaAngleDown } from "react-icons/fa";
// import { useState } from "react";
// import axios from "axios";

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   const [fetchedPermissions, setFetchedPermissions] = useState(null);
//   const [permissionData, setPermissionData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const storedData = localStorage.getItem("user");
//   const storedData2 = localStorage.getItem("Employee");
//   const storedData3 = localStorage.getItem("Consumer");

//   const userData = storedData ? JSON.parse(storedData) : {};
//   const userData2 = storedData2 ? JSON.parse(storedData2) : {};
//   const userData3 = storedData3 ? JSON.parse(storedData3) : {};

//   const [employeeId, setEmployeeId] = useState(userData2._id);
//   const [expandedMenu, setExpandedMenu] = React.useState(null);

//   const navigate = useNavigate();
//   const path = useLocation();

//   useEffect(() => {
//     if (employeeId) {
//       fetchUserData(employeeId);
//     } else {
//       setIsLoading(false);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (fetchedPermissions?.permissions) {
//       fetchPermissionData(fetchedPermissions.permissions);
//     } else {
//       setIsLoading(false);
//     }
//   }, [fetchedPermissions]);

//   const fetchUserData = (id) => {
//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `${process.env.REACT_APP_API_URL}/joiningForm/get-all-joining-form-data/${id}`,
//       headers: {},
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log("response data", response.data.data?.permissions);
//         setFetchedPermissions(response?.data?.data);
//       })
//       .catch((error) => {
//         console.log("Error fetching user data:", error);
//         setIsLoading(false);
//       });
//   };

//   const fetchPermissionData = (id) => {
//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `${process.env.REACT_APP_API_URL}/permissions/getById/${id}`,
//       headers: {},
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log("permission data", response.data);
//         setPermissionData(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.log("Error fetching permission data:", error);
//         setIsLoading(false);
//       });
//   };

//   const getCurrentUserData = () => {
//     if (userData.role) return userData;
//     if (fetchedPermissions?.leadershipPost) return fetchedPermissions;
//     return userData3;
//   };

//   const data = getCurrentUserData();
//   const getCurrentPermissions = () => {
//     if (userData.role === "admin") return userData.permissions;
//     if (permissionData) return permissionData;
//     if (data?.permissions) return data.permissions;
//     return null;
//   };

//   const permissions = getCurrentPermissions();

//   console.log("Current data:", data);
//   console.log("Current permissions:", permissions);
//   const hasPermission = (route, user, userPermissions) => {
//     if (!route.permission) return true;
//     if (user.role === "admin") return true;
//     if (user.userType === "consumer") return true;
//     if (user.employeeType && userPermissions?.departments) {
//       const dept = userPermissions.departments.find(
//         (d) => d.name.toLowerCase() === user.department?.toLowerCase()
//       );

//       if (!dept) {
//         console.log(`Department not found: ${user.department}`);
//         return false;
//       }

//       const role = dept.roles.find(
//         (r) => r.name.toLowerCase() === user.leadershipPost?.toLowerCase()
//       );

//       if (!role) {
//         console.log(`Role not found: ${user.leadershipPost}`);
//         return false;
//       }

//       // Check if this panel is allowed
//       for (const panel of role.panels) {
//         if (panel.key === route.permission && panel.allowed) {
//           return true;
//         }

//         // Check subcomponents if main panel is not directly allowed
//         if (panel.subComponents?.length) {
//           const allowedSub = panel.subComponents.find(
//             (s) => s.key === route.permission && s.allowed
//           );
//           if (allowedSub) return true;
//         }
//       }
//     }

//     // If we have basic permissions object (fallback)
//     if (userPermissions && typeof userPermissions === "object") {
//       // Check if permission exists and is true
//       if (userPermissions[route.permission] === true) return true;

//       // Check nested permissions
//       for (const [key, value] of Object.entries(userPermissions)) {
//         if (typeof value === "object" && value[route.permission] === true) {
//           return true;
//         }
//       }
//     }

//     console.log(`Permission denied for route: ${route.permission}`);
//     return false;
//   };

//   // Get filtered children for a menu item
//   const getFilteredChildren = (item, user, userPermissions) => {
//     if (!item.children) return [];

//     return item.children.filter((child) => {
//       // If child has no permission requirement, include it
//       if (!child.permission) return true;

//       return hasPermission(child, user, userPermissions);
//     });
//   };

//   // Check if a parent menu item should be shown
//   const shouldShowParentItem = (item, user, userPermissions) => {
//     // If item has direct permission, check it
//     if (item.permission) {
//       if (!hasPermission(item, user, userPermissions)) {
//         // If parent is not allowed, check if any children are allowed
//         if (item.children) {
//           const allowedChildren = getFilteredChildren(
//             item,
//             user,
//             userPermissions
//           );
//           return allowedChildren.length > 0;
//         }
//         return false;
//       }
//     }

//     // If no permission required or permission granted, show the item
//     return true;
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleParentClick = (label) => {
//     setExpandedMenu((prev) => (prev === label ? null : label));
//   };

//   // Menu items definitions (same as original)
//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: <RiDashboardLine size={18} />,
//       path: "/dashboard",
//       permission: "dashboard",
//     },
//     {
//       label: "Permissions",
//       icon: <RiDashboardLine size={18} />,
//       path: "/permissions",
//     },
//     {
//       label: "Sub Admin",
//       icon: <RiDashboardLine size={18} />,
//       path: "/staff",
//       permission: "staff",
//     },
//     {
//       label: "Employee Salary",
//       icon: <RiDashboardLine size={18} />,
//       permission: "employeSalary",
//       children: [
//         {
//           label: "Create Salary",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-salary",
//         },
//         {
//           label: "Employee Salary",
//           icon: <RiDashboardLine size={18} />,
//           path: "/employee-salary",
//         },
//       ],
//     },
//     {
//       label: "Application Report",
//       icon: <RiDashboardLine size={18} />,
//       permission: "career",
//       children: [
//         {
//           label: "Job Opening",
//           icon: <RiDashboardLine size={18} />,
//           path: "/job-opening",
//         },
//         {
//           label: "Applicant",
//           icon: <RiDashboardLine size={18} />,
//           path: "/applicant",
//         },
//         {
//           label: "Interview List",
//           icon: <RiDashboardLine size={18} />,
//           path: "/interview-list",
//         },
//         {
//           label: "Selected Candidate",
//           icon: <RiDashboardLine size={18} />,
//           path: "/selected-candidate",
//         },
//         {
//           label: "Registration List",
//           icon: <RiDashboardLine size={18} />,
//           path: "/applicant-list",
//         },
//       ],
//     },
//     {
//       label: "Add Employee",
//       icon: <RiDashboardLine size={18} />,
//       permission: "employeeData",
//       children: [
//         {
//           label: "Create Employee",
//           icon: <RiDashboardLine size={18} />,
//           path: "/employee-form",
//         },
//         {
//           label: "Employee Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/employee-details",
//         },
//       ],
//     },
//     {
//       label: "Consumers",
//       icon: <RiDashboardLine size={18} />,
//       permission: "consumerData",
//       children: [
//         {
//           label: "consumer Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/consumer-form",
//         },
//         {
//           label: "Consumer Family Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/consumer-family-details",
//         },
//       ],
//     },
//     {
//       label: "Downloads(New Letter)",
//       icon: <RiDashboardLine size={18} />,
//       permission: "downloads",
//       children: [
//         {
//           label: "Official Letter",
//           icon: <RiDashboardLine size={18} />,
//           path: "/appointment-letter",
//         },
//         {
//           label: "letter Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/appointment-details",
//         },
//         {
//           label: "Official Circular",
//           icon: <RiDashboardLine size={18} />,
//           path: "/circular-form",
//         },
//         {
//           label: "circular Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/circular-details",
//         },
//         {
//           label: "Business plan(ppt)",
//           icon: <RiDashboardLine size={18} />,
//           path: "/business-plan",
//         },
//         {
//           label: "Plan Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/plan-details",
//         },
//       ],
//     },
//     {
//       label: "Product",
//       icon: <RiDashboardLine size={18} />,
//       permission: "product",
//       children: [
//         {
//           label: "Category",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-category",
//         },
//         {
//           label: "SubCategory",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-subcategory",
//         },
//         {
//           label: "ChildSubCategory",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-child-subcategory",
//         },
//         {
//           label: "Create FAQ",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-faq",
//         },
//         {
//           label: "All FAQ",
//           icon: <RiDashboardLine size={18} />,
//           path: "/all-faq",
//         },
//         {
//           label: "Create Product",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-product",
//         },
//         {
//           label: "Add Stock",
//           icon: <RiDashboardLine size={18} />,
//           path: "/add-stock",
//         },
//         {
//           label: "Product Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/all-product-details",
//         },
//         {
//           label: "Stock Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/stock-details",
//         },
//       ],
//     },
//     {
//       label: "Order",
//       icon: <RiDashboardLine size={18} />,
//       permission: "orders",
//       children: [
//         {
//           label: "Create Order",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-order",
//         },
//         {
//           label: "Order Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/all-orders",
//         },
//       ],
//     },
//     {
//       label: "WareHouse",
//       icon: <RiDashboardLine size={18} />,
//       permission: "warehouse",
//       children: [
//         {
//           label: "WareHouse Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/warehouse",
//         },
//       ],
//     },
//     {
//       label: "Inquery",
//       icon: <RiDashboardLine size={18} />,
//       path: "/inquery",
//       permission: "inquery",
//     },
//     {
//       label: "Packages",
//       icon: <RiDashboardLine size={18} />,
//       permission: "package",
//       children: [
//         {
//           label: "Welcome Kit Create",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-welcome-kit",
//         },
//         {
//           label: "Welcome Kit Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/all-welcome-kit",
//         },
//         {
//           label: "Create Package",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-package",
//         },
//         {
//           label: "Package Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/all-packages",
//         },
//       ],
//     },
//   ];

//   const menuItems2 = [
//     {
//       label: "Dashboard",
//       icon: <RiDashboardLine size={18} />,
//       path: "/employee-dashboard",
//       permission: "employee-dashboard",
//     },
//     {
//       label: "Download Letter",
//       icon: <RiDashboardLine size={18} />,
//       path: "/employee-appointment-letter",
//       permission: "employee-appointment-letter",
//     },
//     {
//       label: "Business Letter",
//       icon: <RiDashboardLine size={18} />,
//       path: "/employee-business-letter",
//       permission: "employee-business-letter",
//     },
//     {
//       label: "Consumer",
//       icon: <RiDashboardLine size={18} />,
//       permission: "consumer",
//       children: [
//         {
//           label: "Add Consumer",
//           icon: <RiDashboardLine size={18} />,
//           path: "/add-consumer",
//           permission: "add-consumer",
//         },
//         {
//           label: "Consumer Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/consumer-details",
//           permission: "consumer-details",
//         },
//         {
//           label: "Family Member's",
//           icon: <RiDashboardLine size={18} />,
//           path: "/family-details",
//           permission: "family-details",
//         },
//       ],
//     },
//     {
//       label: "Employee Data",
//       icon: <RiDashboardLine size={18} />,
//       path: "/employee-data-details",
//       permission: "employee-data-details",
//     },
//     {
//       label: "Hierarchy Management",
//       icon: <RiDashboardLine size={18} />,
//       path: "/hierarchy-management",
//       permission: "hierarchy-management",
//     },
//     {
//       label: "Salary",
//       icon: <RiDashboardLine size={18} />,
//       permission: "salary",
//       children: [
//         {
//           label: "Incentive Product",
//           icon: <RiDashboardLine size={18} />,
//           path: "/salary",
//           permission: "salary-details",
//         },
//       ],
//     },
//     {
//       label: "Order",
//       icon: <RiDashboardLine size={18} />,
//       permission: "consumer-order",
//       children: [
//         {
//           label: "Create Order",
//           icon: <RiDashboardLine size={18} />,
//           path: "/create-consumer-order",
//           permission: "create-consumer-order",
//         },
//         {
//           label: "Order Details",
//           icon: <RiDashboardLine size={18} />,
//           path: "/consumer-order",
//           permission: "consumer-order-details",
//         },
//       ],
//     },
//     {
//       label: "Daily Report",
//       icon: <RiDashboardLine size={18} />,
//       permission: "daily-report",
//       children: [
//         {
//           label: "Daily Report Form",
//           icon: <RiDashboardLine size={18} />,
//           path: "/daily-report-family-visits",
//           permission: "daily-report-family-visits",
//         },
//         {
//           label: "Today Daily Report",
//           icon: <RiDashboardLine size={18} />,
//           path: "/daily-report-family-visits-details",
//           permission: "daily-report-family-visits-details",
//         },
//         {
//           label: "All Daily Report",
//           icon: <RiDashboardLine size={18} />,
//           path: "/daily-report-family-visits-details-all",
//           // permission: "daily-report-family-visits-details-all",
//         },
//       ],
//     },
//   ];

//   const menuItems3 = [
//     {
//       label: "Dashboard",
//       icon: <RiDashboardLine size={18} />,
//       path: "/consumer-dashboard",
//     },
//     {
//       label: "Family Details",
//       icon: <RiDashboardLine size={18} />,
//       path: "/family-data",
//     },
//     {
//       label: "Order Details",
//       icon: <RiDashboardLine size={18} />,
//       path: "/consumer-order-details",
//     },
//   ];

//   // Determine which menu items to render
//   const getMenuItemsToRender = () => {
//     if (userData.role) return menuItems; // Admin
//     if (userData2.leadershipPost) return menuItems2; // Employee
//     return menuItems3; // Consumer
//   };

//   const itemsToRender = getMenuItemsToRender();

//   const renderMenuItems = () => {
//     // Show loading state
//     if (isLoading) {
//       return (
//         <div className="flex items-center justify-center p-4">
//           <div className="text-gray-500">Loading menu...</div>
//         </div>
//       );
//     }

//     return (
//       <ul className="space-y-1 tracking-wide">
//         {itemsToRender
//           .filter((item) => shouldShowParentItem(item, data, permissions))
//           .map((item) => {
//             const isExpanded = expandedMenu === item.label;
//             const filteredChildren = getFilteredChildren(
//               item,
//               data,
//               permissions
//             );
//             const isChildActive = filteredChildren.some(
//               (child) => path.pathname === child.path
//             );

//             return (
//               <li key={item.label}>
//                 <div
//                   onClick={() =>
//                     item.children
//                       ? handleParentClick(item.label)
//                       : (() => {
//                           navigate(item.path);
//                           if (window.innerWidth < 1024) {
//                             setTimeout(() => setIsSidebarOpen(false), 200);
//                           }
//                         })()
//                   }
//                   className={`${
//                     path.pathname === item.path
//                       ? "bg-yellow-400 text-white font-medium"
//                       : isChildActive
//                       ? "bg-yellow-200 text-primaryTextColor font-medium"
//                       : "text-primaryTextColor font-normal hover:bg-yellow-100"
//                   } flex items-center cursor-pointer p-2 text-base rounded-lg mt-3`}
//                 >
//                   {item.icon}
//                   <div className="flex justify-between w-full items-center">
//                     <span className="ml-1 tracking-wide sm:whitespace-nowrap">
//                       {item.label}
//                     </span>
//                     {filteredChildren.length > 0 && (
//                       <span className="ml-3">
//                         {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {filteredChildren.length > 0 && isExpanded && (
//                   <ul className="ml-8 mt-1 space-y-1">
//                     {filteredChildren.map((child) => (
//                       <li key={child.path || child.label}>
//                         <div
//                           onClick={() => {
//                             navigate(child.path);
//                             setExpandedMenu(null);
//                             if (window.innerWidth < 1024) {
//                               setTimeout(() => setIsSidebarOpen(false), 200);
//                             }
//                           }}
//                           className={`${
//                             path.pathname === child.path
//                               ? "bg-yellow-400 text-white font-medium"
//                               : "text-primaryTextColor font-normal hover:bg-yellow-100"
//                           } flex items-center cursor-pointer p-2 text-sm rounded-lg mt-3`}
//                         >
//                           {child.icon}
//                           <span className="ml-1 tracking-wide sm:whitespace-nowrap">
//                             {child.label}
//                           </span>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//       </ul>
//     );
//   };

//   return (
//     <React.Fragment>
//       {/* Large sidebar */}
//       <div className="lg:contents hidden flex-shrink-0" aria-label="Sidebar">
//         <div className="overflow-y-auto pb-2 px-3 pt-6 bg-[#FFFFFF] shadow-2xl h-screen">
//           {renderMenuItems()}
//         </div>
//       </div>

//       {/* Mobile sidebar */}
//       <div className="block lg:hidden">
//         <button
//           onClick={toggleSidebar}
//           className="absolute ml-6 mt-[-50px] text-white"
//         >
//           {isSidebarOpen ? <IoClose size={30} /> : <RiMenu4Line size={30} />}
//         </button>
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <motion.div
//               className="h-full sm:w-[50%] w-[100%] absolute z-50 shadow-2xl"
//               initial={{ opacity: 0, x: "-100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: "-100%" }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="overflow-y-auto py-4 px-3 bg-[#FFFFFF] h-screen relative">
//                 {renderMenuItems()}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Sidebar;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu4Line, RiDashboardLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from localStorage (or you can pass as prop)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Determine role manually
  const role =
    user.role === "admin"
      ? "admin"
      : user.role === "teacher"
      ? "teacher"
      : "student";

  // Manual menu configuration per role
  const menuConfig = {
    admin: [
      {
        label: "Dashboard",
        icon: <RiDashboardLine size={18} />,
        path: "/dashboard",
      },
      { label: "Users", icon: <RiDashboardLine size={18} />, path: "/user-management" },
      { label: "Course Approval", icon: <RiDashboardLine size={18} />, path: "/course-approval" },
      { label: "Transactions", icon: <RiDashboardLine size={18} />, path: "/transaction-payment" },
     
    ],
    teacher: [
      {
        label: "Dashboard",
        icon: <RiDashboardLine size={18} />,
        path: "/teacher-dashboard",
      },
      {
        label: "Course",
        icon: <RiDashboardLine size={18} />,
        path: "/teacher-course",
      },
     
    ],
    student: [
      // e.g., student, parent, etc.
      {
        label: "Dashboard",
        icon: <RiDashboardLine size={18} />,
        path: "/student-dashboard",
      },
      {
        label: "My Profile",
        icon: <RiDashboardLine size={18} />,
        path: "/profile",
      },
      {
        label: "Results",
        icon: <RiDashboardLine size={18} />,
        path: "/results",
      },
      // Add more consumer items
    ],
  };

  // Default fallback
  const menuItems = menuConfig[role];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleMenuClick = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsSidebarOpen(false), 200);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <div className=" shadow-2xl h-screen overflow-y-auto pt-6 px-3">
          <SidebarMenu
            items={menuItems}
            location={location}
            onClick={handleMenuClick}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="block lg:hidden">
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded"
        >
          {isSidebarOpen ? <IoClose size={30} /> : <RiMenu4Line size={30} />}
        </button>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 z-40 bg-white w-full sm:w-80 h-screen overflow-y-auto"
            >
              <div className="pt-20 px-4">
                <SidebarMenu
                  items={menuItems}
                  location={location}
                  onClick={handleMenuClick}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Reusable Menu Component
const SidebarMenu = ({ items, location, onClick }) => {
  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <li key={item.path}>
            <div
              onClick={() => onClick(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                ${
                  isActive
                    ? "bg-yellow-400 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"
                }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
