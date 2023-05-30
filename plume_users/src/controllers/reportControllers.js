
const reportService = require('../services/reportServices');
const api_consumer = require('../services/api_consumer');
const Report = require("../models/reports");
const User = require('../models/users')
const cryptoJS = require("crypto-js");



//Create Report in Data Base
const createReport = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    console.log(body);
    try{
        const user = await User.findById(body.creator); //api_consumer.getReportById(body.report_id, req.token);
        body.creator = user_id;
        console.log(body);
        
        const reportCreated = await reportService.createReport(body);
        res.status(200).json({"message" : "Report created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Report!!!"});
    };

}

//Update Report in Data Base
const updateReport = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    console.log(body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
        const report = await reportService.updateReportById(req.params.reportId, body);
        res.status(200).json({"message" : "Report updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating report!!!"});
    }
}

//Add Class To Report in Data Base
const addClassToReport = async (req, res) =>{
    
    try{
        const report = await reportService.addClassToReportById(req.params.reportId, req.body);
        console.log(report)
        res.status(200).json(report);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//Get a Report in Data Base
const getReport = async (req, res) =>{
    
    try{
        const report = await reportService.getReportById(req.params.reportId);
        res.status(200).json(report);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Report not exist in DB!!!"});
    }
}

//Get All Reports in Data Base
const getReports = async (req, res) =>{
    
    try{
        const reports = await reportService.getReports();
        res.status(200).json(reports);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Reports not exist in DB!!!"});
    }
}

const assignParentToStudent = async (req, res) =>{
    
    try{
        const reports = await reportService.assignParentToStudentById(req.params.parentId, req.params.studentId);
        res.status(200).json({"message" : "Parent assigned to a Student!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Reports not exist in DB!!!"});
    }
}

//Delete a Reports in Data Base
const deleteReport = async (req, res) =>{
    
    try{
        const report = await reportService.deleteReportById(req.params.reportId);
        res.status(200).json({"message": "Report deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createReport,
    updateReport,
    getReport,
    getReports,
    deleteReport,
    addClassToReport,
    assignParentToStudent
}
