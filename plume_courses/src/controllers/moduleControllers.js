
const moduleService = require('../services/moduleServices');
const sectionService = require('../services/sectionServices');
const api_consumer = require('../services/api_consumer');
const configModule = require('../configs/configModules'); 
const Module = require("../models/module");




//Create Module in Data Base
const createModule = async (req, res) =>{
    
    try {
        
        const body = JSON.parse(req.headers.body);
        body.file = req.file ? "/datas/" + req.file.filename : "";
        const token = req.token;

        let types = configModule.moduleTypes.DOCUMENT;
        if (body.link) {
          types = "lien";
        }
        if (body.document) {
          types = "document";
        }
        if (req.file) {
          let extension = req.file.filename.split(".").pop();

          console.log("=================> EXTENSION " + extension);
          switch (extension) {
            case "mp4":
              types = "video";
              break;
            case "mp3" || "wav" || "wma":
              types = "audio";
              break;
            case "pdf":
              types = "pdf";
              break;
            case "docs" || "png" || "jpeg" || "jpg":
              types = "document";
              break;
            default:
              types = "article";
          }
        }
        body.typeModule = types;

        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            console.log("User not authenticated!!!")
            return res.status(401).json({"message" : "User not authenticated!!!"});
        }
        const section = await sectionService.getSectionById(body.sectionId);
        if(!section){
            console.log("Section not found!!!")
            return res.status(401).json({"message" : "Section not found!!!"});
        }
        // const subjectModule = {
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
        body.section = section.id;
        //body.creator = user.data;
        
        console.log("THE USER:");

        const module = await moduleService.createModule(body);
        // if(subjectModule.sections){
        //     subjectModule.sections.push(section);
        // }
        // else{
        //     subjectModule.sections.push(section);
        // }
        const sectionUpdated = await sectionService.addModuleToSectionById(section.id, module.id)
        res.status(200).json({"message" : "Module created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Module!!!"});
    };

}

//Update Module in Data Base
const updateModule = async (req, res) =>{

    const body = JSON.parse(req.headers.body);
    let types = configModule.moduleTypes.DOCUMENT;
    if(body.link){
      types = 'lien';
    }
    if(body.document){
      types = 'article';
    }
        if (req.file) {
            
           let extension = req.file.filename.split('.').pop();
            
            console.log('=================> EXTENSION '+extension);
            switch(extension){
                case 'mp4' :
                    types = 'video';
                    break;
                case 'mp3'||'wav'||'wma' :
                    types = 'audio';
                    break;
                case 'pdf' :
                    types = 'pdf';
                    break;
                case 'docs'||'png'||'jpeg'||'jpg':
                    types = 'document';
                    break;
                default:
                    types = 'article';

            }
        }
    body.typeModule = types
    
    if(req.file){
        body.file = "/datas/"+req.file.filename;
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
        const module = await moduleService.updateModuleById(req.params.moduleId, body);
        res.status(200).json({"message" : "Module updated successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating section!!!"});
    }
}

//Delete Module in Data Base
const deleteModule = async (req, res) =>{
    // const body = JSON.parse(req.headers.body);
    //  if(req.file){
    //      body.image = "/datas/"+req.file.filename;
    //  }
     try{
         
         // body.creator = creator;
         const section = await moduleService.deleteModuleById(req.params.moduleId);
         res.status(200).json({"message" : "Module deleted successfuly!!!"});
     }
     catch(err){
         console.log(err)
         res.status(500).json({"message" : "Error encounterd creating course!!!"});
     }
 }

//Get a Module in Data Base
const getModule = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const section = await sectionService.getModuleById(req.params.sectionId);
        res.status(200).json(section);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Module not exist in DB!!!"});
    }
}

//Get a Module By Section in Data Base
const getModuleSection = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const section = await moduleService.getModuleBySectionId(req.params.sectionId);
        res.status(200).json(section);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Module not exist in DB!!!"});
    }
}

//Get All Modules in Data Base
const getModules = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const sections = await sectionService.getModules();
        res.status(200).json(sections);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Modules not exist in DB!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createModule,
    updateModule,
    getModule,
    getModules,
    getModuleSection,
    deleteModule
}
