const express = require("express");

const router = express.Router();

const userDataRoutes = require("./userDataRouters");
const courseRoutes = require("./course");
const paymentRoutes = require("./payment");
// const paymentVerificationRouter = require("./paymentVerificationRouter");
router.use("/userData", userDataRoutes);
router.use("/course", courseRoutes);
router.use("/payment", paymentRoutes);
// router.use("/payment-verification", paymentVerificationRouter);
module.exports = router;
