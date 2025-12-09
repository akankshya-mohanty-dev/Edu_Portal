require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PaymentVerification = require("../models/paymentVerification");
const Package = require("../models/package");
const User = require("../models/userData");
const registrationVerification = require("../models/registrationVerification");
const userData = require("../models/userData");
const JoiningForm = require("../models/joiningForm");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order for Package
exports.createPackageOrder = async (req, res) => {
  try {
    console.log("req.body1", req.body);
    const { amount, userId, packageId } = req.body;
    console.log("req.body2", req.body);

    const currency = "INR";
    const receipt = `package_${Date.now()}`;

    const user = await User.findOne({ selectionId: userId });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const pkg = await Package.findById(packageId);
    console.log("pkg", pkg);
    if (!pkg) {
      return res.status(400).json({ error: "Package not found" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay takes amount in paise
      currency,
      receipt,
    });

    console.log("order", order);
    // Save a pending record in DB
    const payment = await PaymentVerification.create({
      amount,
      currency,
      userId: user._id,
      packageId: pkg._id,
      isVerified: false,
    });
    console.log("payment verification", payment);
    console.log("payment verification", order.id);
    console.log("payment verification", payment._id);
    console.log("payment verification", process.env.RAZORPAY_KEY_ID);

    res.status(200).json({
      success: true,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Package order creation failed:", error.message);
    res
      .status(500)
      .json({ error: "Package payment order creation failed", error });
  }
};

// Verify Package Payment
// exports.verifyPackagePayment = async (req, res) => {
//   console.log("verifiPackage", req.body);
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       paymentId,
//       selectionId,
//     } = req.body;

//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       await PaymentVerification.findByIdAndUpdate(paymentId, {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         isVerified: true,
//         verifiedAt: new Date(),
//       });
//       console.log("selectionId", selectionId);
//       if (selectionId) {
//         const user = await userData.findOne({ selectionId });
//         if (!user) {
//           console.log("No user found with selectionId:", selectionId);
//           return res
//             .status(404)
//             .json({ success: false, message: "User not found" });
//         }
//         await registrationVerification.findOneAndUpdate(
//           { selectionId:user._id },
//           { $set: { isVerified: true, isPayment: true } },
//           { new: true }
//         );
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "Package payment verified ✅" });
//     } else {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid signature ❌" });
//     }
//   } catch (error) {
//     console.error("Package payment verification failed:", error.message);
//     res.status(500).json({ error: "Package payment verification failed" });
//   }
// };

exports.verifyPackagePayment = async (req, res) => {
  console.log("verifiPackage", req.body);
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
      selectionId,
      aadhar,
      photo,
      upperId,
      size,dress,storeData
    } = req.body;
console.log("store data----->",storeData)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Update PaymentVerification
      await PaymentVerification.findByIdAndUpdate(paymentId, {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        isVerified: true,
        verifiedAt: new Date(),
      });

      console.log("selectionId", selectionId);

      if (selectionId) {
        const user = await userData.findOne({ selectionId });
        if (!user) {
          console.log("No user found with selectionId:", selectionId);
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        // ✅ If upperId is provided, check if it exists in userData
        let validUpperId = null;
        if (upperId) {
          const upperUser = await JoiningForm.findOne({ employeeId: upperId });
          console.log("upperUser",upperUser);
          if (!upperUser) {
            return res
              .status(400)
              .json({ success: false, message: "Invalid upperId ❌" });
          }
          validUpperId = upperUser._id; // assign only if exists
        }

        // ✅ Check if registrationVerification already exists
        let regVerification = await registrationVerification.findOne({
          selectionId: user._id,
        });

        if (regVerification) {
          // Update if exists
          regVerification.upperId = validUpperId;
          regVerification.aadharPhoto = aadhar || regVerification.aadharPhoto;
          regVerification.photo = photo || regVerification.photo;
          regVerification.size = size || regVerification.size;
          regVerification.dress = dress || regVerification.dress;
          regVerification.isVerified = true;
          regVerification.isPayment = true;
          await regVerification.save();
        } else {
          console.log("store date --------2>",storeData)
            const welcomeKitId = storeData && storeData[0]._id ? storeData[0]._id : null;
            console.log("id--------->",storeData[0]._id)
          // Create only if upperId is valid (or null if not required)
          regVerification = new registrationVerification({
            selectionId: user._id,
            upperId: validUpperId,
            aadharPhoto: aadhar,
            photo,
            size,
            dress,
            isVerified: true,
            isPayment: true,
            welcomeKit:welcomeKitId
          });
          console.log("registration verification",regVerification)
          await regVerification.save();
        }
      }

      return res
        .status(200)
        .json({ success: true, message: "Package payment verified ✅" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature ❌" });
    }
  } catch (error) {
    console.error("Package payment verification failed:", error.message);
    res.status(500).json({ error: "Package payment verification failed" });
  }
};

// Get all package payments
exports.getAllPackagePayments = async (req, res) => {
  try {
    const payments = await PaymentVerification.find()
      .populate("userId", "name email")
      .populate("packageId", "name price");

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching package payments:", error.message);
    res.status(500).json({ error: "Error fetching package payments" });
  }
};
