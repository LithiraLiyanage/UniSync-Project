const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'],
      default: 'pending',
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    dueDate: {
      type: Date,
    },
    deliveryNote: {
      type: String,
      trim: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    slipUrl: {
      type: String,
    },
    slipUploadedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ── Compute due date before save ─────────────────────────────────────
orderSchema.pre('save', async function (next) {
  if (this.isNew && !this.dueDate) {
    const Service = mongoose.model('Service');
    const svc = await Service.findById(this.service).select('deliveryDays');
    if (svc) {
      const d = new Date();
      d.setDate(d.getDate() + svc.deliveryDays);
      this.dueDate = d;
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
