const PersonalEvent = require('../models/PersonalEvent');
const asyncHandler = require('express-async-handler');

// @desc    Get all personal events for a user
// @route   GET /api/personal-events
// @access  Private
const getPersonalEvents = asyncHandler(async (req, res) => {
  const { startDate, endDate, category, priority } = req.query;
  
  // Build query
  const query = { user: req.user._id };
  
  // Add date filters if provided
  if (startDate || endDate) {
    query.startDate = {};
    if (startDate) query.startDate.$gte = new Date(startDate);
    if (endDate) query.startDate.$lte = new Date(endDate);
  }
  
  // Add category filter if provided
  if (category) {
    query.category = category;
  }
  
  // Add priority filter if provided
  if (priority) {
    query.priority = priority;
  }
  
  const events = await PersonalEvent.find(query)
    .sort({ startDate: 1 })
    .populate('user', 'name email');
  
  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});

// @desc    Get single personal event
// @route   GET /api/personal-events/:id
// @access  Private
const getPersonalEvent = asyncHandler(async (req, res) => {
  const event = await PersonalEvent.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate('user', 'name email');
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }
  
  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Create personal event
// @route   POST /api/personal-events
// @access  Private
const createPersonalEvent = asyncHandler(async (req, res) => {
  const eventData = {
    ...req.body,
    user: req.user._id,
  };
  
  const event = await PersonalEvent.create(eventData);
  
  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update personal event
// @route   PUT /api/personal-events/:id
// @access  Private
const updatePersonalEvent = asyncHandler(async (req, res) => {
  const event = await PersonalEvent.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }
  
  const updatedEvent = await PersonalEvent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json({
    success: true,
    data: updatedEvent,
  });
});

// @desc    Delete personal event
// @route   DELETE /api/personal-events/:id
// @access  Private
const deletePersonalEvent = asyncHandler(async (req, res) => {
  const event = await PersonalEvent.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    });
  }
  
  await event.deleteOne();
  
  res.status(200).json({
    success: true,
    message: 'Event deleted successfully',
  });
});

// @desc    Get personal events statistics
// @route   GET /api/personal-events/stats
// @access  Private
const getPersonalEventStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const totalEvents = await PersonalEvent.countDocuments({ user: userId });
  const upcomingEvents = await PersonalEvent.countDocuments({
    user: userId,
    startDate: { $gte: new Date() },
  });
  const todayEvents = await PersonalEvent.countDocuments({
    user: userId,
    startDate: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      $lt: new Date(new Date().setHours(23, 59, 59, 999)),
    },
  });
  
  const eventsByCategory = await PersonalEvent.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  
  const eventsByPriority = await PersonalEvent.aggregate([
    { $match: { user: userId } },
    { $group: { _id: '$priority', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  
  res.status(200).json({
    success: true,
    data: {
      totalEvents,
      upcomingEvents,
      todayEvents,
      eventsByCategory,
      eventsByPriority,
    },
  });
});

module.exports = {
  getPersonalEvents,
  getPersonalEvent,
  createPersonalEvent,
  updatePersonalEvent,
  deletePersonalEvent,
  getPersonalEventStats,
};
