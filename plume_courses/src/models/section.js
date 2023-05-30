const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');


//Section Schema Object
const SectionSchemaObject = {

    title: { type: String, require: true },
    description: { type: String},
    image: { type: String},
    modules: {type: [{ type: Schema.ObjectId, ref: 'Module' }]},
    course:{type: Schema.ObjectId, ref: 'Course'},
    creator: {type: Object},
    validated: {type: Boolean, default: false},
    deletedAt: { type: Date, default: null }
    
};

//Instance of Schema
const SectionSchema = new Schema( SectionSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Section', SectionSchema);