const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
const getResources = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.type) {
      filters.type = req.query.type;
    }
    
    // Can also filter by user if specific to user
    // filters.uploadedBy = req.user._id;

    const resources = await Resource.find(filters).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload/Create a resource
// @route   POST /api/resources
// @access  Private
const uploadResource = async (req, res, next) => {
  try {
    const { title, url, type, module } = req.body;

    const resource = await Resource.create({
      title,
      url,
      type,
      module: module || undefined,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      res.status(404);
      throw new Error('Resource not found');
    }

    // Only admin or owner can delete
    if (resource.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to delete this resource');
    }

    await resource.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Resource removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResources,
  uploadResource,
  deleteResource,
};
