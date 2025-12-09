const express = require("express");
const router = express.Router();
const protected  = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");

router.post("/create-payment", protected, paymentController.createPayment);
router.post("/verify-payment", protected, paymentController.verifyPayment);
router.post("/purchase-course", protected, paymentController.purchaseCourse);
router.get("/purchased-courses", protected, paymentController.getPurchasedCourses);

module.exports = router;
