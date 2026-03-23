const express = require('express');
const router = express.Router();
const { getPapers, uploadPaper, deletePaper, downloadPaper } = require('../controllers/paperController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');

// Simple multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ensure uploads dir exists
    const fs = require('fs');
    if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.route('/')
  .get(protect, getPapers)
  .post(protect, upload.single('file'), uploadPaper);

router.route('/:id')
  .delete(protect, admin, deletePaper);

router.route('/:id/download')
  .get(protect, downloadPaper);

module.exports = router;
