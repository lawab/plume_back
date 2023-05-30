const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Course Schema Object
const FileSchemaObject = {

    name: { type: String},
    description: {type: String},
    file: {type: mongoose.SchemaTypes.ObjectId, ref : 'Media'},
    folder: {type: mongoose.SchemaTypes.ObjectId, ref : 'Folder'},
    
};

//Instance of Schema
const FileSchema = new Schema( FileSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('File', FileSchema);