const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Course Schema Object
const HomeworkSchemaObject = {

    title: { type: String},
    description: { type: String},
    state: {type: Number, default:0},
    kind: {type: Number},
    deadline: {type: Date},
    validated: {type: Boolean, default: false},
    file: {type: mongoose.SchemaTypes.ObjectId, ref : 'Media'},
    teacher: {type: mongoose.SchemaTypes.ObjectId, ref : 'Teacher'},
    studentClasses: {
        type: [{type: mongoose.SchemaTypes.ObjectId, ref : 'StudentClass'}],
        default: []
    },    
};

//Instance of Schema
const HomeworkSchema = new Schema( HomeworkSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Homework',HomeworkSchema);