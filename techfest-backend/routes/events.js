const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET / - List all events (public)
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      data: events
    });
  } catch (err) {
    next(err);
  }
});

// GET /:id - Get single event (public)
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Event fetched successfully',
      data: event
    });
  } catch (err) {
    next(err);
  }
});

// POST / - Create new event (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res, next) => {
  try {
    const { name, category, fee, seats, date } = req.body;

    if (!name || !category || fee === undefined || seats === undefined || !date) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const event = new Event({
      name,
      category,
      fee: Number(fee),
      seats: Number(seats),
      date: new Date(date)
    });
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (err) {
    next(err);
  }
});

// PUT /:id - Update event (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /:id - Delete event (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Also delete that event's registrations
    await Registration.deleteMany({ event: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
