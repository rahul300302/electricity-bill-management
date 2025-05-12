const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');
const authMiddleware=require('../middleware/auth')


// Add middleware to routes
router.get('/', authMiddleware, async (req, res) => {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.render('index', { bills });
});
// Home Route to Render the Form and Show Bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find().sort({ createdAt: -1 });
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

router.delete('/bills/:id', async (req, res) => {
    try {
        await Bill.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting bill' });
    }
});

module.exports = router;
