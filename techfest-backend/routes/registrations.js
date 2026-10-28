const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { verifyToken } = require('../middleware/auth');

// All registration routes require authentication
router.use(verifyToken);

// POST / - Register for an event
router.post('/', async (req, res, next) => {
  try {
    const { eventId } = req.body;

    // 1. eventId given (else 400)
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }

    // 2. event exists (else 404)
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // 3. seats > 0 (else 400 "No seats available")
    if (event.seats <= 0) {
      return res.status(400).json({ success: false, message: 'No seats available' });
    }

    // 4. not already registered (else 409 "Already registered")
    const existing = await Registration.findOne({ user: req.user.id, event: eventId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already registered' });
    }

    // Create registration and decrement seats
    const registration = new Registration({
      user: req.user.id,
      event: eventId
    });
    await registration.save();

    event.seats -= 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Registered successfully',
      data: registration
    });
  } catch (err) {
    next(err);
  }
});

// GET /my - Get current user's registrations
router.get('/my', async (req, res, next) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Registrations fetched successfully',
      data: registrations
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /:id - Cancel own registration
router.delete('/:id', async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    await Registration.findByIdAndDelete(req.params.id);

    // Increase event seats back by 1
    await Event.findByIdAndUpdate(registration.event, { $inc: { seats: 1 } });

    res.status(200).json({
      success: true,
      message: 'Registration cancelled successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
