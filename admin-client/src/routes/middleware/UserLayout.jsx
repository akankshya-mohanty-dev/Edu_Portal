import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { FaWhatsapp } from "react-icons/fa6";

const UserLayout = (props) => {
  const MessageButton = () => {
    const openMessageModal = () => {
      const phoneNumber = "911234567890";
      const whatsappUrl = `https://wa.me/${phoneNumber}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <button
        className="fixed right-4 bottom-4 p-2 bg-[#f5e7e7] rounded-full shadow-lg hover:bg-[#f8bdbd] hover:scale-105 ease-in-out duration-300 focus:outline-none transition-transform transform-gpu"
        onClick={openMessageModal}
      >
        <FaWhatsapp size={32} color="#10b416" />
      </button>
    );
  };

  return (
    <React.Fragment>
      {/* <TopNavbar /> */}
      <Navbar />
      {props.children}
      <Footer />

      {/* <MessageButton /> */}
    </React.Fragment>
  );
};

export default UserLayout;
