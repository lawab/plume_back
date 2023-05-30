const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Report Schema Object
const ReportSchemaObject = {

    title: {type: String},
    description: {type: String},
    kind: {type: Number, defaul: 0},
    state: {type: Number, defaul: 0},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    student: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    owner: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    teacher: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    file: {type: String},
    reportsComments: {
        type:[ 
            {type: mongoose.SchemaTypes.ObjectId, ref : 'ReportComment'}
        ], 
        default: [] 
    },
    validated: {type: Boolean, default: false},
    
};

//Instance of Schema
const ReportSchema = new Schema( ReportSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('Report', ReportSchema);