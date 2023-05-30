const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Homework Schema Object
const HomeworkSchemaObject = {

    title: { type: String, required: true, unique: true},
    description: { type: String},
    typeHomwork: { type: String,required: true},
    content: { type: String},
    file: {type: String},
    limitDate: {type: Date},
    creator: {type: Object},
    module: {type: Schema.ObjectId, ref: 'Module'},
    validated: {type: Boolean, default: false},
    deletedAt: { type: Date, default: null }
    
};

//Instance of Schema
const HomeworkSchema = new Schema( HomeworkSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Homework', HomeworkSchema);