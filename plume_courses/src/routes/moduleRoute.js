const express = require("express");
const controller = require('../controllers/moduleControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var moduleRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE MODULE********************
moduleRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createModule);
//**************************************** *//  

//************UPDATE MODULE********************
moduleRouter.patch('/update/:moduleId', auth.authmiddleware, upload.single('file'), controller.updateModule);
//**************************************** *// 

// //************VALIDATE MODULE********************
// moduleRouter.patch('/validate/:moduleId', auth.authmiddleware, controller.validateAndUnvalidateModule);
// //**************************************** *// 

//************DELETE MODULE********************
moduleRouter.patch('/delete/:moduleId', auth.authmiddleware, controller.deleteModule);
//**************************************** *// 

//************GET A MODULE********************
moduleRouter.get('/fetch/one/:moduleId', auth.authmiddleware, controller.getModule);
//**************************************** *// 

//************GET A MODULE BY COURSEID********************
moduleRouter.get('/fetch/sections/:sectionId', auth.authmiddleware, controller.getModuleSection);
//**************************************** *// 

//************GET ALL MODULES********************
moduleRouter.get("/fetch/all", auth.authmiddleware, controller.getModules);
//**************************************** *//

//Export route to be used on another place
module.exports = moduleRouter;
