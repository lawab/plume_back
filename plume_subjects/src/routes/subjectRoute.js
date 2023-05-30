const express = require("express");
const controller = require('../controllers/subjectControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var subjectRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
subjectRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createSubject);
//**************************************** *//  

//************UPDATE CATEGORY********************
subjectRouter.patch('/update/:subjectId', auth.authmiddleware, upload.single('file'), controller.updateSubject);
//**************************************** *// 

//************ADD COURSE TO SUBJECT********************
subjectRouter.patch('/addCourse/:subjectId/:courseId', controller.addCourseToSubject);
//**************************************** *// 

//************DELETE ClASS********************
subjectRouter.patch('/delete/:subjectId', auth.authmiddleware, controller.deleteSubject);
//**************************************** *// 

//************GET A CATEGORY********************
subjectRouter.get('/fetch/one/:subjectId', auth.authmiddleware, controller.getSubject);
//**************************************** *// 

//************GET ALL CATEGORIES********************
subjectRouter.get("/fetch/all", auth.authmiddleware, controller.getSubjects);
//**************************************** *//
//Export route to be used on another place
module.exports = subjectRouter;
