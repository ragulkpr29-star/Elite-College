const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// ─── POST /api/contact ──────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required.' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ message: 'Subject is required.' });
    }

    // Save to database
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message || '',
    });

    res.status(201).json({
      message: 'Message sent successfully! We will get back to you soon.',
      contactId: contact._id,
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
