const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Lesson Schema Object
const MediaSchemaObject = {

    contentUrl: { type: String},
    filePath: { type: String}
    
};

//Instance of Schema
const MediaSchema = new Schema( MediaSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Media', MediaSchema);