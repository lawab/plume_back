const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Subject Schema Object
const SubjectSchemaObject = {

    name: {type: String},
    courses: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Course'}
        ], 
        default: [] 
    }
    
};

//Instance of Schema
const SubjectSchema = new Schema( SubjectSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Subject', SubjectSchema);