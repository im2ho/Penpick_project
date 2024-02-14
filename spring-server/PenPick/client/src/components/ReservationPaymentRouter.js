// read-only
const router = require('express').Router();

const controller = require('./ReservationController');

router.route('/confirm').get(controller.confirmPayment);

module.exports = router;