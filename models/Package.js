const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  active_delivery: { type: Boolean },
  description: { type: String },
  weight: { type: Number },
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number },
  from_name: { type: String },
  from_address: { type: String },
  from_location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  to_name: { type: String },
  to_address: { type: String },
  to_location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

module.exports = mongoose.model('Package', packageSchema);
