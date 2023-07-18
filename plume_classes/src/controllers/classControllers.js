
const classeService = require('../services/classServices');
const assignmentService = require('../services/assignmentService');
const api_consumer = require('../services/api_consumer');
const Classe = require("../models/class");




//Create Classe in Data Base
const createClasse = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    body.image =req.file? "/datas/"+req.file.filename: "";
    try{
        const user = await api_consumer.getUserById(body.creator, req.token);
        console.log(user)
        if(!user){
            res.status(401).json({"message" : "User not authenticated!!!"});
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
        
        console.log("THE USER:");
        console.log(body)
        const classe = await classeService.createClass(body);
        console.log("THE USER2:");
        res.status(200).json({"message" : "Classe created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Classe!!!"});
    };

}

//Update Classe in Data Base
const updateClasse = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        if (req.file) {
          body.image = "/datas/" + req.file.filename;
          if (body.planning) {
            console.log(body.planning);
            body.planning = "/datas/" + req.file.filename;
          }
          if (body.time_table) {
            console.log(body.time_table);
            body.time_table = "/datas/" + req.file.filename;
          }
        }
        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            res.status(401).json({"message" : "User not authenticated!!!"});
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
        const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Classe updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}

//Assign User into Classe in Data Base
const assignUserToClass = async (req, res) =>{
   
    const classe = await Classe.findById(req.params.classId);
    if(!classe){
        return res.status(401).json({"message" : "Class not found!!!"});
    }
    try{
        const userUpdated = await api_consumer.addClassToUserById(req.params.userId, classe);
        if(!userUpdated){
            return res.status(401).json({"message" : "Class not added to a User"});
        }
        const user = {
            _id: userUpdated.data._id,
            email: userUpdated.data.email,
            role: userUpdated.data.role,
            fullName: userUpdated.data.fullName,
            firstName: userUpdated.data.firstName,
            lastName: userUpdated.data.lastName
        }
        const classeUpdated = await assignmentService.addUserToClassById(req.params.classId, userUpdated.data)
        console.log(classeUpdated)
        //body.creator = creator;
        //const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Classe updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}



//Assign Course into Classe in Data Base
const assignCourseToClass = async (req, res) =>{
   
    const classe = await Classe.findById(req.params.classId);
    if(!classe){
        return res.status(401).json({"message" : "Class not found!!!"});
    }
    try{
        const courseUpdated = await api_consumer.addClassToCourseById(req.params.courseId, req.params.classId);
        if(!courseUpdated){
            return res.status(401).json({"message" : "Class not added to a User"});
        }
        console.log("TEACHERRRRRRRRRRRR: ")
        console.log(courseUpdated.data)
        // const course = courseUpdated.data
        // const teacher = course.creator
        const classeUpdated = await assignmentService.addCourseToClassById(req.params.classId, courseUpdated.data)
        console.log(classeUpdated)
        //body.creator = creator;
        //const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Classe updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}

//unAssign Course into Classe in Data Base
const unAssignCourseToClass = async (req, res) =>{
   
    const classe = await Classe.findById(req.params.classId);
    if(!classe){
        return res.status(401).json({"message" : "Class not found!!!"});
    }
    const course = await api_consumer.getCourseById(
      req.params.courseId,
      req.token
    );
    if(!course){
        return res.status(401).json({"message" : "Course not found!!!"});
    }
    try{
        const classUpdated = await assignmentService.removeCourseToClassById(req.params.classId, req.params.courseId);
        if(!classUpdated){
            return res.status(401).json({"message" : "User not removed from Class"});
        }
        const userUpdated = await api_consumer.removeClassToCourseById(req.params.courseId, req.params.classId)
        if(!userUpdated){
            return res.status(401).json({"message" : "Class not removed from User"});
        }
        console.log(classUpdated)
        //body.creator = creator;
        //const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Classe updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}

//unAssign User into Classe in Data Base
const unAssignUserToClass = async (req, res) =>{
   
    const classe = await Classe.findById(req.params.classId);
    if(!classe){
        return res.status(401).json({"message" : "Class not found!!!"});
    }
    const user = await api_consumer.getUserById(req.params.userId)
    if(!user){
        return res.status(401).json({"message" : "User not found!!!"});
    }
    try{
        const classUpdated = await assignmentService.removeUserToClassById(req.params.classId, req.params.userId);
        if(!classUpdated){
            return res.status(401).json({"message" : "User not removed from Class"});
        }
        const userUpdated = await api_consumer.removeClassToUserById(req.params.userId)
        if(!userUpdated){
            return res.status(401).json({"message" : "Class not removed from User"});
        }
        console.log(classUpdated)
        //body.creator = creator;
        //const classe = await classeService.updateClassById(req.params.classId, body);
        res.status(200).json({"message" : "Classe updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating classe!!!"});
    }
}


//Get a Classe in Data Base
const getClasse = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const classe = await classeService.getClassById(req.params.classId);
        res.status(200).json(classe);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Classe not exist in DB!!!"});
    }
}

//Get All Classes in Data Base
const getClasses = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const classes = await classeService.getClasses();
        res.status(200).json(classes);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Classes not exist in DB!!!"});
    }
}

//Delete a Classes in Data Base
const deleteClass = async (req, res) =>{
    
    try{
        const classe = await classeService.deleteClassById(req.params.classId);
        res.status(200).json({"message": "Class deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createClasse,
  updateClasse,
  getClasse,
  getClasses,
  deleteClass,
  assignUserToClass,
  assignCourseToClass,
  unAssignUserToClass,
  unAssignCourseToClass,
};
