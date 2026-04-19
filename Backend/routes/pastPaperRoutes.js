const express = require('express');
const { getPastPapers, getPastPaper, uploadPastPaper, updatePastPaper, deletePastPaper } = require('../controllers/pastPaperController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // limit: 10MB
});

router.route('/')
  .get(getPastPapers)
  .post(protect, admin, upload.single('file'), uploadPastPaper);

router.route('/:id')
  .get(getPastPaper)
  .put(protect, admin, upload.single('file'), updatePastPaper)
  .delete(protect, admin, deletePastPaper);

module.exports = router;
