import React, { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import AuthNavbar from "../components/common/AuthNavbar";
import FooterDashBoard from "../components/AdminSideComponents/DashBoardFooter/FooterDashBoard";
import TopCards from "../components/Admin/Dashboard/TopCards";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const storedData = localStorage.getItem("staff");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);
  const data = userData.role ? <TopCards /> : null;
  return (
    <React.Fragment>
      <AuthNavbar setIsSidebarOpen={setIsSidebarOpen} />
      <div style={{ display: "flex" }} className="mt-[3.9rem]">
        <div className="lg:w-[20%] h-[100vh]">
          {/* Only show the Sidebar when isSidebarOpen is true */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <main className="lg:w-[90%] w-[100%] h-[100vh] overflow-y-scroll bg-[#e4e6ea]">
          {/* <div className=" px-5 py-4">{data}</div> */}
          {children}
          <FooterDashBoard />
        </main>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
