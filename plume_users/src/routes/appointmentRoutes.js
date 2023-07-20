const express = require("express");
const controller = require('../controllers/appointmentControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controllers/auth/authentification');

var appointmentRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE APPOINTMENT********************
appointmentRouter.post('/create', auth.authmiddleware, controller.createAppointment);
//**************************************** *//  

//************UPDATE APPOINTMENT********************
appointmentRouter.patch('/update/:appointmentId', auth.authmiddleware, controller.updateAppointment);
//**************************************** *// 

//************UPDATE APPOINTMENT********************
appointmentRouter.patch('/validate', auth.authmiddleware, controller.validateAppointment);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
appointmentRouter.patch('/assignParent/:parentId/:studetId', controller.assignParentToStudent);
//**************************************** *// 

//************DELETE USER********************
appointmentRouter.patch('/delete/:appointmentId', auth.authmiddleware, controller.deleteAppointment);
//**************************************** *// 

//************GET A APPOINTMENT********************
appointmentRouter.get('/fetch/one/:appointmentId', auth.authmiddleware, controller.getAppointment);
//**************************************** *// 

//************GET ALL CATEGORIES********************
appointmentRouter.get("/fetch/all", auth.authmiddleware, controller.getAppointments);
//**************************************** *//

//Export route to be used on another place
module.exports = appointmentRouter;
