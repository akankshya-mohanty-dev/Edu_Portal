const express = require("express");
const router = express.Router();
const paymentVerificationController=require("../controllers/paymentVerificationController")

router.post("/create", paymentVerificationController.createPackageOrder);

router.post("/verify", paymentVerificationController.verifyPackagePayment);

router.get("/all", paymentVerificationController.getAllPackagePayments);

module.exports = router;
