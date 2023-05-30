
const Homework = require('../models/homework');
const Module = require('../models/module')


const createHomework = async (homeworkBody) => {
    return Homework.create(homeworkBody);
};

const gethomeworkById = async(homeworkId) =>{
  const homework = await Homework.findById(homeworkId)
  return homework;
};

const getHomeworkByModuleId = async (moduleId) =>{
  const homeworks = await Homework.find({module: moduleId});
  return homeworks;
}

//Update Homework by Id
const updateHomeworkById = async (homeworkId, homeworkBody) =>{

  console.log("Homework Id: ")
  console.log(homeworkId)
  console.log("BOOODDDYYYY: ")
  console.log(homeworkBody)
  const homework = await Homework.findByIdAndUpdate(
      homeworkId,
      {$set: homeworkBody},
      {new: true}
  );
  return homework;
}

const deleteHomeworkById = async (homeworkId)=>{
  const homework = await Homework.findById(homeworkId);
  homework.deletedAt=Date.now();
  homework.save();
  return homework;
}

const updateHomeworkCommentsById = async (homeworkId, updateBody) =>{
  const homework = await Homework.findById(homeworkId);
  if(homework){
    homework.comments? homework.comments.push(updateBody): homework.comments=[updateBody];
    homework.save();
  }
  
  return homework;
}
//Validate the comment by Comment Id
const validateCommentById = async(homeworkId, commentId) => {
  const homework = await Homework.findById(homeworkId);
  if(homework){
    homework.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'true';
      }

    });
    homework.save();
  }
  
  return homework;
}
//Close the comment by Comment Id
const lockCommentById = async(homeworkId, commentId) => {
  const homework = await Homework.findById(homeworkId);
  if(homework){
    homework.comments.map((item)=>{
      if(item.id == commentId){
        item.validated = 'false';
      }

    });
    homework.save();
  }

  
  return homework;
}



const validatedCommentByHomeworkId = async (homeworkIs) =>{
  
}




  module.exports = {
    createHomework,
    gethomeworkById,
    deleteHomeworkById,
    getHomeworkByModuleId,
    updateHomeworkCommentsById,
    validateCommentById,
    lockCommentById,
    updateHomeworkById,
  }