const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//ParentOfTrainee Schema Object
const ParentOfTraineeSchemaObject = {

    userRelation: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    trainee: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Trainee'}
        ], 
        default: [] 
    },
    reports: {
        type: [ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'Report'}
        ], 
        default: []
     }
    
};

//Instance of Schema
const ParentOfTraineeSchema = new Schema( ParentOfTraineeSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('ParentOfTrainee', ParentOfTraineeSchema);