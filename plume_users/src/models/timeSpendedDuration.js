const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//TimeSpendedDuration Schema Object
const TimeSpendedDurationSchemaObject = {

    trainee: {type: mongoose.SchemaTypes.ObjectId, ref :'Trainee'},
    course: {type: mongoose.SchemaTypes.ObjectId, ref :'Course'},
    timeSpended: {type: Date},
    
};

//Instance of Schema
const TimeSpendedDurationSchema = new Schema( TimeSpendedDurationSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('TimeSpendedDuration', TimeSpendedDurationSchema);