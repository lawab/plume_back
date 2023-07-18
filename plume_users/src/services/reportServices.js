
const path = require('path');
const Report = require('../models/report');

//Create Report
const createReport = async (reportBody) =>{
    
   const report = await Report.create(reportBody);
    return report;
}

//Get all reports
const getReports = async () =>{

    const reports = await Report.find();
    console.log(reports);
    return reports;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit Report by Id
const updateReportById = async (reportId, reportBody) =>{

    const report = await Report.findByIdAndUpdate(
        reportId,
        {$set: reportBody},
        {new: true}
    );
    return report;
}

//Assign Student to Parents by Id
const assignParentToStudentById = async (parentId, studentId) =>{

    const student = await Report.findById(studentId)
    student.parentOfStudent = parentId
    student.save()
    const parent = await Report.findById(parentId)
    parent.children? parent.children.push(studentId) : parent.children = [studentId]
    parent.save()
    return {student, parent};
}

//Get Report by Id
const getReportById = async (reportId) =>{

    const report = await Report.findById(reportId).
            populate({path: 'parent', populate: {path: 'student'}});
    return report;
}

//Delete Report by Id
const deleteReportById = async (reportId) =>{

    const report = await Report.findById(reportId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}

//Add a Class to a Report
const addClassToReportById = async (reportId, classe) =>{

    const report = await Report.findById(reportId);
    if(report){
        report.class = classe
        report.save()
    }
    return report;
}

const unAssignByReportIdByCourseId = async(reportId, courseId) => {

    const report = await Report.findById(reportId);
    console.log(report);
    const course = await Course.findById(courseId);
    console.log(course);
    if(report.courses){
        console.log("report courses******");
        let courses = report.courses;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].formationId == courseId){
                courses.splice(i,1);
            }
        }

    }
    if(course.assignments){
        console.log("courses**********");
        let assignments = course.assignments;
        for (let i = 0; i < assignments.length; i++) {
            if(assignments[i].reportId == reportId){
                assignments.splice(i,1);
            }
            
        }
    }
    report.save();
    course.save();
    return {report, course};
}



module.exports ={

    createReport,
    getReports,
    updateReportById,
    getReportById,
    deleteReportById,
    addClassToReportById,
    assignParentToStudentById
}
