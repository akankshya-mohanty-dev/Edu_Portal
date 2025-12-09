import React from "react";
import { BookOpen, PlayCircle, Calendar, User } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen  p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-gray-600">Welcome, Student</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* Enrolled Courses */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Your Enrolled Courses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Course Card */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">JavaScript Mastery</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn JS from basics to advanced.
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>

                <p className="text-sm text-blue-600 font-semibold">70% Completed</p>
              </div>

              {/* Course Card */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold text-lg mb-2">React Development</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Build modern web apps using React.
                </p>

                <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>

                <p className="text-sm text-purple-600 font-semibold">40% Completed</p>
              </div>

            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-600" />
                  <div>
                    <p className="font-semibold">React Live Class</p>
                    <p className="text-sm text-gray-500">Tomorrow, 7:00 PM</p>
                  </div>
                </div>
                <button className="px-4 py-1 bg-blue-600 text-white rounded-lg">
                  Join
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-600" />
                  <div>
                    <p className="font-semibold">Node.js Workshop</p>
                    <p className="text-sm text-gray-500">Friday, 6:30 PM</p>
                  </div>
                </div>
                <button className="px-4 py-1 bg-purple-600 text-white rounded-lg">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-24 h-24 mx-auto rounded-full mb-3 border"
            />
            <h2 className="text-xl font-semibold">Aditya</h2>
            <p className="text-gray-500">Student • EduPay Portal</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
              Edit Profile
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Quick Access</h2>

            <div className="space-y-4">

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <BookOpen /> My Courses
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <PlayCircle /> Continue Learning
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <User /> Profile Settings
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
