const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Home Route to Render the Form and Show Bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find();
        res.render('index', { bills });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to Handle Bill Form Submission (AJAX)
router.post('/bills', async (req, res) => {
    const { name, meterNumber, units } = req.body;
    if (!name || !meterNumber || !units) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const amount = units * 5; // Example calculation, ₹5 per unit

        const newBill = new Bill({
            name,
            meterNumber,
            units,
            amount
        });
        await newBill.save();  // Save bill to MongoDB
        res.status(200).json({ message: 'Bill submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error submitting bill' });
    }
});

module.exports = router;
