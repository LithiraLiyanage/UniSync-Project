const mongoose = require('mongoose');
const PastPaper = require('../models/PastPaper');
const fs = require('fs');
const path = require('path');

// @desc    Get all past papers
// @route   GET /api/pastpapers
// @access  Public
const getPastPapers = async (req, res, next) => {
  try {
    const { subject, year, examType } = req.query;
    let query = {};
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (year) query.year = year;
    if (examType) query.examType = examType;

    const papers = await PastPaper.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: papers.length, data: papers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single past paper
// @route   GET /api/pastpapers/:id
// @access  Public
const getPastPaper = async (req, res, next) => {
  try {
    const paper = await PastPaper.findById(req.params.id).populate('uploadedBy', 'name email');
    if (!paper) {
      return res.status(404).json({ success: false, error: 'Past paper not found' });
    }
    res.status(200).json({ success: true, data: paper });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload new past paper
// @route   POST /api/pastpapers
// @access  Private/Admin
const uploadPastPaper = async (req, res, next) => {
  try {
    const { title, subject, year, examType, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    // Use absolute URL or relative path logic depending on setup. Using relative path for typical static upload directory.
    const fileUrl = `/uploads/${req.file.filename}`;

    const paper = await PastPaper.create({
      title,
      subject,
      year: parseInt(year, 10),
      examType,
      description,
      fileUrl,
      uploadedBy: req.user._id
    });

    res.status(201).json({ success: true, data: paper });
  } catch (error) {
    next(error);
  }
};

// @desc    Update past paper
// @route   PUT /api/pastpapers/:id
// @access  Private/Admin
const updatePastPaper = async (req, res, next) => {
  try {
    let paper = await PastPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ success: false, error: 'Past paper not found' });
    }

    const { title, subject, year, examType, description } = req.body;
    let updateFields = { title, subject, examType, description };
    if (year) updateFields.year = parseInt(year, 10);

    // Check if new file is uploaded
    if (req.file) {
      const oldFilePath = path.join(__dirname, '..', paper.fileUrl);
      // Attempt to delete old file
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      updateFields.fileUrl = `/uploads/${req.file.filename}`;
    }

    paper = await PastPaper.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    }).populate('uploadedBy', 'name email');

    res.status(200).json({ success: true, data: paper });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete past paper
// @route   DELETE /api/pastpapers/:id
// @access  Private/Admin
const deletePastPaper = async (req, res, next) => {
  try {
    const paper = await PastPaper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ success: false, error: 'Past paper not found' });
    }

    // Remove file from filesystem
    const filePath = path.join(__dirname, '..', paper.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await paper.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPastPapers,
  getPastPaper,
  uploadPastPaper,
  updatePastPaper,
  deletePastPaper
};
