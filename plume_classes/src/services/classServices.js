
const Classe = require('../models/class');
const api_consumer = require('../services/api_consumer')

//Create Class
const createClass = async (classBody) =>{
    console.log("Class services");
   const classe = await Classe.create(classBody)
    .then(data =>{
        console.log("CREATED+++");
        console.log(data);
    })
    .catch(err =>{
        console.log("ERROR: ")
        console.log(err)
    });
   console.log("Class services2");
    return classe;
}

//Get all classs
const getClasses = async () =>{

    const classes = await Classe.find();
    return classes;
};

//Edit Class by Id
const updateClassById = async (classId, classBody) =>{

    const classe = await Classe.findByIdAndUpdate(
        classId,
        {$set: classBody},
        {new: true}
    );
    return classe;
}

//Get Class by Id
const getClassById = async (classId) =>{

    const classe = await Classe.findById(classId);
    return classe;
}

//Delete Class by Id
const deleteClassById = async (classId) =>{

    const classe = await Classe.findById(classId)
    .then(data =>{
        data.deletedAt = Date.now();
        data.save()
        return data
    })
    .catch(err =>{
        return err
    })
}

//Get all classs
const getAllClass = async () =>{

    const classes = await Classe.find();
    return classes;
}


//Assign User into Classe in Data Base
const unAssignCourseToClass = async (classId, courseId) =>{
   
    const classe = await Classe.findById(classId);
    if(!classe){
        return res.status(401).json({"message" : "classe not exist!!!"})
    }
    if(classe.courses){
        console.log("classe courses******");
        let courses = classe.courses;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].course._id == courseId){
                courses.splice(i,1);
            }
        }

    }
    const course = api_consumer
    if(course.assignments){
        console.log("courses**********");
        let assignments = course.assignments;
        for (let i = 0; i < assignments.length; i++) {
            if(assignments[i].userId == userId){
                assignments.splice(i,1);
            }
            
        }
    }
    classe.save();
    course.save();
    return {user, course};
}



module.exports ={

    createClass,
    getClasses,
    updateClassById,
    getClassById,
    getAllClass,
    deleteClassById
}
