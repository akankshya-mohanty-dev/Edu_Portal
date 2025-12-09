// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import UserSkeletonBody from "../../components/Admin/usermanagement/UserSkeletonBody";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     number: "",
//     address: "",
//     role: "student",
//     collegeName: "",
//   });
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/userData/get-all-user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data.success) setUsers(res.data.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error fetching users");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/userData/user-create`,
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data.success) {
//         alert("User created successfully!");
//         setShowModal(false);
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           number: "",
//           address: "",
//           role: "student",
//           collegeName: "",
//         });
//         fetchUsers();
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Error creating user");
//     }
//   };

//   // Delete user
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This user will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.delete(`${process.env.REACT_APP_API_URL}/userData/delete-user/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) {
//           Swal.fire("Deleted!", "User has been deleted.", "success");
//           fetchUsers();
//         }
//       } catch (error) {
//         Swal.fire("Error!", error.response?.data?.message || "Failed to delete user.", "error");
//       }
//     }
//   };

//   // Filter + Pagination
//   const filteredData = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="p-6 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">User Management</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Create User
//         </button>
//       </div>

//       {/* Search + Rows per page */}
//       <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="Search Name..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-64 border p-2 rounded"
//         />
//         <div className="flex items-center gap-2">
//           <label>Rows per page:</label>
//           <select
//             value={rowsPerPage}
//             onChange={(e) => setRowsPerPage(Number(e.target.value))}
//             className="border p-1 rounded w-16"
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white border rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Number</th>
//               <th className="px-4 py-2 text-left">Address</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">College Name</th>
//               <th className="px-4 py-2 text-left">Action</th>
//             </tr>
//           </thead>
//           {isLoading ? (
//             <UserSkeletonBody />
//           ) : (
//             <tbody className="divide-y divide-gray-200">
//               {paginatedData.map((user) => (
//                 <tr key={user._id} className="hover:bg-blue-50 text-center">
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.number}</td>
//                   <td className="px-4 py-2">{user.address}</td>
//                   <td className="px-4 py-2">{user.role}</td>
//                   <td className="px-4 py-2">{user.collegeName || "-"}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           )}
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-3 flex justify-end gap-2">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-3 py-1">{currentPage}</span>
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Create Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//               onClick={() => setShowModal(false)}
//             >
//               ✖
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Create User</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="number"
//                 placeholder="Number"
//                 value={formData.number}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               >
//                 <option value="student">Student</option>
//                 <option value="teacher">Teacher</option>
//               </select>
//               {formData.role === "student" && (
//                 <input
//                   type="text"
//                   name="collegeName"
//                   placeholder="College Name"
//                   value={formData.collegeName}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded"
//                   required
//                 />
//               )}
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UserSkeletonBody from "../../components/Admin/usermanagement/UserSkeletonBody";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // track user being edited
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    address: "",
    role: "student",
    collegeName: "",
    // courseToken: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/userData/get-all-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setUsers(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", // leave empty for security, only update if user enters
      number: user.number,
      address: user.address,
      role: user.role,
      collegeName: user.collegeName || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingUser) {
        // Update user
        const payload = { ...formData };
        if (!payload.password) delete payload.password; // don't send empty password
        res = await axios.put(
          `${process.env.REACT_APP_API_URL}/userData/update-user/${editingUser._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          Swal.fire("Success", "User updated successfully!", "success");
          fetchUsers();
          setEditingUser(null);
        }
      } else {
        // Create user
        res = await axios.post(
          `${process.env.REACT_APP_API_URL}/userData/user-create`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          Swal.fire("Success", "User created successfully!", "success");
          fetchUsers();
        }
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        number: "",
        address: "",
        role: "student",
        collegeName: "",
        // courseToken: "",
      });
      setShowModal(false);
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/userData/delete-user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
        }
      } catch (error) {
        Swal.fire("Error!", error.response?.data?.message || "Failed to delete user.", "error");
      }
    }
  };

  // Filter + Pagination
  const filteredData = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>
      </div>

      {/* Search + Rows per page */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search Name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-64 border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <label>Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border p-1 rounded w-16"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">College Name</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          {isLoading ? (
            <UserSkeletonBody />
          ) : (
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((user) => (
                <tr key={user._id} className="hover:bg-blue-50 text-center">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.number}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.collegeName || "-"}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? "Edit User" : "Create User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="number"
                placeholder="Number"
                value={formData.number}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {formData.role === "student" && (
                <>
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={formData.collegeName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  {/* <input
                    type="text"
                    name="courseToken"
                    placeholder="Course Token"
                    value={formData.courseToken}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  /> */}
                </>
              )}
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                {editingUser ? "Update User" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
