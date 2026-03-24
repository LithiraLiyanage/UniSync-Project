const StudentProgress = require('../models/StudentProgress');
const Module = require('../models/Module');

const getProgress = async (req, res, next) => {
  try {
    const progress = await StudentProgress.find({ student: req.user._id }).populate('module', 'name code');
    res.status(200).json({ success: true, data: progress });
  } catch (error) { next(error); }
};

const updateProgress = async (req, res, next) => {
  try {
    // Admin only logically, simple upsert
    const { studentId, marks, grade } = req.body;
    const progress = await StudentProgress.findOneAndUpdate(
      { student: studentId, module: req.params.moduleId },
      { marks, grade },
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: progress });
  } catch (error) { next(error); }
};

const getProgressSummary = async (req, res, next) => {
  try {
    // Mock summary stats
    res.status(200).json({
      success: true,
      data: {
        gpa: 3.2,
        avgMarks: 71.4,
        strongAreas: 4,
        weakAreas: 1
      }
    });
  } catch (error) { next(error); }
};

module.exports = { getProgress, updateProgress, getProgressSummary };
