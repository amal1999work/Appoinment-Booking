const express = require('express');
const router = express.Router();
const { saveBooking, getAvailableSlots } = require('./appointmentBookingController');


router.post('/saveBooking', saveBooking);


router.get('/available-slots/:date', getAvailableSlots);

module.exports = router;
