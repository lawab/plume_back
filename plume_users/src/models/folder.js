const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Course Schema Object
const FolderSchemaObject = {

    name: { type: String},
    description: {type: String},
    files: {
        type: [{type: mongoose.SchemaTypes.ObjectId, ref : 'File'}],
        default: []
    },   
};

//Instance of Schema
const FolderSchema = new Schema( FolderSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Folder',FolderSchema);