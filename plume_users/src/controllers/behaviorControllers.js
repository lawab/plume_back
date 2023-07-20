
const behaviorService = require('../services/behaviorServices');
const userService = require('../services/userServices')
const api_consumer = require('../services/api_consumer');
const User = require('../models/users')
const cryptoJS = require("crypto-js");



//Create Behavior in Data Base
const createBehavior = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log("behavior");
        console.log(body);
        const user = await User.findById(body.creator); //api_consumer.getBehaviorById(body.behavior_id, req.token);
        if (!user) {
            console.log("Creator is not found!!!");
            return res.status(401).json({"message" : "Creator is not found!!!"})
        }
        const student = await User.findById(body.studentId); //api_consumer.getBehaviorById(body.behavior_id, req.token);
        if (!student) {
            console.log("Student is not found!!!");
          return res.status(401).json({ "message": "Student is not found!!!" });
        }
        const course = await api_consumer.getCourseById(body.courseId, req.token)
        if (user.role == "SUDO" || user.role == "ADMIN"){
          if (!course?.data) {
            console.log("Course is not found!!!");
            return res.status(401).json({ message: "Course is not found!!!" });
          }
        }    
        const courseFound = {
          _id: course.data._id,
          title: course.data.title,
          description: course.data.description,
          image: course.data.image,
        };
        body.course = courseFound;
        const behaviorCreated = await behaviorService.createBehavior(body);
        console.log("********behaviorCreated:");
        console.log(behaviorCreated)
        const userBehavior = await userService.addBehaviorById(body.studentId, behaviorCreated)
        console.log("********userBehavior:")
        console.log(userBehavior);
        res.status(200).json({"message" : "Behavior created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Behavior!!!"});
    };

}

//Update Behavior in Data Base
const updateBehavior = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log(body);
        const behavior = await behaviorService.updateBehaviorById(req.params.behaviorId, body);
        res.status(200).json({"message" : "Behavior updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating behavior!!!"});
    }
}

//Add Class To Behavior in Data Base
const addClassToBehavior = async (req, res) =>{
    
    try{
        const behavior = await behaviorService.addClassToBehaviorById(req.params.behaviorId, req.body);
        console.log(behavior)
        res.status(200).json(behavior);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//Get a Behavior in Data Base
const getBehavior = async (req, res) =>{
    
    try{
        const behavior = await behaviorService.getBehaviorById(req.params.behaviorId);
        res.status(200).json(behavior);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Behavior not exist in DB!!!"});
    }
}

//Get All Behaviors in Data Base
const getBehaviors = async (req, res) =>{
    
    try{
        const behaviors = await behaviorService.getBehaviors();
        res.status(200).json(behaviors);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Behaviors not exist in DB!!!"});
    }
}

const assignParentToStudent = async (req, res) =>{
    
    try{
        const behaviors = await behaviorService.assignParentToStudentById(req.params.parentId, req.params.studentId);
        res.status(200).json({"message" : "Parent assigned to a Student!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Behaviors not exist in DB!!!"});
    }
}

//Delete a Behaviors in Data Base
const deleteBehavior = async (req, res) =>{
    
    try{
        const behavior = await behaviorService.deleteBehaviorById(req.params.behaviorId);
        res.status(200).json({"message": "Behavior deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createBehavior,
    updateBehavior,
    getBehavior,
    getBehaviors,
    deleteBehavior,
    addClassToBehavior,
    assignParentToStudent
}
