const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
    const { name, email, contact, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all required fields' });
    }

    try {
        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

module.exports = router;

