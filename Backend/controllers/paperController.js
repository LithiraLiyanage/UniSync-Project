const Paper = require('../models/Paper');
const fs = require('fs');
const path = require('path');

const getPapers = async (req, res, next) => {
  try {
    const { module, year, semester } = req.query;
    let query = {};
    if (module) query.module = module;
    if (year) query.year = year;
    if (semester) query.semester = semester;

    const papers = await Paper.find(query).populate('module', 'moduleName code').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: papers.length, data: papers });
  } catch (error) { 
    console.error('Error fetching papers:', error);
    res.status(500).json({ success: false, error: 'Server Error: Failed to fetch past papers' });
  }
};

const uploadPaper = async (req, res, next) => {
  try {
    const { module, year, semester } = req.body;
    if (!req.file) return res.status(400).json({ success: false, error: 'No PDF uploaded' });

    const paper = await Paper.create({
      module,
      year,
      semester,
      filePath: req.file.path,
      uploadedBy: req.user._id
    });
    res.status(201).json({ success: true, data: paper });
  } catch (error) { 
    console.error('Error uploading paper:', error);
    res.status(500).json({ success: false, error: 'Server Error: Failed to upload paper' });
  }
};

const deletePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).json({ success: false, error: 'Paper not found' });
    
    // delete file
    if (fs.existsSync(paper.filePath)) fs.unlinkSync(paper.filePath);
    await paper.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) { 
    console.error('Error deleting paper:', error);
    res.status(500).json({ success: false, error: 'Server Error: Failed to delete paper' });
  }
};

const downloadPaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).json({ success: false, error: 'Paper not found' });
    res.download(path.resolve(paper.filePath));
  } catch (error) { 
    console.error('Error downloading paper:', error);
    res.status(500).json({ success: false, error: 'Server Error: Failed to process download' });
  }
};

module.exports = { getPapers, uploadPaper, deletePaper, downloadPaper };
