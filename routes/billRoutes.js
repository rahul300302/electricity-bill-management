const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

const calculateAmount = (units) => units * 5;

router.get('/', async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });
  res.render('index', { bills });
});

router.post('/bills', async (req, res) => {
  const { name, meterNumber, units } = req.body;
  const amount = calculateAmount(units);
  await Bill.create({ name, meterNumber, units, amount });
  res.redirect('/');
});

module.exports = router;
