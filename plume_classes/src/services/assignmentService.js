
//const formationServices = require('../services/formationServices');
const Class = require('../models/class');
//const User = require('../models/users');
const api_consumer = require('./api_consumer')


const getAssignmentsByID = async (classeId) => {
    const classe = await Class.findById(classeId).populate('assignments');
    return classe;
  };
  
  /**
   * Update classe by id
   * @param {ObjectId} classeId
   * @param {Object} updateBody
   * @returns {Promise<Class>}
   */
  const updateAssignmentsByID = async (classeId, updateBody) => {
    const classe = await getClassById(classeId);
  
    if (updateBody.assignments) {
      await Promise.all(
        updateBody.assignments.map(async (item) => {
          if (classe.assignments.filter((classeItem) => `${classeItem.user}` === `${item.user}`).length === 0) {
            const response = await Response.create({ userId: item.user, classeId });
            classe.responses.push(response.id ? response.id : response._id);
            await User.findByIdAndUpdate({ _id: item.user }, { $addToSet: { classes: classeId } });
          }
        })
      );
    } else {
      return null;
    }
  
    if (!classe) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
    }
    Object.assign(classe, updateBody);
    await classe.save();
    return classe;
  };
  
  /**
   * Update classe by id
   * @param {ObjectId} classeId
   * @param {Object} updateBody
   * @returns {Promise<Class>}
   */
  const addUserToClassById = async (classId, user) => {
    const classe = await Class.findById(classId);
    // const user = await User.findById(userId);
    //const user = await api_consumer.getUserById(userId)
    console.log("*****addAssignmentById firsssssssssssttttt");
    if (classe.students) {
      classe.students.push({ user: user, beginDate: Date.now() });
    } else {
      classe.students = [{ user: user, beginDate: Date.now() }];
    }
    console.log("*****addAssignmentById----------passed");
    await classe.save();
    return classe
    // if(user.courses){
    //   user.courses.push({formationId: courseId, launchLink:"", registrationId : registrationId})
    // }
    // else{
    //   user.courses = [{formationId: courseId, launchLink:"", registrationId : registrationId}];
    // }
    // await User.findByIdAndUpdate({ _id: userId }, { $addToSet: { courses: courseId } });
    // if(user?.courses){
    //   user.courses.push({formationId: courseId})
    // }
    // else{
    //   user.courses = [{formationId: courseId}];
    // }
    // user.assigned = true;
    // await user.save();
    //const userUpdated = await api_consumer.addCourseToUserById(user._id, courseId)
    
    // console.log("*****addAssignmentById----------saved");
    // return course;
  };

  const addCourseToClassById = async (classId, course) => {
    const classe = await Class.findById(classId);
    // const user = await User.findById(userId);
    //const user = await api_consumer.getUserById(userId)
    console.log("*****addAssignmentById firsssssssssssttttt");
    if (classe.courses) {
      classe.courses.push({ course: course, beginDate: Date.now() });
    } else {
      classe.courses = [{ course: course, beginDate: Date.now() }];
    }
    if (classe.teachers) {
      let found = false 
      let i = 0
      const teachers = classe.teachers
      while (found == false && i < teachers.length) {
        if (teachers[i].teacher._id == course.creator._id) {
          found == true
        }
        i++
      }
      if (found == false) {
        classe.teachers.push({teacher: course.creator, beginDate: Date.now()});
      }
      
    } else {
      classe.teachers = [{ teacher: course.creator, beginDate: Date.now() }];
    }
    console.log("*****addAssignmentById----------passed");
    await classe.save();
    return classe
  };

  const removeCourseToClassById = async(classId, courseId) => {

    const classe = await Class.findById(classId);
    console.log(classe);

    //const course = await Course.findById(courseId);
    //console.log(course);
    if(classe?.courses){
        console.log("user courses******");
        let courses = classe.courses;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].course._id == courseId){
                courses.splice(i,1);
            }
        }

    }
    classe.save();
    return classe;
}

const removeUserToClassById = async(classId, userId) => {

  const classe = await Class.findById(classId);
    if(!classe){
        return res.status(401).json({"message" : "Course not exist!!!"})
    }
    if(classe.students){
        console.log("classe students******");
        let students = classe.students;
        for(let i = 0; i < students.length; i++){
            if(students[i].user._id == userId){
                students.splice(i, 1);
            }
        }

    }
   
    classe.save();
    return classe;
}
  
  
  module.exports = {
    getAssignmentsByID,
    updateAssignmentsByID,
    addUserToClassById,
    addCourseToClassById,
    removeCourseToClassById,
    removeUserToClassById
  };
