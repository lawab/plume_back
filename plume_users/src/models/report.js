const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Report Schema Object
const ReportSchemaObject = {
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  report: { type: String},
  validated: { type: Boolean, default: false },
  course: { type: Object },
  deletedAt: { type: Date, default: null }
};

//Instance of Schema
const ReportSchema = new Schema( ReportSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Report', ReportSchema);