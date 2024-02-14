// read-only
const service = require("./FreshPayments.service");

async function confirmPayment(req, res, next) {
  const confirmResponse = await service.confirmPayment(req.query);

  return res.json({ data: confirmResponse });
}

module.exports = {
  confirmPayment,
};
