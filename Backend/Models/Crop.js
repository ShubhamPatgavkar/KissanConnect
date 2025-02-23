const mongoose = require('mongoose');
const cropSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    quantity: { type: Number, required: true },
    quantityType: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    location: { type: String, required: true },
    image: { type: String },
    farmerName: { type: String, required: true },
    farmerEmail: { type: String, required: true }, // ✅ Add this field
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
