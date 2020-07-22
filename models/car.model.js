const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  agency: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }],
  year: { type: String, required: true },
  matricule: { type: String, required: true, unique: true },
  vynyle: { type: String, required: true },
  assurance: { type: String, required: true },
  entretien: { type: String, required: true },
  photo: String,
  vidange: String,
  capacity: { type: String, required: true },
  disponibilite: { type: String, required: true },
  conducteur: { type: String, required: true },
  gps: { type: String, required: true, default: 'NON' },
});
module.exports = mongoose.model('Car', CarSchema);
