
const documentService = require('../services/documentServices')
const userService = require('../services/userServices')
const emailService = require('../services/emailServices')
const api_consumer = require('../services/api_consumer')
const User = require('../models/users')




//Create Document in Data Base
const createDocument = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log(body);
        const user = await User.findById(body.creator); 
        if (!user) {
            console.log("Creator is not found!!!");
            return res.status(401).json({"message" : "Creator is not found!!!"})
        }
        const student = await User.findById(body.studentId);
        if (!student) {
          console.log("Student is not found!!!");
          return res.status(401).json({ message: "Student is not found!!!" });
        }
        const documentCreated = await documentService.createDocument(body);
        console.log("********documentCreated:");
        console.log(documentCreated)
        // const userDocument = await userService.addDocumentById(body.studentId, documentCreated)
        // console.log("********userDocument:")
        //console.log(userDocument);
        res.status(200).json({"message" : "Document created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Document!!!"});
    };

}

//Update Document in Data Base
const updateDocument = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log(body);
        const document = await documentService.updateDocumentById(req.params.documentId, body);
        res.status(200).json({"message" : "Document updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating document!!!"});
    }
}

//Validate document to User
const validateDocument = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        
        const receiver = await userService.getUserById(body.receiverId);
        if (!receiver) {
            console.log("not receiver");
            return res.status(401).json({"message" : "Receiver not found!!!"})
        }
        const document = await documentService.getDocumentById(body.documentId)
        if (!document) {
            console.log("not document");
            return res.status(401).json({"message" : "Document not found!!!"})
        }
        console.log("********#####################****************")
        console.log(receiver)
        const emailSent = await emailService.sendMailToUser(
          receiver,
          body.subject,
          body.emailBody
        );
        document.validated = true
        document.save()
        console.log("********************");
        console.log(emailSent);
        res.status(200).json({"message" : "Email sent successfully!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//Get a Document in Data Base
const getDocument = async (req, res) =>{
    
    try{
        const document = await documentService.getDocumentById(req.params.documentId);
        res.status(200).json(document);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Document not exist in DB!!!"});
    }
}

//Get All Documents in Data Base
const getDocuments = async (req, res) =>{
    
    try{
        const documents = await documentService.getDocuments();
        res.status(200).json(documents);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Documents not exist in DB!!!"});
    }
}

const assignParentToStudent = async (req, res) =>{
    
    try{
        const documents = await documentService.assignParentToStudentById(req.params.parentId, req.params.studentId);
        res.status(200).json({"message" : "Parent assigned to a Student!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Documents not exist in DB!!!"});
    }
}

//Delete a Documents in Data Base
const deleteDocument = async (req, res) =>{
    
    try{
        const document = await documentService.deleteDocumentById(req.params.documentId);
        res.status(200).json({"message": "Document deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createDocument,
  updateDocument,
  getDocument,
  getDocuments,
  deleteDocument,
  assignParentToStudent,
  validateDocument,
};
