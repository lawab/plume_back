const express = require("express");
const controller = require('../controllers/reportControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controllers/auth/authentification');

var reportRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
reportRouter.post('/create', upload.single('file'), auth.authmiddleware, controller.createReport);
//**************************************** *//  

//************UPDATE CATEGORY********************
reportRouter.patch('/update/:reportId', auth.authmiddleware, upload.single('file'), controller.updateReport);
//**************************************** *// 

//************ADD CLASS TO USER********************
reportRouter.patch('/addClass/:reportId', controller.addClassToReport);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
reportRouter.patch('/assignParent/:parentId/:studetId', controller.assignParentToStudent);
//**************************************** *// 

//************DELETE USER********************
reportRouter.patch('/delete/:reportId', auth.authmiddleware, controller.deleteReport);
//**************************************** *// 

//************GET A CATEGORY********************
reportRouter.get('/fetch/one/:reportId', auth.authmiddleware, controller.getReport);
//**************************************** *// 

//************GET ALL CATEGORIES********************
reportRouter.get("/fetch/all", auth.authmiddleware, controller.getReports);
//**************************************** *//

//Export route to be used on another place
module.exports = reportRouter;
