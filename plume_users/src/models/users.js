const mongoose = require("mongoose");
const Role = require("../models/roles");
const validator = require("validator");
const Schema = mongoose.Schema;
const ForeignModel = require('../../../globalModels/foreignModels');

const UserSchemaObject = {
    email: { type: String, require: true, null: false, unique: true},
    role: { type: String, default: 'STUDENT'},
    address:{ type: String},
    image:{ type: String},
    phoneNumber: {type: String},
    scoolSubject: {type: String},
    dateOfBirth: {type: Date},
    password: {type: String},
    plainPassword: {type: String},
    fullName: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    class:{type: Object},
    //courses: {type: [{type: String}]},
    children: {type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}]},
    creator: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    //kind: {type: Number, default: 0},
    lessonProgressions: {type: [{type: Object}]},
    numberOfSessions: {type: Number, default: 0},
    parentOfStudent: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    //teacher: {type: mongoose.SchemaTypes.ObjectId, ref: 'Teacher'},
    reports: {type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Report'}]},
    //reportsComments: {type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'ReportComment'}] },
    gender: {type: Boolean, default: true},
    deletedAt: { type: Date, default: null }
};
const UserSchema = new Schema(UserSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);
//module.exports.fieldsRequired = UserSchemaObject;
