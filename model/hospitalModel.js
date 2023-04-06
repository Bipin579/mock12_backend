const mongoose = require('mongoose');
// doctor.date.toISOString()

const appointmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageURL: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    slots: { type: Number, required: true },
    fee: { type: Number, required: true },
});

const appointmentModel = mongoose.model('appointment', appointmentSchema);


module.exports = appointmentModel;





