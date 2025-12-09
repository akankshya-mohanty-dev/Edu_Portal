import React from "react";
import { Users, BookOpen, IndianRupee, CheckCircle, MonitorCheck, BarChart3, UserCog, Layers } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen  p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-gray-600">Welcome, Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT 2/3 SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            <div className="p-5 bg-white rounded-xl shadow flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-gray-600 text-sm">Total Users</h3>
                <Users className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold">1,230</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-gray-600 text-sm">Courses</h3>
                <BookOpen className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold">58</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-gray-600 text-sm">Earnings</h3>
                <IndianRupee className="text-green-600" />
              </div>
              <p className="text-2xl font-bold">₹3,45,700</p>
            </div>

            <div className="p-5 bg-white rounded-xl shadow flex flex-col gap-2">
              <div className="flex justify-between">
                <h3 className="text-gray-600 text-sm">Approved Courses</h3>
                <CheckCircle className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold">41</p>
            </div>

          </div>

          {/* RECENT COURSE APPROVALS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pending Course Approvals</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View All
              </button>
            </div>

            <div className="space-y-4">

              {/* Item */}
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">MERN Full Stack Course</p>
                  <p className="text-sm text-gray-500">Uploaded by: John Doe</p>
                </div>
                <button className="px-4 py-1 bg-green-600 text-white rounded-md">
                  Approve
                </button>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold">Python For Beginners</p>
                  <p className="text-sm text-gray-500">Uploaded by: Sarah</p>
                </div>
                <button className="px-4 py-1 bg-green-600 text-white rounded-md">
                  Approve
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">UI/UX Essentials</p>
                  <p className="text-sm text-gray-500">Uploaded by: Alex</p>
                </div>
                <button className="px-4 py-1 bg-green-600 text-white rounded-md">
                  Approve
                </button>
              </div>

            </div>
          </div>

          {/* SYSTEM ANALYTICS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Platform Analytics</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <MonitorCheck />
                <p className="font-medium">User Activity</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <Layers />
                <p className="font-medium">Course Stats</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <BarChart3 />
                <p className="font-medium">Sales Report</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                <UserCog />
                <p className="font-medium">Admin Controls</p>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* ADMIN PROFILE */}
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <img
              src="https://i.pravatar.cc/100"
              className="w-24 h-24 mx-auto rounded-full border mb-3"
              alt="profile"
            />
            <h2 className="text-xl font-semibold">Admin User</h2>
            <p className="text-gray-500">EduPay Administrator</p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Edit Profile
            </button>
          </div>

          {/* QUICK ACCESS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Quick Access</h2>

            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <Users /> Manage Users
              </div>

              <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <BookOpen /> Manage Courses
              </div>

              <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <IndianRupee /> Payments & Revenue
              </div>

              <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <UserCog /> Settings
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
