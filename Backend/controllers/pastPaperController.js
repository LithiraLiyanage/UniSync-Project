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

    let papers = await PastPaper.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });

    if (papers.length === 0 && Object.keys(query).length === 0) {
      const seedData = [
        {
          title: 'CS201 - Mid Term 2024.pdf',
          subject: 'CS201',
          year: 2024,
          examType: 'University',
          fileUrl: '/uploads/sample1.pdf',
          mockUploader: 'S10294',
          status: 'Pending',
          createdAt: new Date('2024-10-10T10:00:00Z')
        },
        {
          title: 'CS202 - Final 2023.pdf',
          subject: 'CS202',
          year: 2023,
          examType: 'University',
          fileUrl: '/uploads/sample2.pdf',
          mockUploader: 'S18392',
          status: 'Approved',
          createdAt: new Date('2024-10-08T10:00:00Z')
        },
        {
          title: 'IT305 - Semester End 2022.pdf',
          subject: 'IT305',
          year: 2022,
          examType: 'University',
          fileUrl: '/uploads/sample3.pdf',
          mockUploader: 'S11023',
          status: 'Rejected',
          createdAt: new Date('2024-10-05T10:00:00Z')
        }
      ];
      await PastPaper.insertMany(seedData);
      papers = await PastPaper.find(query)
        .populate('uploadedBy', 'name email')
        .sort({ createdAt: -1 });
    }

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
    let { title, subject, year, examType, description } = req.body;
    
    // 1. Check Required Fields
    if (!title || !subject || !year || !examType) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // 2. Sanitize & Trim
    title = title.trim();
    subject = subject.trim();
    description = description ? description.trim() : '';

    // 3. Document Title Validation
    const titleRegex = /^[a-zA-Z0-9\-&: ]+$/;
    if (title.length < 5 || title.length > 100 || !titleRegex.test(title)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'Invalid title. Use 5-100 characters. Allowed special chars: -, &, :' });
    }

    // 4. Year Validation
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > currentYear) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: `Invalid year. Must be between 2000 and ${currentYear}` });
    }

    // 5. Exam Type Validation
    const validExams = ['A/L', 'O/L', 'University'];
    if (!validExams.includes(examType)) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'Invalid exam type selected' });
    }

    // 6. File Validation
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const allowedMimeTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'Invalid file type. Only PDF and DOC/DOCX are allowed.' });
    }

    if (req.file.size < 10240 || req.file.size > 10485760) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'File size must be between 10KB and 10MB' });
    }

    const originalName = req.file.originalname;
    if (originalName.length > 100 || !/^[a-zA-Z0-9\-_.]+$/.test(originalName)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'File name has invalid characters or is too long.' });
    }

    // 7. Duplicate Detection
    const existingPaper = await PastPaper.findOne({ title, subject, year: yearNum });
    if (existingPaper) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, error: 'This past paper already exists' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const paper = await PastPaper.create({
      title,
      subject,
      year: yearNum,
      examType,
      description,
      fileUrl,
      uploadedBy: req.user ? req.user._id : null
    });

    res.status(201).json({ success: true, data: paper });
  } catch (error) {
    if (req.file && require('fs').existsSync(req.file.path)) {
      require('fs').unlinkSync(req.file.path);
    }
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

    const { title, subject, year, examType, description, status } = req.body;
    let updateFields = { title, subject, examType, description };
    if (year) updateFields.year = parseInt(year, 10);
    if (status) updateFields.status = status;

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
