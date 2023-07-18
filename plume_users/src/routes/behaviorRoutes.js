const express = require("express");
const controller = require('../controllers/behaviorControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controllers/auth/authentification');

var behaviorRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
behaviorRouter.post('/create', auth.authmiddleware, controller.createBehavior);
//**************************************** *//  

//************UPDATE CATEGORY********************
behaviorRouter.patch('/update/:behaviorId', auth.authmiddleware, controller.updateBehavior);
//**************************************** *// 

//************ADD CLASS TO USER********************
behaviorRouter.patch('/addClass/:behaviorId', controller.addClassToBehavior);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
behaviorRouter.patch('/assignParent/:parentId/:studetId', controller.assignParentToStudent);
//**************************************** *// 

//************DELETE USER********************
behaviorRouter.patch('/delete/:behaviorId', auth.authmiddleware, controller.deleteBehavior);
//**************************************** *// 

//************GET A CATEGORY********************
behaviorRouter.get('/fetch/one/:behaviorId', auth.authmiddleware, controller.getBehavior);
//**************************************** *// 

//************GET ALL CATEGORIES********************
behaviorRouter.get("/fetch/all", auth.authmiddleware, controller.getBehaviors);
//**************************************** *//

//Export route to be used on another place
module.exports = behaviorRouter;
