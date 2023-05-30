
//const formationServices = require('../services/formationServices');
const Course = require('../models/course');
//const User = require('../models/users');
const api_consumer = require('./api_consumer')


const getAssignmentsByID = async (courseId) => {
    const course = await Course.findById(courseId).populate('assignments');
    return course;
  };
  
  /**
   * Update course by id
   * @param {ObjectId} courseId
   * @param {Object} updateBody
   * @returns {Promise<Course>}
   */
  const updateAssignmentsByID = async (courseId, updateBody) => {
    const course = await getCourseById(courseId);
  
    if (updateBody.assignments) {
      await Promise.all(
        updateBody.assignments.map(async (item) => {
          if (course.assignments.filter((courseItem) => `${courseItem.user}` === `${item.user}`).length === 0) {
            const response = await Response.create({ userId: item.user, courseId });
            course.responses.push(response.id ? response.id : response._id);
            await User.findByIdAndUpdate({ _id: item.user }, { $addToSet: { courses: courseId } });
          }
        })
      );
    } else {
      return null;
    }
  
    if (!course) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
    }
    Object.assign(course, updateBody);
    await course.save();
    return course;
  };
  
  /**
   * Update course by id
   * @param {ObjectId} courseId
   * @param {Object} updateBody
   * @returns {Promise<Course>}
   */
  const addAssignementById = async (courseId, user) => {
    const course = await Course.findById(courseId);
    // const user = await User.findById(userId);
    //const user = await api_consumer.getUserById(userId)
    console.log("*****addAssignmentById firsssssssssssttttt");
    if (course.assignments) {
      course.assignments.push({ user: user, beginDate: Date.now() });
    } else {
      course.assignments = [{ user: user, beginDate: Date.now() }];
    }
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
    const userUpdated = await api_consumer.addCourseToUserById(user._id, courseId)
    console.log("*****addAssignmentById----------passed");
    await course.save();
    console.log("*****addAssignmentById----------saved");
    return course;
  };

  
  
  module.exports = {
    getAssignmentsByID,
    updateAssignmentsByID,
    addAssignementById,
  };
