const ShuttleRoute = require('../models/ShuttleRoute');
const TravelAlert = require('../models/TravelAlert');

const getRoutes = async (req, res, next) => {
  try {
    const routes = await ShuttleRoute.find();
    res.status(200).json({ success: true, data: routes });
  } catch (error) { next(error); }
};

const updateRouteStatus = async (req, res, next) => {
  try {
    const route = await ShuttleRoute.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json({ success: true, data: route });
  } catch (error) { next(error); }
};

const getAlerts = async (req, res, next) => {
  try {
    const alerts = await TravelAlert.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: alerts });
  } catch (error) { next(error); }
};

const postAlert = async (req, res, next) => {
  try {
    const alert = await TravelAlert.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json({ success: true, data: alert });
  } catch (error) { next(error); }
};

const deleteAlert = async (req, res, next) => {
  try {
    await TravelAlert.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

module.exports = { getRoutes, updateRouteStatus, getAlerts, postAlert, deleteAlert };
