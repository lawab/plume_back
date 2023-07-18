const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Behavior Schema Object
const BehaviorSchemaObject = {
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  gravity: { type: String },
  date: { type: Date, default: Date.now },
  motif: { type: String },
  validated: { type: Boolean, default: false },
  course: { type: Object },
};

//Instance of Schema
const BehaviorSchema = new Schema( BehaviorSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Behavior', BehaviorSchema);