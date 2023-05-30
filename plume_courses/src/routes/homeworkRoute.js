const express = require("express");
const controller = require('../controllers/homeworkControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');

var homeworkRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE MODULE********************
homeworkRouter.post('/create', auth.authmiddleware, upload.single('file'), controller.createHomework);
//**************************************** *//  

//************UPDATE MODULE********************
homeworkRouter.patch('/update/:homeworkId', auth.authmiddleware, upload.single('file'), controller.updateHomework);
//**************************************** *// 

// //************VALIDATE MODULE********************
// homeworkRouter.patch('/validate/:homeworkId', auth.authmiddleware, controller.validateAndUnvalidateHomework);
// //**************************************** *// 

//************DELETE MODULE********************
homeworkRouter.patch('/delete/:homeworkId', auth.authmiddleware, controller.deleteHomework);
//**************************************** *// 

//************GET A MODULE********************
homeworkRouter.get('/fetch/one/:homeworkId', auth.authmiddleware, controller.getHomework);
//**************************************** *// 

//************GET A MODULE BY COURSEID********************
//homeworkRouter.get('/fetch/sections/:sectionId', auth.authmiddleware, controller.getHomeworkSection);
//**************************************** *// 

//************GET ALL MODULES********************
homeworkRouter.get("/fetch/all", auth.authmiddleware, controller.getHomeworks);
//**************************************** *//

//Export route to be used on another place
module.exports = homeworkRouter;
