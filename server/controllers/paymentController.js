const Payment = require("../models/Payment");
const PaymentVerification = require("../models/paymentVerification");
const PurchaseCourse = require("../models/purchaseCourse");
const Course = require("../models/course");

// 1. Create Payment
exports.createPayment = async (req, res) => {
  try {
    const { amount, receipt, orderId } = req.body;
    const userId = req.user.id;

    const payment = await Payment.create({
      amount,
      receipt,
      userId,
      orderId,
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user.id;

    const verification = await PaymentVerification.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      isVerified: true,
      verifiedAt: new Date(),
    });

    // Update Payment record
    await Payment.findOneAndUpdate(
      { razorpay_order_id },
      { razorpay_payment_id, razorpay_signature, isVerified: true }
    );

    res.status(200).json({ success: true, verification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Purchase Course
exports.purchaseCourse = async (req, res) => {
  try {
    const { courseId, paymentId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const purchased = await PurchaseCourse.create({
      userId,
      courseId,
      paymentId,
      status: "completed",
    });

    res.status(201).json({ success: true, purchased });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Get purchased courses by user
exports.getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const purchased = await PurchaseCourse.find({ userId })
      .populate("courseId")
      .populate("paymentId");

    res.status(200).json({ success: true, purchased });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
