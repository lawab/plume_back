
const sectionService = require('../services/sectionServices');
const courseService = require('../services/courseServices');
const api_consumer = require('../services/api_consumer');
const Section = require("../models/section");




//Create Section in Data Base
const createSection = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    body.image =req.file? "/datas/"+req.file.filename: "";
    const token = req.token;
    try{
        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            console.log("User not authenticated!!!")
            res.status(401).json({"message" : "User not authenticated!!!"});
        }
        console.log("USERRRR11: ")
        console.log(user.data);
        console.log("USERRRR1122 COURSE IIDDD: ")
        console.log(body.courseId)
        const course = await courseService.getCourseById(body.courseId);
        if(!course){
            console.log("Course not found!!!")
            res.status(401).json({"message" : "Course not found!!!"});
        }
        console.log("COURSE11: ")
        console.log(course);
        // const subjectSection = {
        //     _id: subject.data._id,
        //     title: subject.data.title,
        //     description: subject.data.description,
        // }
        const creator = {
            _id: user.data._id,
            email: user.data.email,
            role: user.data.role,
            fullName: user.data.fullName,
            firstName: user.data.firstName,
            lastName: user.data.lastName
        }
        body.creator = creator;
        body.course = course.id;
        //body.creator = user.data;
        
        console.log("THE USER:");

        const section = await sectionService.createSection(body);
        console.log("THE USER2:");
        console.log(section)
        // if(subjectSection.courses){
        //     subjectSection.courses.push(course);
        // }
        // else{
        //     subjectSection.courses.push(course);
        // }
        const sectionUpdated = await courseService.addSectionToCourseById(course.id, section._id)
        if(!sectionUpdated){
            res.status(500).json({"message" : "Course updating failed!!!"});
        }
        else{
            console.log("THE USER3:");
            console.log(sectionUpdated)
        }
        res.status(200).json({"message" : "Section created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Section!!!"});
    };

}

//Update Section in Data Base
const updateSection = async (req, res) =>{
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
        const section = await sectionService.updateSectionById(req.params.sectionId, body);
        res.status(200).json({"message" : "Section updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating course!!!"});
    }
}

//Get a Section in Data Base
const getSection = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const section = await sectionService.getSectionById(req.params.sectionId);
        res.status(200).json(section);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Section not exist in DB!!!"});
    }
}

//Get a Section By Subject in Data Base
const getSectionCourse = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const sections = await sectionService.getSectionCourseById(req.params.courseId);
        res.status(200).json(sections);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Section not exist in DB!!!"});
    }
}

//Get All Sections in Data Base
const getSections = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const sections = await sectionService.getSections();
        res.status(200).json(sections);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Sections not exist in DB!!!"});
    }
}

//Delete Section in Data Base
const deleteSection = async (req, res) =>{
    // const body = JSON.parse(req.headers.body);
     if(req.file){
         body.image = "/datas/"+req.file.filename;
     }
     try{
         
         // body.creator = creator;
         const section = await sectionService.deleteSectionById(req.params.sectionId);
         res.status(200).json({"message" : "Section deleted successfuly!!!"});
     }
     catch(err){
         console.log(err)
         res.status(500).json({"message" : "Error encounterd creating course!!!"});
     }
 }

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createSection,
    updateSection,
    getSection,
    getSections,
    getSectionCourse,
    deleteSection
}
