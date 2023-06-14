const express = require("express");
const controller = require('../controllers/userControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controllers/auth/authentification');

var userRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();


//************LOGIN ROUTE********************
userRouter.post("/login", authenfication.login);

//************CREATE CATEGORY********************
userRouter.post('/create', upload.single('file'), auth.authmiddleware, controller.createUser);
//**************************************** *//  

//************UPDATE CATEGORY********************
userRouter.patch('/update/:userId', auth.authmiddleware, upload.single('file'), controller.updateUser);
//**************************************** *// 

//************ADD CLASS TO USER********************
userRouter.patch('/addClass/:userId', controller.addClassToUser);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
userRouter.patch('/assignParent/:parentId/:studentId', controller.assignParentToStudent);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
userRouter.patch('/removeClass/:userId', controller.removeClassToUser);
//**************************************** *// 

//************DELETE USER********************
userRouter.patch('/delete/:userId', auth.authmiddleware, controller.deleteUser);
//**************************************** *// 

//************GET A CATEGORY********************
userRouter.get('/fetch/one/:userId', auth.authmiddleware, controller.getUser);
//**************************************** *// 

//************GET ALL CATEGORIES********************
userRouter.get("/fetch/all", auth.authmiddleware, controller.getUsers);
//**************************************** *//

//Export route to be used on another place
module.exports = userRouter;
