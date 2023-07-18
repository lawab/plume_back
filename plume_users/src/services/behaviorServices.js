
const path = require('path');
const Behavior = require('../models/behavior');


//Create Behavior
const createBehavior = async (behaviorBody) =>{
    
    const behavior = await Behavior.create(behaviorBody)
    return behavior;
}

//Get all behaviors
const getBehaviors = async () =>{

    const behaviors = await Behavior.find();
    console.log(behaviors);
    return behaviors;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit Behavior by Id
const updateBehaviorById = async (behaviorId, behaviorBody) =>{

    const behavior = await Behavior.findByIdAndUpdate(
        behaviorId,
        {$set: behaviorBody},
        {new: true}
    );
    return behavior;
}

//Assign Student to Parents by Id
const assignParentToStudentById = async (parentId, studentId) =>{

    const student = await Behavior.findById(studentId)
    student.parentOfStudent = parentId
    student.save()
    const parent = await Behavior.findById(parentId)
    parent.children? parent.children.push(studentId) : parent.children = [studentId]
    parent.save()
    return {student, parent};
}

//Get Behavior by Id
const getBehaviorById = async (behaviorId) =>{

    const behavior = await Behavior.findById(behaviorId).
            populate({path: 'parent', populate: {path: 'student'}});
    return behavior;
}

//Delete Behavior by Id
const deleteBehaviorById = async (behaviorId) =>{

    const behavior = await Behavior.findById(behaviorId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}

//Add a Class to a Behavior
const addClassToBehaviorById = async (behaviorId, classe) =>{

    const behavior = await Behavior.findById(behaviorId);
    if(behavior){
        behavior.class = classe
        behavior.save()
    }
    return behavior;
}

const unAssignByBehaviorIdByCourseId = async(behaviorId, courseId) => {

    const behavior = await Behavior.findById(behaviorId);
    console.log(behavior);
    const course = await Course.findById(courseId);
    console.log(course);
    if(behavior.courses){
        console.log("behavior courses******");
        let courses = behavior.courses;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].formationId == courseId){
                courses.splice(i,1);
            }
        }

    }
    if(course.assignments){
        console.log("courses**********");
        let assignments = course.assignments;
        for (let i = 0; i < assignments.length; i++) {
            if(assignments[i].behaviorId == behaviorId){
                assignments.splice(i,1);
            }
            
        }
    }
    behavior.save();
    course.save();
    return {behavior, course};
}



module.exports ={

    createBehavior,
    getBehaviors,
    updateBehaviorById,
    getBehaviorById,
    deleteBehaviorById,
    addClassToBehaviorById,
    assignParentToStudentById
}
