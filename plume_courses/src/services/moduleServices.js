
const Module = require('../models/module');


const createModule = async (moduleBody) => {
    return Module.create(moduleBody);
};

const getModuleById = async(moduleId) =>{
  const module = await Module.findById(moduleId)
  return module;
};

const getModuleBySectionId = async (sectionId) =>{
  const modules = await Module.find({section: sectionId});
  return modules;
}

//Update Module by Id
const updateModuleById = async (moduleId, moduleBody) =>{

  console.log("Module Id: ")
  console.log(moduleId)
  console.log("BOOODDDYYYY: ")
  console.log(moduleBody)
  const module = await Module.findByIdAndUpdate(
      moduleId,
      {$set: moduleBody},
      {new: true}
  );
  return module;
}

const deleteModuleById = async (moduleId)=>{
  const module = await Module.findById(moduleId);
  module.deletedAt=Date.now();
  module.save();
  return module;
}

const updateModuleCommentsById = async (moduleId, updateBody) =>{
  const module = await Module.findById(moduleId);
  if(module){
    module.comments? module.comments.push(updateBody): module.comments=[updateBody];
    module.save();
  }
  
  return module;
}
//Validate the comment by Comment Id
const validateCommentById = async(moduleId, commentId) => {
  const module = await Module.findById(moduleId);
  if(module){
    module.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'true';
      }

    });
    module.save();
  }
  
  return module;
}
//Close the comment by Comment Id
const lockCommentById = async(moduleId, commentId) => {
  const module = await Module.findById(moduleId);
  if(module){
    module.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'false';
      }

    });
    module.save();
  }

  
  return module;
}

//Add Module Into Section by Id
const addHomeworkToModuleById = async (moduleId, homeworkId) =>{

  const module = await Module.findById(moduleId);
  if(module){
    module.homeworks? module.homeworks.push(homeworkId) : module.homeworks = [homeworkId];
    module.save();
  }
  return module;
}

const validatedCommentByModuleId = async (moduleIs) =>{
  
}




  module.exports = {
    createModule,
    getModuleById,
    deleteModuleById,
    getModuleBySectionId,
    updateModuleCommentsById,
    validateCommentById,
    lockCommentById,
    updateModuleById,
    addHomeworkToModuleById
  }