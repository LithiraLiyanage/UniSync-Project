const Event = require('../models/Event');

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) { next(error); }
};

const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) { next(error); }
};

const approveEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: 'approved', reviewedBy: req.user._id }, { new: true });
    res.status(200).json({ success: true, data: event });
  } catch (error) { next(error); }
};

const rejectEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { status: 'rejected', reviewedBy: req.user._id }, { new: true });
    res.status(200).json({ success: true, data: event });
  } catch (error) { next(error); }
};

const getEventStats = async (req, res, next) => {
  try {
    // Simple mock stats for the requested chart
    const stats = [
      { category: 'Academic', count: 42 },
      { category: 'Sports', count: 38 },
      { category: 'Cultural', count: 55 },
      { category: 'Tech', count: 67 },
      { category: 'Social', count: 49 },
    ];
    res.status(200).json({ success: true, data: stats });
  } catch (error) { next(error); }
};

module.exports = { getEvents, createEvent, approveEvent, rejectEvent, getEventStats };
