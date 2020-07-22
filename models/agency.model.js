const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  matricule: { type: String, required: true, unique: true },
  activity: { type: String, required: true },
  isFtav: { type: String, required: true, default: 'YES' },
  car: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
});
AgencySchema.virtual('cars', {
  ref: 'Car',
  localField: '_id',
  foreignField: 'car',
});

module.exports = mongoose.model('Agency', AgencySchema);
