
const classeService = require('../services/classServices');
const presenceService = require('../services/presenceService')
const assignmentService = require('../services/assignmentService');
const api_consumer = require('../services/api_consumer');
const Classe = require("../models/class");




//Create Classe in Data Base
const createPresence = async (req, res) =>{
    
  //const body = req.body
  //console.log(body)
  try {
    const body = JSON.parse(req.headers.body);
    console.log(body)
    const user = await api_consumer.getUserById(body.creator, req.token);
    console.log("user.data1**************");
    if (!user) {
      return res.status(401).json({ message: "User not authenticated!!!" });
    }
    console.log("user.data1_2_1###**************");
    console.log(user);
    const creator = {
      _id: user.data._id,
      email: user.data.email,
      role: user.data.role,
      fullName: user.data.fullName,
      firstName: user.data.firstName,
      lastName: user.data.lastName,
    };
    console.log("user.data1_2**************");
    body.creator = creator;
    const user1 = await api_consumer.getUserById(body.studentId, req.token);
    console.log("user1.data2************");
    if (!user1) {
      return res.status(401).json({ message: "Student not found!!!" });
    }
    console.log("user.data1_3**************");
    const student = {
      _id: user1.data._id,
      email: user1.data.email,
      role: user1.data.role,
      fullName: user1.data.fullName,
      firstName: user1.data.firstName,
      lastName: user1.data.lastName,
    };
    console.log("user.data1_4**************");
    body.student = student;

    const classe = await classeService.getClassById(body.classeId);
    if (!classe) {
      return res.status(401).json({ message: "Classe not exist!!!" });
    }
    const presence = await presenceService.createPresence(body);
    console.log("THE USER2:");
    res.status(200).json({ message: "Presence marked successfuly!!!" });
  }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Classe!!!"});
    };

}

const getPresences = async (req, res) => {
  
  try {
    const presences = await presenceService.getPresences(req.params.classeId, req.params.courseId,)
    res.status(200).json(presences)
  }
  catch (err) {
    res.status(500).json({ message: "Error encounterd listening presence!!!" });
  }
}

const getPresence = async (req, res) => {
  try {
    const presence = await presenceService.getPresence(req.params.presenceId)
    res.status(200).json(presence);
  } catch (err) {
    res.status(500).json({ message: "Error encounterd listening presence!!!" });
  }
};

const createEmptyWeek = async (req, res) => {
  try {
    const body = JSON.parse(req.headers.body)
    console.log(body)
    //body = req.body;
    const weekFound = await presenceService.getPresence(body);
    if (weekFound) {
      console.log(weekFound);
      return res.status(401).json({message : "Week already exist!!!"})
    }
    
    const week = await presenceService.createEmptyWeek(body)
    res.status(200).json({message : "New week create successfully!!!"})
  }
  catch (err) {
    res.status(500).json({message: "An Error occured creating week"})
  }
}


//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createPresence,
  getPresences,
  getPresence,
  createEmptyWeek
};
