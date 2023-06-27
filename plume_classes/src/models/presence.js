const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');


//Presence Schema Object
const PresenceSchemaObject = {
  week: { type: String },
  classeId: { type: Schema.ObjectId, ref: "Class" },
  courseId: { type: Schema.ObjectId },
  presences: {
    type: [
      {
        student: { type: Object },
        lundi: {
          date: { type: Date, default: null },
          presence: { type: Boolean, default: false },
          holiday: { type: Boolean, default: true },
        },
        mardi: {
          date: { type: Date, default: null },
          presence: { type: Boolean, default: false },
          holiday: { type: Boolean, default: true },
        },
        mercredi: {
          date: { type: Date, default: null },
          presence: { type: Boolean, default: false },
          holiday: { type: Boolean, default: true },
        },
        jeudi: {
          date: { type: Date, default: null },
          presence: { type: Boolean, default: true },
          holiday: { type: Boolean, default: true },
        },
        vendredi: {
          date: { type: Date, default: null },
          presence: { type: Boolean, default: true },
          holiday: { type: Boolean, default: true },
        },
      },
    ],
  },

  creator: { type: Object },
  deletedAt: { type: Date, default: null },
};

//Instance of Schema
const PresenceSchema = new Schema( PresenceSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Presence', PresenceSchema);