// import React, { useState, useEffect } from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// import Rating from "./Rating";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import FeatureProductSkeleton from "./FeatureProductSkeleton";

// const Products = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllCourse = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await axios.get(
//           `${process.env.REACT_APP_API_URL}/course/get-all-course`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("respon",res.data.courses)
//          const unapprovedCourses = res.data.courses.filter(
//         (course) => course.approved === true
//       );
//       console.log("unapproge",unapprovedCourses)
//       setProducts(unapprovedCourses);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllCourse();
//   }, []);

//   function truncateText(str, maxLength) {
//     if (!str) return "";
//     return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
//   }

//   return (
//     <div>
//       <section className="mx-4 md:mt-0 mt-4 lg:mx-10">
//         <h2
//           className="text-center text-2xl font-semibold tracking-wide my-8 uppercase"
//           style={{ fontFamily: "Belleza, sans-serif" }}
//         >
//           Top Enrolled Courses
//         </h2>

//         {loading ? (
//           <FeatureProductSkeleton />
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="border rounded-md p-3 relative bg-white group hover:shadow-lg transition flex flex-col"
//               >
//                 {/* Tag */}
//                 {product.tag && (
//                   <span
//                     className="absolute top-3 left-3 bg-[#df920e] rounded-tr-full rounded-br-full rounded-bl-full text-white text-sm p-3"
//                     style={{ fontFamily: "Roboto, sans-serif" }}
//                   >
//                     {product.tag}
//                   </span>
//                 )}

//                 {/* Wishlist Icon */}
//                 <AiOutlineHeart className="absolute top-3 right-3 text-gray-500 text-3xl cursor-pointer hover:text-red-500" />

//                 {/* Image */}
//                 <img
//                   src={product.thumbnail}
//                   alt={product.courseName}
//                   className="mx-auto mt-8 w-40 h-40 object-contain"
//                 />

//                 {/* Info */}
//                 <div className="mt-4 text-center bg-[#f7f7f7] p-2 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h3
//                       className="text-black font-semibold text-base capitalize"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       {truncateText(product.courseName, 20)}
//                     </h3>

//                     {/* Rating */}
//                     <div className="flex justify-center mt-2">
//                       <Rating value={product.star || 0} />
//                     </div>

//                     {/* Price */}
//                     <div className="mt-2">
//                       <span className="text-lg font-bold text-gray-900">
//                         ₹{product.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Pay Now Button */}
//                   <button
//                     onClick={() =>
//                       navigate("/checkout", { state: { id: product._id } })
//                     }
//                     className="mt-4 bg-[#df920e] text-white px-4 py-2 rounded-md hover:bg-[#f9bf5b] transition"
//                   >
//                     Pay Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import Rating from "./Rating";
import axios from "axios";
import FeatureProductSkeleton from "./FeatureProductSkeleton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourse = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/course/get-all-course`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const approvedCourses = res.data.courses.filter(
          (course) => course.approved === true
        );
        setProducts(approvedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCourse();
  }, []);

  function truncateText(str, maxLength) {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }

  // Razorpay payment handler
  const handlePayment = async (course) => {
    const token = localStorage.getItem("token");
    try {
      // 1. Create payment order in backend
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/payment/create-payment`,
        {
          amount: course.price * 100, // Razorpay works in paise
          receipt: `receipt_${course._id}`,
          orderId: course._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { payment } = res.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: payment.amount,
        currency: payment.currency || "INR",
        name: "Your Company Name",
        description: course.courseName,
        order_id: payment.razorpay_order_id,
        handler: async function (response) {
          // 3. Verify payment in backend
          await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // 4. Record course purchase
          await axios.post(
            `${process.env.REACT_APP_API_URL}/payment/purchase-course`,
            {
              courseId: course._id,
              paymentId: payment._id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          alert("Payment successful and course purchased!");
        },
        prefill: {
          name: "", // you can add user's name here
          email: "", // user's email
        },
        theme: {
          color: "#df920e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed! Try again.");
    }
  };

  return (
    <div>
      <section className="mx-4 md:mt-0 mt-4 lg:mx-10">
        <h2
          className="text-center text-2xl font-semibold tracking-wide my-8 uppercase"
          style={{ fontFamily: "Belleza, sans-serif" }}
        >
          Top Enrolled Courses
        </h2>

        {loading ? (
          <FeatureProductSkeleton />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-md p-3 relative bg-white group hover:shadow-lg transition flex flex-col"
              >
                {product.tag && (
                  <span
                    className="absolute top-3 left-3 bg-[#df920e] rounded-tr-full rounded-br-full rounded-bl-full text-white text-sm p-3"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {product.tag}
                  </span>
                )}

                <AiOutlineHeart className="absolute top-3 right-3 text-gray-500 text-3xl cursor-pointer hover:text-red-500" />

                <img
                  src={product.thumbnail}
                  alt={product.courseName}
                  className="mx-auto mt-8 w-40 h-40 object-contain"
                />

                <div className="mt-4 text-center bg-[#f7f7f7] p-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-black font-semibold text-base capitalize"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {truncateText(product.courseName, 20)}
                    </h3>

                    <div className="flex justify-center mt-2">
                      <Rating value={product.star || 0} />
                    </div>

                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePayment(product)}
                    className="mt-4 bg-[#df920e] text-white px-4 py-2 rounded-md hover:bg-[#f9bf5b] transition"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
