const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Category Schema Object
const LessonProgressionSchemaObject = {

    trainee: {
        type:[ {type: mongoose.SchemaTypes.ObjectId, ref : 'User'}], 
        default: []
    },
    lesson: {type: mongoose.SchemaTypes.ObjectId, ref : 'Lesson'},
    isFinished: {type: Boolean, default: false}
    
};

//Instance of Schema
const LessonProgressionSchema = new Schema( LessonProgressionSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('LessonProgress', LessonProgressionSchema);