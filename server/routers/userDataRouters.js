const express = require("express");
const authMiddleware=require("../middleware/auth")
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userDataController");

const router = express.Router();

router.post("/user-create", createUser);
router.post("/user-login",loginUser)
router.get("/get-all-user", authMiddleware,getAllUsers);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
