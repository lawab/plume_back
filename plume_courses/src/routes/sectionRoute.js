const express = require("express");
const controller = require('../controllers/sectionControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var sectionRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE SECTION********************
sectionRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createSection);
//**************************************** *//  

//************UPDATE SECTION********************
sectionRouter.patch('/update/:sectionId', auth.authmiddleware, upload.single('file'), controller.updateSection);
//**************************************** *// 

// //************VALIDATE SECTION********************
// sectionRouter.patch('/validate/:sectionId', auth.authmiddleware, controller.validateAndUnvalidateSection);
// //**************************************** *// 

//************DELETE SECTION********************
sectionRouter.patch('/delete/:sectionId', auth.authmiddleware, controller.deleteSection);
//**************************************** *// 

//************GET A SECTION********************
sectionRouter.get('/fetch/one/:sectionId', auth.authmiddleware, controller.getSection);
//**************************************** *// 

//************GET A SECTION BY COURSEID********************
sectionRouter.get('/fetch/courses/:courseId', auth.authmiddleware, controller.getSectionCourse);
//**************************************** *// 

//************GET ALL SECTIONS********************
sectionRouter.get("/fetch/all", auth.authmiddleware, controller.getSections);
//**************************************** *//

//Export route to be used on another place
module.exports = sectionRouter;
