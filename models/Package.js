const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  active_delivery: { type: Boolean },
  description: { type: String , required: true },
  weight: { type: Number , required: true },
  width: { type: Number , required: true },
  height: { type: Number , required: true },
  depth: { type: Number },
  from_name: { type: String ,required: true },
  from_address: { type: String ,required: true },
  from_location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  to_name: { type: String , required: true },
  to_address: { type: String, required: true  },
  to_location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

module.exports = mongoose.model('Package', packageSchema);
