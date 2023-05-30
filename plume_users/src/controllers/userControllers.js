
const userService = require('../services/userServices');
const api_consumer = require('../services/api_consumer');
const User = require("../../src/models/users");
const cryptoJS = require("crypto-js");



//Create User in Data Base
const createUser = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body = JSON.parse(req.headers.body);
    console.log(body);
    body.image = req.file? "/datas/"+req.file.filename: "";
    try{
        const user = await User.findById(body.creator); //api_consumer.getUserById(body.user_id, req.token);
        body.creator = user;
        const password = cryptoJS.AES.encrypt(body.password, process.env.PASS_SEC).toString()
        console.log("#####################THE USER:");
        body.password = password;
        console.log(body);
        // const creator = {
        //     _id : user.data._id,
        //     role: user.data.role,
        //     email: user.data.email,
        //     firstName: user.data.firstName,
        //     lastName: user.data.lastName
        // };
        // const restaurant = {
        //     _id : user.data.restaurant?._id,
        //     name_restaurant : user.data.restaurant?.name_restaurant,
        //     image_restaurant: user.data.restaurant?.image_restaurant
        // }
        // newUser._creator = creator;
        // newUser.restaurant = restaurant;
        // console.log(newUser);
        const userCreated = await userService.createUser(body);
        res.status(200).json({"message" : "User created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating User!!!"});
    };

}

//Update User in Data Base
const updateUser = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    console.log(body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
        const user = await userService.updateUserById(req.params.userId, body);
        res.status(200).json({"message" : "User updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating user!!!"});
    }
}

//Add Class To User in Data Base
const addClassToUser = async (req, res) =>{
    
    try{
        const user = await userService.addClassToUserById(req.params.userId, req.body);
        console.log(user)
        res.status(200).json(user);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//Get a User in Data Base
const getUser = async (req, res) =>{
    
    try{
        const user = await userService.getUserById(req.params.userId);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "User not exist in DB!!!"});
    }
}

//Get All Users in Data Base
const getUsers = async (req, res) =>{
    
    try{
        const users = await userService.getUsers();
        res.status(200).json(users);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Users not exist in DB!!!"});
    }
}

const assignParentToStudent = async (req, res) =>{
    
    try{
        const users = await userService.assignParentToStudentById(req.params.parentId, req.params.studentId);
        res.status(200).json({"message" : "Parent assigned to a Student!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Users not exist in DB!!!"});
    }
}

//Delete a Users in Data Base
const deleteUser = async (req, res) =>{
    
    try{
        const user = await userService.deleteUserById(req.params.userId);
        res.status(200).json({"message": "User deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
    createUser,
    updateUser,
    getUser,
    getUsers,
    deleteUser,
    addClassToUser,
    assignParentToStudent
}
