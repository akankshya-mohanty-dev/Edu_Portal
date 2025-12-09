const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  approveCourse,
} = require("../controllers/courseController");

const auth = require("../middleware/auth"); 

router.post("/create-course", auth, createCourse);

router.get("/get-all-course", auth, getAllCourses);

router.get("/get-course-by-id/:id", auth, getCourse);

router.put("/update-course/:id", auth, updateCourse);

router.delete("/delete-course/:id", auth, deleteCourse);

router.put("/approve-course/:id", auth, approveCourse);

module.exports = router;
