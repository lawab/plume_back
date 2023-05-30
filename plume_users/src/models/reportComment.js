const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//ReportComment Schema Object
const ReportCommentSchemaObject = {

    text: {type: String},
    report: {type: mongoose.SchemaTypes.ObjectId, ref :'Report'},
    owner: {type: mongoose.SchemaTypes.ObjectId, ref :'User'},
    file: {type: mongoose.SchemaTypes.ObjectId, ref :'Media'},
    
};

//Instance of Schema
const ReportCommentSchema = new Schema( ReportCommentSchemaObject,
    {timestamps: true}
);

module.exports = mongoose.model('ReportComment', ReportCommentSchema);