
const homeworkService = require('../services/homeworkServices');
const moduleService = require('../services/moduleServices');
const api_consumer = require('../services/api_consumer');
const Homework = require("../models/homework");




//Create Homework in Data Base
const createHomework = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    body.file =req.file? "/datas/"+req.file.filename: "";
    const token = req.token;
    try{
        const user = await api_consumer.getUserById(body.creator, req.token);
        if(!user){
            console.log("User not authenticated!!!")
            return res.status(401).json({"message" : "User not authenticated!!!"});
        }
        const module = await moduleService.getModuleById(body.moduleId);
        if(!module){
            console.log("Module not found!!!")
            return res.status(401).json({"message" : "Module not found!!!"});
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
        body.module = module._id;
        console.log("MODULE ID###: ",body.module)
        
        console.log("THE USER:");

        const homework = await  homeworkService.createHomework(body);
        const moduleUpdated = await moduleService.addHomeworkToModuleById(module._id, homework._id)
        res.status(200).json({"message" : "Homework created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Homework!!!"});
    };

}

//Update Homework in Data Base
const updateHomework = async (req, res) =>{

    const body = JSON.parse(req.headers.body);
    let types = configHomework.homeworkTypes.DOCUMENT;
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
    body.typeHomework = types
    
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
        const homework = await homeworkService.updateHomeworkById(req.params.homeworkId, body);
        res.status(200).json({"message" : "Homework updated successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating module!!!"});
    }
}

//Delete Homework in Data Base
const deleteHomework = async (req, res) =>{
    // const body = JSON.parse(req.headers.body);
    //  if(req.file){
    //      body.image = "/datas/"+req.file.filename;
    //  }
     try{
         
         // body.creator = creator;
         const module = await homeworkService.deleteHomeworkById(req.params.homeworkId);
         res.status(200).json({"message" : "Homework deleted successfuly!!!"});
     }
     catch(err){
         console.log(err)
         res.status(500).json({"message" : "Error encounterd creating course!!!"});
     }
 }

//Get a Homework in Data Base
const getHomework = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const module = await moduleService.getHomeworkById(req.params.moduleId);
        res.status(200).json(module);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Homework not exist in DB!!!"});
    }
}

//Get a Homework By Module in Data Base
const getHomeworkModule = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const module = await homeworkService.getHomeworkByModuleId(req.params.moduleId);
        res.status(200).json(module);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Homework not exist in DB!!!"});
    }
}

//Get All Homeworks in Data Base
const getHomeworks = async (req, res) =>{
    
    try{
        // const user = await api_consumer.getUserById(body.creator, req.token);
        // if(!user){
        //     res.status(401).json({"message" : "User not authenticated!!!"});
        // }
        const modules = await moduleService.getHomeworks();
        res.status(200).json(modules);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Homeworks not exist in DB!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createHomework,
    updateHomework,
    getHomework,
    getHomeworks,
    getHomeworkModule,
    deleteHomework
}
