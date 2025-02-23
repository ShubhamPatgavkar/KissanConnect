const express = require('express');
const sendEmail = require('../services/sendEmail.js');

const router = express.Router();

router.post('/sendEmail', async (req, res) => {
    try {
        const { farmerEmail, contactDetails } = req.body;

        if (!farmerEmail || !contactDetails) {
            return res.status(400).json({ error: 'Farmer email and contact details are required' });
        }

        // Send email
        const response = await sendEmail(farmerEmail, contactDetails);

        if (response.success) {
            return res.status(200).json({ message: "Email sent successfully" });
        } else {
            console.error("Email Error:", response.message);
            return res.status(500).json({ error: "Failed to send email" });
        }

    } catch (error) {
        console.error("Server Error in /sendEmail:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router; // ✅ Fix: Use module.exports instead of export default
