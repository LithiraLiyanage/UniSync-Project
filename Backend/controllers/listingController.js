const Listing = require('../models/Listing');

const checkIntegrity = (text) => {
  const FORBIDDEN_KEYWORDS = ['assignment completion','do my assignment','exam answers','cheat','homework for me'];
  return FORBIDDEN_KEYWORDS.some(k => text.toLowerCase().includes(k));
};

const getApprovedListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ status: 'approved' }).populate('seller', 'name email');
    res.status(200).json({ success: true, data: listings });
  } catch (error) { next(error); }
};

const createListing = async (req, res, next) => {
  try {
    const { title, category, price, description } = req.body;
    let status = 'approved'; // auto-approve for simplicity, unless flagged
    let flagReason = null;
    
    if (checkIntegrity(title + ' ' + description)) {
      status = 'flagged';
      flagReason = 'Contains forbidden academic integrity keywords';
    }
    
    const listing = await Listing.create({ title, category, price, description, seller: req.user._id, status, flagReason });
    res.status(201).json({ success: true, data: listing });
  } catch (error) { next(error); }
};

const getFlaggedListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ status: 'flagged' }).populate('seller', 'name email');
    res.status(200).json({ success: true, data: listings });
  } catch (error) { next(error); }
};

const approveListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, { status: 'approved', flagReason: null }, { new: true });
    res.status(200).json({ success: true, data: listing });
  } catch (error) { next(error); }
};

const deleteListing = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

module.exports = { getApprovedListings, createListing, getFlaggedListings, approveListing, deleteListing };
