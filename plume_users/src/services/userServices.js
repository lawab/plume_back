
const path = require('path');
const User = require('../models/users');


//Create User
const createUser = async (userBody) =>{
    
   const user = await User.create(userBody);
    return user;
}

//Get all users
const getUsers = async () =>{

    const users = await User.find();
    console.log(users);
    return users;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit User by Id
const updateUserById = async (userId, userBody) =>{

    const user = await User.findByIdAndUpdate(
        userId,
        {$set: userBody},
        {new: true}
    );
    return user;
}

//Assign Student to Parents by Id
const assignParentToStudentById = async (parentId, studentId) =>{

    const student = await User.findById(studentId)
    student.parentOfStudent = parentId
    student.save()
    const parent = await User.findById(parentId)
    parent.children? parent.children.push(studentId) : parent.children = [studentId]
    parent.save()
    return {student, parent};
}

//Get User by Id
const getUserById = async (userId) =>{

    const user = await User.findById(userId).
            populate({path: 'parentOfStudent', populate: {path: 'children'}});
    return user;
}

//Delete User by Id
const deleteUserById = async (userId) =>{

    const user = await User.findById(userId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}

//Add a Class to a User
const addClassToUserById = async (userId, classe) =>{

    const user = await User.findById(userId);
    if(user){
        user.class = classe
        user.save()
    }
    return user;
}

const unAssignByUserIdByCourseId = async(userId, courseId) => {

    const user = await User.findById(userId);
    console.log(user);
    const course = await Course.findById(courseId);
    console.log(course);
    if(user.courses){
        console.log("user courses******");
        let courses = user.courses;
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
            if(assignments[i].userId == userId){
                assignments.splice(i,1);
            }
            
        }
    }
    user.save();
    course.save();
    return {user, course};
}



module.exports ={

    createUser,
    getUsers,
    updateUserById,
    getUserById,
    deleteUserById,
    addClassToUserById,
    assignParentToStudentById
}
