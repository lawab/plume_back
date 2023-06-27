const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');


//Class Schema Object
const ClassSchemaObject = {
  title: { type: String, require: true, maxlength: 50 },
  description: { type: String },
  planning: { type: String },
  time_table: { type: String },
  students: {
    type: [
      {
        user: { type: Object },
        beginDate: { type: Date, default: Date.now() },
      },
    ],
  },
  teachers: {
    type: [
      {
        teacher: { type: Object },
        beginDate: { type: Date, default: Date.now() },
      },
    ],
  },
  homeworks: { type: [{ type: Object }] },
  courses: {
    type: [
      {
        course: { type: Object },
        beginDate: { type: Date, default: Date.now() },
      },
    ],
  },
  creator: { type: Object },
  validated: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
};

//Instance of Schema
const ClassSchema = new Schema( ClassSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Class', ClassSchema);