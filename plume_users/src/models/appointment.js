const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Appointment Schema Object
const AppointmentSchemaObject = {
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  time: { type: String },
  date: { type: Date, default: Date.now },
  motif: { type: String },
  validated: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null }
};

//Instance of Schema
const AppointmentSchema = new Schema( AppointmentSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Appointment', AppointmentSchema);