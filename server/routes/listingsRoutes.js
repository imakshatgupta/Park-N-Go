const express = require("express");
const {
  addBooking,
  verifyPayment,
} = require("../controllers/PaymentController.js");

const router = express.Router();

router.route("/bookings/addBooking").post(addBooking);


module.exports = router;
