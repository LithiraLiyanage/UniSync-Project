const express = require('express');
const router = express.Router();
const {
  createModule,
  getUserModules,
  getModuleById,
  updateModule,
  deleteModule,
} = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');

// All module routes are protected — require valid JWT
router.use(protect);

// POST /api/modules     — Create a new module
// GET  /api/modules     — Get all modules for the logged-in user
router.route('/').post(createModule).get(getUserModules);

// GET    /api/modules/:id — Get a specific module by ID
// PUT    /api/modules/:id — Update a module by ID
// DELETE /api/modules/:id — Delete a module by ID
router.route('/:id').get(getModuleById).put(updateModule).delete(deleteModule);

module.exports = router;