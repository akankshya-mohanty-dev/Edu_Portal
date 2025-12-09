import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseApproval = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(null); // track which course is approving

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/course/get-all-course`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApprove = async (courseId) => {
    try {
      setApproving(courseId);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/course/approve-course/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        // update course in UI
        setCourses((prev) =>
          prev.map((course) =>
            course._id === courseId ? { ...course, approved: true } : course
          )
        );
      }
    } catch (error) {
      console.error("Error approving course:", error);
    } finally {
      setApproving(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }

  return (
    <div className="mx-4 md:mx-10 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Course Approval
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-md p-4 bg-white shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">
                {course.description
                  ? course.description.slice(0, 60) + "..."
                  : "No description"}
              </p>
              <p className="text-sm text-gray-500">
                Approved:{" "}
                {course.approved ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </p>
            </div>

            {!course.approved && (
              <button
                onClick={() => handleApprove(course._id)}
                disabled={approving === course._id}
                className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold transition ${
                  approving === course._id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#df920e] hover:bg-[#f9bf5b]"
                }`}
              >
                {approving === course._id ? "Approving..." : "Approve"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseApproval;
