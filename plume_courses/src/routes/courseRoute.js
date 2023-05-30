const express = require("express");
const controller = require('../controllers/courseControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var courseRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
courseRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createCourse);
//**************************************** *//  

//************UPDATE CATEGORY********************
courseRouter.patch('/update/:courseId', auth.authmiddleware, upload.single('file'), controller.updateCourse);
//**************************************** *// 

//************VALIDATE COURSE********************
courseRouter.patch('/validate/:courseId', auth.authmiddleware, controller.validateAndUnvalidateCourse);
//**************************************** *// 

//************DELETE COURSE********************
courseRouter.patch('/delete/:courseId', auth.authmiddleware, controller.deleteCourse);
//**************************************** *// 

//************ADD CLASS TO COURSE********************
courseRouter.patch('/addClass/:courseId/:classeId', controller.addClassToCourse);
//**************************************** *// 

//************GET A CATEGORY********************
courseRouter.get('/fetch/one/:courseId', auth.authmiddleware, controller.getCourse);
//**************************************** *// 

//************GET COURSE  Y USER********************
courseRouter.get('/user/:userId', auth.authmiddleware, controller.getCourseUser);
//**************************************** *// 

//************GET A MODULES BY COURSE********************
courseRouter.get('/modules/:courseId', auth.authmiddleware, controller.getModuleCourse);
//**************************************** *// 

//************GET A COURSE BY SUBJECTID********************
courseRouter.get('/fetch/subjects/:subjectId', auth.authmiddleware, controller.getCourseSubject);
//**************************************** *// 

//************GET ALL CATEGORIES********************
courseRouter.get("/fetch/all", auth.authmiddleware, controller.getCourses);
//**************************************** *//

//Export route to be used on another place
module.exports = courseRouter;
