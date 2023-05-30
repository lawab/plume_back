const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');


//Subject Schema Object
const SubjectSchemaObject = {

    title: { type: String },
    description: { type: String},
    image:{ type: String},
    courses: {type: [{ type: String }]},
    creator: {type: Object},
    validated: {type: Boolean, default: false},
    deletedAt: { type: Date, default: null }
    
};

//Instance of Schema
const SubjectSchema = new Schema( SubjectSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Subject', SubjectSchema);