import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    courseName: "",
    description: "",
    price: "",
    thumbnail: "",
  });
  const [editingId, setEditingId] = useState(null); // track which course is being edited
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/course/get-all-course`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        // Update existing course
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/course/update-course/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setCourses((prev) =>
            prev.map((c) => (c._id === editingId ? res.data.course : c))
          );
          setEditingId(null);
          setForm({ courseName: "", description: "", price: "", thumbnail: "" });
        }
      } else {
        // Create new course
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/course/create-course`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setCourses((prev) => [res.data.course, ...prev]);
          setForm({ courseName: "", description: "", price: "", thumbnail: "" });
        }
      }
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      courseName: course.courseName,
      description: course.description,
      price: course.price,
      thumbnail: course.thumbnail,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/course/delete-course/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCourses((prev) => prev.filter((course) => course._id !== id));
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="mx-4 md:mx-10 mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Teacher Courses</h2>

      {/* Course Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8"
      >
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Course" : "Create Course"}
        </h3>
        <input
          type="text"
          name="courseName"
          placeholder="Course Name"
          value={form.courseName}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          rows={3}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#df920e] text-white py-2 rounded hover:bg-[#f9bf5b] transition"
        >
          {submitting
            ? editingId
              ? "Updating..."
              : "Creating..."
            : editingId
            ? "Update Course"
            : "Create Course"}
        </button>
      </form>

      {/* Courses List */}
      {loading ? (
        <p className="text-center mt-10">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center mt-10">No courses found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-md p-4 bg-white shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-lg">{course.courseName}</h3>
              <p className="text-gray-600 mb-2">
                {course.description
                  ? course.description.slice(0, 60) + "..."
                  : "No description"}
              </p>
              <p className="text-gray-800 font-semibold mb-2">₹{course.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourse;
