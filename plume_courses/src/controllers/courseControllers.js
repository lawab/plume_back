
const courseService = require('../services/courseServices');
const api_consumer = require('../services/api_consumer');
const assignmentService = require('../services/assignmentService')
const Course = require("../models/course");
const course = require('../models/course');




//Create Course in Data Base
const createCourse = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    body.image =req.file? "/datas/"+req.file.filename: "";
    const token = req.token;
    try{
        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            console.log("User not authenticated!!!")
            return res.status(401).json({"message" : "User not authenticated!!!"});
        }
        const subject = await api_consumer.getSubjectById(body.subjectId, req.token);
        if(!subject){
            console.log("Subject not found!!!")
            res.status(401).json({"message" : "Subject not found!!!"});
        }
        // const subjectCourse = {
        //     _id: subject.data._id,
        //     title: subject.data.title,
        //     description: subject.data.description,
        // }
        const subjectCourse = subject?.data;
        console.log("SUBJECT***********");
        console.log(subjectCourse);
        const creator = {
            _id: user.data._id,
            email: user.data.email,
            role: user.data.role,
            fullName: user.data.fullName,
            firstName: user.data.firstName,
            lastName: user.data.lastName
        }
        body.creator = creator;
        body.subject = subjectCourse;
        //body.creator = user.data;
        
        console.log("THE USER:");

        const course = await courseService.createCourse(body);
        // if(subjectCourse.courses){
        //     subjectCourse.courses.push(course);
        // }
        // else{
        //     subjectCourse.courses.push(course);
        // }
        const subjectUpdated = await api_consumer.addCourseToSubjectById(body.subjectId, course._id)
        res.status(200).json({"message" : "Course created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Course!!!"});
    };

}

//Update Course in Data Base
const updateCourse = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            return res.status(401).json({"message" : "User not authenticated!!!"});
        }
        const creator = {
            _id: user.data._id,
            email: user.data.email,
            role: user.data.role,
            fullName: user.data.fullName,
            firstName: user.data.firstName,
            lastName: user.data.lastName
        }
        body.creator = creator;
        const course = await courseService.updateCourseById(req.params.courseId, body);
        res.status(200).json({"message" : "Course updated successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating course!!!"});
    }
}

//Delete Course in Data Base
const deleteCourse = async (req, res) =>{
   // const body = JSON.parse(req.headers.body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
        
        // body.creator = creator;
        const course = await courseService.deleteCourseById(req.params.courseId);
        res.status(200).json({"message" : "Course deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating course!!!"});
    }
}

//Validate and Unvalidate Course
const validateAndUnvalidateCourse = async (req, res) => {

    try{
        const course = await courseService.validateAndUnvalidateCourseById(req.params.courseId);
        res.status(200).json({"message" : "Course validated successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating course!!!"});
    }
}

//Get a Course in Data Base
const getCourse = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const course = await courseService.getCourseById(req.params.courseId);
        res.status(200).json(course);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Course not exist in DB!!!"});
    }
}

//Get a Course By Subject in Data Base
const getCourseSubject = async (req, res) =>{
    
    try{
        const courses = await courseService.getCourseSubjectById(req.params.subjectId);
        res.status(200).json(courses);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Course not exist in DB!!!"});
    }
}

//Get a Course By User in Data Base
const getCourseUser = async (req, res) =>{
    
    try{
        const userCourses = []
        const user = await api_consumer.getUserById(req.params.userId, req.token)
        if(!user){
            console.log("User not Exist Or not authenticated!!!")
            return res.status(401).json({"message" : "User not Exist Or not authenticated!!!"});
        }
        console.log("THE COUUUUURSSESS####11111: ")
        console.log(user.data)
        if(user.data.class){
            const classeId = user.data.class.body._id
            console.log("THE COUUUUURSSESS####222222: ", classeId)
            const courses = await courseService.getCourses()
            console.log("THE COUUUUURSSESS####3333: ", classeId)
            if(courses.length != 0){
                
                console.log("THE COUUUUURSSESS####4444: ", classeId) 
                
                courses.map((item) =>{
                    const course = item
                    
                    if(course.classes){
                        console.log("THE COUUUUURSSESS####555: ", classeId) 
                        console.log("THE COUUUUURSSESS####555: ", classeId)
                        console.log(course)
                        course.classes.map((item) => {
                            console.log("CLASSE########## ")
                            if(item.classe == classeId){
                                console.log("THE COUUUUURSSESS####: ")
                                console.log(userCourses)
                                userCourses.push(course)
                            }
                        })
                    }
                    else{
                        console.log("PAS DE CLASSES########")
                    }
                })
                
                return res.status(200).json(userCourses);
            }
           return res.status(401).json({"message" : "Course not exist in DB!!!"});
        }
        else{
            return res.status(401).json({"message" : "User not assigned in class!!!"});
        }
        //const courses = await courseService.getCourseSubjectById(req.params.subjectId);
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"message" : "Course not exist in DB!!!"});
    }
}

//Get All Courses in Data Base
const getCourses = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const courses = await courseService.getCourses();
        res.status(200).json(courses);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Courses not exist in DB!!!"});
    }
}

//Get All Courses in Data Base
const getModuleCourse = async (req, res) =>{
    
    try{
        const modules = await courseService.getModuleCourseById(req.params.courseId);
        res.status(200).json(modules);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Courses not exist in DB!!!"});
    }
}



//Assign Course to User
const assignToUser = async(req, res) => {
    const user = await api_consumer.getUserById(req.params.userId, req.token);
        if(!user){
            return res.status(401).json({"message" : "User not authenticated!!!"});
        }
        const student = {
            _id: user.data._id,
            email: user.data.email,
            role: user.data.role,
            fullName: user.data.fullName,
            firstName: user.data.firstName,
            lastName: user.data.lastName
        }
    try{
        
        const assignedFormation = await assignmentService.addAssignementById(req.params.courseId, student);
                console.log(assignedFormation);
        console.log("++++++++++++passed");
        res.status(200).json({"message":"student assigned successfully!!!"});
        
    } catch(err){
        res.status(500).json(err);
    }

}

//Add Class To Course in Data Base
const addClassToCourse = async (req, res) =>{
    
    try{
        const course = await courseService.addClassToCourseById(req.params.courseId, req.params.classeId);
        console.log(course)
        res.status(200).json(course);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//remove Classe from Course in Data Base
const removeClassToCourse = async (req, res) =>{
   
    const course = await courseService.getCourseById(req.params.courseId);
    if(!course){
        return res.status(401).json({"message" : "Course not found!!!"});
    }
    const classe = await api_consumer.getClasseById(req.params.classeId)
    if(!classe){
        return res.status(401).json({"message" : "Class not found!!!"});
    }
    try{
        const couseUpdated = await assignmentService.removeClassToCourseById(req.params.courseId, req.params.classeId);
        if(!couseUpdated){
            return res.status(401).json({"message" : "Class not removed from Course"});
        }
        // const userUpdated = await api_consumer.removeClassToUserById(req.params.userId)
        // if(!userUpdated){
        //     return res.status(401).json({"message" : "Class not removed from User"});
        // }
        //console.log(classUpdated)
        //body.creator = creator;
        //const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Course updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createCourse,
    updateCourse,
    getCourse,
    getCourses,
    getCourseSubject,
    validateAndUnvalidateCourse,
    deleteCourse,
    assignToUser,
    addClassToCourse,
    removeClassToCourse,
    getModuleCourse,
    getCourseUser
}
