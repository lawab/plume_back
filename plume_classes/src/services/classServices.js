
const Classe = require('../models/class');


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




module.exports ={

    createClass,
    getClasses,
    updateClassById,
    getClassById,
    getAllClass,
    deleteClassById
}
