
const subjectService = require('../services/subjectServices');
const api_consumer = require('../services/api_consumer');
const Subject = require("../models/subject");




//Create Subject in Data Base
const createSubject = async (req, res) =>{
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
        const subject = await subjectService.createSubject(body);
        console.log("THE USER2:");
        res.status(200).json({"message" : "Subject created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Subject!!!"});
    };

}

//Update Subject in Data Base
const updateSubject = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
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
        const subject = await subjectService.updateSubjectById(req.params.subjectId, body);
        res.status(200).json({"message" : "Subject updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating subject!!!"});
    }
}

//Update Subject in Data Base
const addCourseToSubject = async (req, res) =>{
    console.log("ADD COURSESSSS#########")
    //const body = req.body;
    //console.log(body);
    try{
        
        const subject = await subjectService.addCourseToSubjectById(req.params.subjectId, req.params.courseId);
        console.log("UPDATEDD#########:")
        res.status(200).json({"message" : "Subject updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating subject!!!"});
    }
}


//Get a Subject in Data Base
const getSubject = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const subject = await subjectService.getSubjectById(req.params.subjectId);
        res.status(200).json(subject);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Subject not exist in DB!!!"});
    }
}

//Get All Subjects in Data Base
const getSubjects = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const subjects = await subjectService.getSubjects();
        res.status(200).json(subjects);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Subjects not exist in DB!!!"});
    }
}

//Delete a Subjects in Data Base
const deleteSubject = async (req, res) =>{
    
    try{
        const subject = await subjectService.deleteSubjectById(req.params.subjectId);
        res.status(200).json({"message": "Subject deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createSubject,
    updateSubject,
    getSubject,
    getSubjects,
    deleteSubject,
    addCourseToSubject
}
