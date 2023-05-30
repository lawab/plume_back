
const subject = require('../models/subject');
const Subject = require('../models/subject');


//Create Subject
const createSubject = async (subjectBody) =>{
    console.log("Subject services");
   const subject = await Subject.create(subjectBody)
    .then(data =>{
        console.log("CREATED+++");
        console.log(data);
    })
    .catch(err =>{
        console.log("ERROR: ")
        console.log(err)
    });
   console.log("Subject services2");
    return subject;
}

//Get all subjects
const getSubjects = async () =>{

    const subjects = await Subject.find();
    return subjects;
};

//Edit Subject by Id
const updateSubjectById = async (subjectId, subjectBody) =>{

    const subject = await Subject.findByIdAndUpdate(
        subjectId,
        {$set: subjectBody},
        {new: true}
    );
    return subject;
}

//Get Subject by Id
const getSubjectById = async (subjectId) =>{

    const subject = await Subject.findById(subjectId);
    console.log(subject)
    return subject;
}

//Add Course to Subject by Id
const addCourseToSubjectById = async (subjectId, courseId) =>{

    const subject = await Subject.findById(subjectId);
            // .then(data =>{
            //     const subjectItem = data;
            //     console.log("######DATA SUBJECT: ")
            //     console.log(subjectItem);
                
            // }).
            // catch(err =>{
            //     console.log("ERROR: ")
            //     console.log(err)
            //     return err
            // })
        if(subject){
            if(subject.courses){
                subject.courses.push(courseId)
            }
            else{
                subject.courses = [courseId]
            }
            subject.save()
            return subject;
        }
            
}

//Delete Subject by Id
const deleteSubjectById = async (subjectId) =>{

    const subject = await Subject.findById(subjectId)
    .then(data =>{
        data.deletedAt = Date.now();
        data.save()
        return data
    })
    .catch(err =>{
        return err
    })
}

//Get all subjects
const getAllSubject = async () =>{

    const subjects = await Subject.find();
    return subjects;
}




module.exports ={

    createSubject,
    getSubjects,
    updateSubjectById,
    getSubjectById,
    getAllSubject,
    deleteSubjectById,
    addCourseToSubjectById
}
