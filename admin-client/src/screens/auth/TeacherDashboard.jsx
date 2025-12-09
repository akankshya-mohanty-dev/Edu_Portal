import React from "react";
import { BookOpen, Users, Star, CheckCircle } from "lucide-react";

const TeacherDashboard = () => {
  return (
    <div className="p-6  min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-6">Teacher Dashboard</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Courses */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Total Courses</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
          <BookOpen className="text-blue-600" size={40} />
        </div>

        {/* Active Students */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Active Students</p>
            <h2 className="text-2xl font-bold">243</h2>
          </div>
          <Users className="text-green-600" size={40} />
        </div>

        {/* Ratings */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Ratings</p>
            <h2 className="text-2xl font-bold">4.8</h2>
          </div>
          <Star className="text-yellow-500" size={40} />
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-600">Tasks Completed</p>
            <h2 className="text-2xl font-bold">32</h2>
          </div>
          <CheckCircle className="text-purple-600" size={40} />
        </div>

      </div>

      {/* RECENT COURSES TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3">Course Name</th>
              <th className="p-3">Students</th>
              <th className="p-3">Status</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Full Stack Development</td>
              <td className="p-3">89</td>
              <td className="p-3 text-green-600 font-medium">Active</td>
              <td className="p-3">4.9</td>
            </tr>

            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">Python for Beginners</td>
              <td className="p-3">54</td>
              <td className="p-3 text-yellow-600 font-medium">Pending</td>
              <td className="p-3">4.7</td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="p-3">UI/UX Design Basics</td>
              <td className="p-3">30</td>
              <td className="p-3 text-green-600 font-medium">Active</td>
              <td className="p-3">4.8</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TeacherDashboard;
