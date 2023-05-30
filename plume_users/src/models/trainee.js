const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Trainee Schema Object
const TraineeSchemaObject = {

    userRelation: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    timeSpendedDurations: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'TimeSpendedDuration'}
        ], 
        default: [] 
    },
    parentOfTrainee: {type: mongoose.SchemaTypes.ObjectId, ref :'ParentOfTrainee'},
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
const TraineeSchema = new Schema( TraineeSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Trainee', TraineeSchema);