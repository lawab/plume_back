const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//StudentClass Schema Object
const StudentClassSchemaObject = {

    name: {type: String},
    students: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Trainee'}
        ], 
        default: [] 
    },
    teachers: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Teacher'}
        ], 
        default: [] 
    },
    homeworks: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Homework'}
        ], 
        default: [] 
    },
    courses: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Course'}
        ], 
        default: [] 
    }
};

//Instance of Schema
const StudentClassSchema = new Schema( StudentClassSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('StudentClass', StudentClassSchema);