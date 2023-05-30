const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');


//Course Schema Object
const CourseSchemaObject = {

    title: { type: String, require: true, maxlength: 50},
    description: {type: String},
    image:{ type: String},
    sections: {type:[ {type: Schema.ObjectId, ref: 'Section'} ]},
    creator: {type: Object},
    subject: {type: String},
    timeSpendedDurations: {type: Object},
    classes: {
        type: [
          {
            classe: { type: Schema.ObjectId, required: false },
            beginDate: { type: Date, default: Date.now },
          },
        ],
    },
    validated: {type: Boolean, default: false},
    deletedAt: { type: Date, default: null }
    
};

//Instance of Schema
const CourseSchema = new Schema( CourseSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Course', CourseSchema);