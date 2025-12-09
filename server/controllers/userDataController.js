const UserData = require("../models/userData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, number, address, role, collegeName } =
      req.body;

    if (!name || !email || !password || !number || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use another email.",
      });
    }

    if (role === "student") {
      if (!collegeName) {
        return res.status(400).json({
          success: false,
          message: "collegeName are required for students",
        });
      }
    }

    // ============================
    // 4️⃣ Password Hashing
    // ============================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ============================
    // 5️⃣ Create New User
    // ============================
    const newUser = new UserData({
      name,
      email,
      password: hashedPassword,
      number,
      address,
      role,
      collegeName: role === "student" ? collegeName : undefined,
    });

    await newUser.save();

    // ============================
    // 6️⃣ Successful Response
    // ============================
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        number: newUser.number,
        address: newUser.address,
        role: newUser.role,
        collegeName: newUser.collegeName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Check your email.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        collegeName: user.collegeName,
        availableCourses: user.availableCourses,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user;

    let query = {};
    if (loggedInUser.role === "admin") {
      query = {
        role: { $in: ["teacher", "student"] },
      };
    } else if (loggedInUser.role === "teacher") {
      query = {
        role: "student",
      };
    } else if (loggedInUser.role === "student") {
      query = {
        _id: loggedInUser.id,
      };
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view users.",
      });
    }

    const users = await UserData.find(query)
      .select("-password -__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.role === "student") {
      if (!updates.collegeName)
        return res.status(400).json({
          success: false,
          message: "collegeName is required for students",
        });
    }

    const updatedUser = await UserData.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserData.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
