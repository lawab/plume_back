const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Lesson Schema Object
const LessonCommentSchemaObject = {

    text: { type: String},
    description: { type: String},
    video: { type: String},
    mediaObject: {type: MediaObjecType},
    author: {type: mongoose.SchemaTypes.ObjectId, ref : 'User'},
    lesson: {type: mongoose.SchemaTypes.ObjectId, ref : 'Lesson'},
    underComments: {
        type:[ {type: mongoose.SchemaTypes.ObjectId, ref : 'UnderComment'}], 
        default: []
    }
    
};

//Instance of Schema
const LessonCommentSchema = new Schema( LessonCommentSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('LessonComment', LessonCommentSchema);