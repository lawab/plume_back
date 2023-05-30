const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Lesson Schema Object
const LessonSchemaObject = {

    title: { type: String},
    description: { type: String},
    video: { type: String},
    mediaObject: {type: mongoose.SchemaTypes.ObjectId, ref :'Media'},
    course: {type: mongoose.SchemaTypes.ObjectId, ref : 'Course'},
    lessonProgressions: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'LessonProgression'}
        ], 
        default: [] 
    },
    lessonComments: {
        type: [ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'LessonComment'}
        ], 
        default: []
     },
    kind: {type: Number},
    validated: {type: Boolean}
    
};

//Instance of Schema
const LessonSchema = new Schema( LessonSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Lesson', LessonSchema);