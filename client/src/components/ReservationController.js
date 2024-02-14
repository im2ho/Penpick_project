// read-only
const service = require('./ReservationService');

async function confirmPayment(req, res, next) {
  const confirmResponse = await service.confirmPayment(req.query);

  return res.json({ data: confirmResponse });
}

module.exports = {
  confirmPayment,
};