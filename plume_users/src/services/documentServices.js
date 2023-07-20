
const path = require('path');
const Document = require('../models/document');


//Create Document
const createDocument = async (documentBody) =>{
    
    const document = await Document.create(documentBody)
    return document;
}

//Get all documents
const getDocuments = async () =>{

    const documents = await Document.find().
    populate({path: 'creator'});
    console.log(documents);
    return documents;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit Document by Id
const updateDocumentById = async (documentId, documentBody) =>{

    const document = await Document.findByIdAndUpdate(
        documentId,
        {$set: documentBody},
        {new: true}
    );
    return document;
}

//Assign Student to Parents by Id
const assignParentToStudentById = async (parentId, studentId) =>{

    const student = await Document.findById(studentId)
    student.parentOfStudent = parentId
    student.save()
    const parent = await Document.findById(parentId)
    parent.children? parent.children.push(studentId) : parent.children = [studentId]
    parent.save()
    return {student, parent};
}

//Get Document by Id
const getDocumentById = async (documentId) =>{

    const document = await Document.findById(documentId).
        populate({path: 'creator'});
    return document;
}

//Delete Document by Id
const deleteDocumentById = async (documentId) =>{

    const document = await Document.findById(documentId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}

//Add a Class to a Document
const addClassToDocumentById = async (documentId, classe) =>{

    const document = await Document.findById(documentId);
    if(document){
        document.class = classe
        document.save()
    }
    return document;
}

const unAssignByDocumentIdByCourseId = async(documentId, courseId) => {

    const document = await Document.findById(documentId);
    console.log(document);
    const course = await Course.findById(courseId);
    console.log(course);
    if(document.courses){
        console.log("document courses******");
        let courses = document.courses;
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
            if(assignments[i].documentId == documentId){
                assignments.splice(i,1);
            }
            
        }
    }
    document.save();
    course.save();
    return {document, course};
}



module.exports ={

    createDocument,
    getDocuments,
    updateDocumentById,
    getDocumentById,
    deleteDocumentById,
    addClassToDocumentById,
    assignParentToStudentById
}
