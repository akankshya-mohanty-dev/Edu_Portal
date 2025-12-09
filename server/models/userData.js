const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,   
      lowercase: true,
      trim: true,
    },
    password:{
      type:String,
      required:true
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },

    collegeName: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserData", userDataSchema);
