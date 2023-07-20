const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Document Schema Object
const DocumentSchemaObject = {
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  studentId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  document: { type: String },
  validated: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
};

//Instance of Schema
const DocumentSchema = new Schema( DocumentSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Document', DocumentSchema);