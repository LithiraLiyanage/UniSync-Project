const express = require('express');
const router = express.Router();
const { getRoutes, updateRouteStatus, getAlerts, postAlert, deleteAlert } = require('../controllers/travelController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/routes')
  .get(protect, getRoutes);

router.route('/routes/:id')
  .put(protect, admin, updateRouteStatus);

router.route('/alerts')
  .get(protect, getAlerts)
  .post(protect, admin, postAlert);

router.route('/alerts/:id')
  .delete(protect, admin, deleteAlert);

module.exports = router;
