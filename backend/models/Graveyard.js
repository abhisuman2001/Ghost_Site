import mongoose from 'mongoose';

const deadLinkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  lastChecked: {
    type: Date,
    required: true,
    default: Date.now
  },
  waybackAvailable: {
    type: Boolean,
    default: false
  },
  waybackSnapshot: {
    type: String,
    default: null
  }
}, { _id: false });

const graveyardSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  scannedAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  deadLinks: {
    type: [deadLinkSchema],
    default: []
  },
  totalLinksScanned: {
    type: Number,
    required: true,
    default: 0
  },
  scanDuration: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
graveyardSchema.index({ originalUrl: 1, scannedAt: -1 });
graveyardSchema.index({ 'deadLinks.url': 1 });

// Virtual for dead link count
graveyardSchema.virtual('deadLinkCount').get(function() {
  return this.deadLinks.length;
});

// Ensure virtuals are included in JSON
graveyardSchema.set('toJSON', { virtuals: true });
graveyardSchema.set('toObject', { virtuals: true });

// Static method to find recent graveyards
graveyardSchema.statics.findRecent = function(limit = 10) {
  return this.find()
    .sort({ scannedAt: -1 })
    .limit(limit)
    .select('originalUrl scannedAt deadLinkCount totalLinksScanned');
};

// Static method to find by URL
graveyardSchema.statics.findByUrl = function(url) {
  return this.find({ originalUrl: url })
    .sort({ scannedAt: -1 });
};

// Instance method to add dead link
graveyardSchema.methods.addDeadLink = function(linkData) {
  this.deadLinks.push(linkData);
  return this.save();
};

const Graveyard = mongoose.model('Graveyard', graveyardSchema);

export default Graveyard;
