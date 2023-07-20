const express = require("express");
const controller = require('../controllers/documentControllers');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controllers/auth/authentification');

var documentRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE DOCUMENT********************
documentRouter.post('/create', auth.authmiddleware, controller.createDocument);
//**************************************** *//  

//************UPDATE DOCUMENT********************
documentRouter.patch('/update/:documentId', auth.authmiddleware, controller.updateDocument);
//**************************************** *// 

//************UPDATE DOCUMENT********************
documentRouter.patch('/validate', auth.authmiddleware, controller.validateDocument);
//**************************************** *// 

//************ASSIGN PARENT TO STUDENT********************
documentRouter.patch('/assignParent/:parentId/:studetId', controller.assignParentToStudent);
//**************************************** *// 

//************DELETE USER********************
documentRouter.patch('/delete/:documentId', auth.authmiddleware, controller.deleteDocument);
//**************************************** *// 

//************GET A DOCUMENT********************
documentRouter.get('/fetch/one/:documentId', auth.authmiddleware, controller.getDocument);
//**************************************** *// 

//************GET ALL CATEGORIES********************
documentRouter.get("/fetch/all", auth.authmiddleware, controller.getDocuments);
//**************************************** *//

//Export route to be used on another place
module.exports = documentRouter;
