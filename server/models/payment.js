const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    currency: { type: String, default: "INR" },
    receipt: String,
    isVerified: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
