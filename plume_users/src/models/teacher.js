const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Teacher Schema Object
const TeacherSchemaObject = {

    userRelation: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    homeworks: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Homework'}
        ], 
        default: [] 
    },
    studentClasses: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'StudentClass'}
        ], 
        default: [] 
    },
    reports: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Report'}
        ], 
        default: [] 
    }
};

//Instance of Schema
const TeacherSchema = new Schema( TeacherSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Teacher', TeacherSchema);