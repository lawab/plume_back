const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ForeignModel = require('../../../globalModels/foreignModels');
const moduleTypes = require('../configs/configModules');

//Module Schema Object
const ModuleSchemaObject = {

    title: { type: String, required: true},
    description: { type: String},
    file: {type: String},
    link: {
        type: String,
        required: false,
      },
    document: {
        type: String,
        required: false,
      },
    typeModule: {
        type: String,
        enum : [
            moduleTypes.VIDEO,
            moduleTypes.QUIZ,
            moduleTypes.PDF,
            moduleTypes.DOCUMENT,
            moduleTypes.ARTICLE,
            moduleTypes.EXERCICE,
            moduleTypes.SCORM
        ],
        required: true
    },
    content: {type: String},
    homeworks: {type: [ {type: Schema.ObjectId, ref: 'Homework'}]},
    creator: {type: Object},
    section: {type: Schema.ObjectId, ref: 'Section'},
    lessonProgressions: {type:[{type: Object}]},
    lessonComments: {type: [ {type: Object}]},
    kind: {type: Number},
    validated: {type: Boolean, default: false},
    deletedAt: { type: Date, default: null }
    
};

//Instance of Schema
const ModuleSchema = new Schema( ModuleSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Module', ModuleSchema);