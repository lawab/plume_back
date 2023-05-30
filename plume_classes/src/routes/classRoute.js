const express = require("express");
const controller = require('../controllers/classControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var classRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
classRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createClasse);
//**************************************** *//  

//************UPDATE CATEGORY********************
classRouter.patch('/update/:classId', auth.authmiddleware, upload.single('file'), controller.updateClasse);
//**************************************** *// 

//************DELETE ClASS********************
classRouter.patch('/delete/:classId', auth.authmiddleware, controller.deleteClass);
//**************************************** *// 

//************ASSIGN USER TO A ClASS********************
classRouter.patch('/assignUser/:classId/:userId', auth.authmiddleware, controller.assignUserToClass);
//**************************************** *// 

//************ASSIGN COURSE TO A ClASS********************
classRouter.patch('/assignCourse/:classId/:courseId', auth.authmiddleware, controller.assignCourseToClass);
//**************************************** *// 

//************GET A CATEGORY********************
classRouter.get('/fetch/one/:classId', auth.authmiddleware, controller.getClasse);
//**************************************** *// 

//************GET ALL CATEGORIES********************
classRouter.get("/fetch/all", auth.authmiddleware, controller.getClasses);
//**************************************** *//
//Export route to be used on another place
module.exports = classRouter;
