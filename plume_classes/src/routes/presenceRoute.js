const express = require("express");
const controller = require('../controllers/presenceControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var presenceRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
presenceRouter.put('/create', controller.createPresence);
//**************************************** *//  

//************UPDATE CATEGORY********************
presenceRouter.post('/createWeek', controller.createEmptyWeek);
//**************************************** *// 

//************DELETE ClASS********************
//presenceRouter.patch('/delete/:presenceId', auth.authmiddleware, controller.deleteClass);
//**************************************** *// 

//************ASSIGN USER TO A ClASS********************
//presenceRouter.patch('/assignUser/:presenceId/:userId', auth.authmiddleware, controller.assignUserToClass);
//**************************************** *// 

//************UNASSIGN USER TO A ClASS********************
//presenceRouter.patch('/unAssignUser/:presenceId/:userId', auth.authmiddleware, controller.unAssignUserToClass);
//**************************************** *// 

//********UNASSIGN COURSE TO A ClASS********************
//presenceRouter.patch('/unAssignCourse/:presenceId/:courseId', auth.authmiddleware, controller.unAssignCourseToClass);
//**************************************** *// 

//************ASSIGN COURSE TO A ClASS********************
//presenceRouter.patch('/assignCourse/:presenceId/:courseId', auth.authmiddleware, controller.assignCourseToClass);
//**************************************** *// 

//************GET A CATEGORY********************
presenceRouter.get('/fetch/one/:presenceId', auth.authmiddleware, controller.getPresence);
//**************************************** *// 

//************GET ALL CATEGORIES********************
presenceRouter.get("/fetch/all/:classeId/:courseId", auth.authmiddleware, controller.getPresences);
//**************************************** *//
//Export route to be used on another place
module.exports = presenceRouter;
