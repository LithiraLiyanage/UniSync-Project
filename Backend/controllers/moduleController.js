const Module = require('../models/Module');
const User = require('../models/User');

// ─── @desc    Create a new module for logged-in user
// ─── @route   POST /api/modules
// ─── @access  Private
const createModule = async (req, res, next) => {
  try {
    const { moduleName, code, lecturer, progress, assignments, resources } = req.body;

    if (!moduleName || !code) {
      res.status(400);
      throw new Error('Module name and code are required');
    }

    // ── Create the module linked to the authenticated user ────────────────────
    const module = await Module.create({
      moduleName,
      code,
      lecturer: lecturer || '',
      progress: progress || 0,
      assignments: assignments || [],
      resources: resources || [],
      user: req.user._id,
    });

    // ── Also push module reference into User's modules array ──────────────────
    await User.findByIdAndUpdate(req.user._id, {
      $push: { modules: module._id },
    });

    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: module,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get all modules belonging to logged-in user
// ─── @route   GET /api/modules
// ─── @access  Private
const getUserModules = async (req, res, next) => {
  try {
    const modules = await Module.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Get a single module by ID
// ─── @route   GET /api/modules/:id
// ─── @access  Private
const getModuleById = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      res.status(404);
      throw new Error('Module not found');
    }

    // ── Ensure module belongs to the requesting user ───────────────────────────
    if (module.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to access this module');
    }

    res.status(200).json({
      success: true,
      data: module,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Update a module by ID
// ─── @route   PUT /api/modules/:id
// ─── @access  Private
const updateModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      res.status(404);
      throw new Error('Module not found');
    }

    // ── Ownership check ───────────────────────────────────────────────────────
    if (module.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this module');
    }

    const { moduleName, code, lecturer, progress, assignments, resources } = req.body;

    // Apply updates only for provided fields
    if (moduleName !== undefined) module.moduleName = moduleName;
    if (code !== undefined) module.code = code;
    if (lecturer !== undefined) module.lecturer = lecturer;
    if (progress !== undefined) module.progress = progress;
    if (assignments !== undefined) module.assignments = assignments;
    if (resources !== undefined) module.resources = resources;

    const updatedModule = await module.save();

    res.status(200).json({
      success: true,
      message: 'Module updated successfully',
      data: updatedModule,
    });
  } catch (error) {
    next(error);
  }
};

// ─── @desc    Delete a module by ID
// ─── @route   DELETE /api/modules/:id
// ─── @access  Private
const deleteModule = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      res.status(404);
      throw new Error('Module not found');
    }

    // ── Ownership check ───────────────────────────────────────────────────────
    if (module.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this module');
    }

    await module.deleteOne();

    // ── Remove module reference from User's modules array ─────────────────────
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { modules: module._id },
    });

    res.status(200).json({
      success: true,
      message: 'Module deleted successfully',
      data: { _id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createModule,
  getUserModules,
  getModuleById,
  updateModule,
  deleteModule,
};