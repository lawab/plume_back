const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Course Schema Object
const CourseSchemaObject = {

    name: { type: String},
    description: {type: String},
    
    lessons: {
        type:[ {type: mongoose.SchemaTypes.ObjectId, ref : 'Lesson'} ],
        default: []
    },
    ownedBy: {type: mongoose.SchemaTypes.ObjectId, ref : 'User'},
    subject: {type: mongoose.SchemaTypes.ObjectId, ref : 'Subject'},
    timeSpendedDurations: {
        type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'TimeSpendedDuration'}],
        default: []
    },
    studentClasses: {
        type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'StudentClass'}],
        default: []
    },
    validated: {type: Boolean, default: false}
    
};

//Instance of Schema
const CourseSchema = new Schema( CourseSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Course', CourseSchema);