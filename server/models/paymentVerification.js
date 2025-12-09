const mongoose = require("mongoose");

const paymentVerificationSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    isVerified: { type: Boolean, default: false },
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true },
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentVerification", paymentVerificationSchema);
