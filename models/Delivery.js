const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  package_id: { type: String },
  pickup_time: { type: String },
  start_time: { type: String },
  end_time: { type: String },
  to_address: {type: String},
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  status: { type: String, enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'] }
});

module.exports = mongoose.model('Delivery', deliverySchema);
