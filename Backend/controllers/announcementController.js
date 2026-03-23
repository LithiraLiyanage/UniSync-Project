const Announcement = require('../models/Announcement');

const getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: announcements.length, data: announcements });
  } catch (error) { next(error); }
};

const postAnnouncement = async (req, res, next) => {
  try {
    const { title, message, type } = req.body;
    const ann = await Announcement.create({ title, message, type, postedBy: req.user._id });
    res.status(201).json({ success: true, data: ann });
  } catch (error) { next(error); }
};

const deleteAnnouncement = async (req, res, next) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ success: false, error: 'Not found' });
    await ann.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

module.exports = { getAnnouncements, postAnnouncement, deleteAnnouncement };
