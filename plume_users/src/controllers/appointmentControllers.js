
const appointmentService = require('../services/appointmentServices')
const userService = require('../services/userServices')
const emailService = require('../services/emailServices')
const api_consumer = require('../services/api_consumer')
const User = require('../models/users')




//Create Appointment in Data Base
const createAppointment = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log("BONJOUR*****************")
        console.log(body);
        const user = await User.findById(body.creator); //api_consumer.getAppointmentById(body.appointment_id, req.token);
        if (!user) {
            console.log("Creator is not found!!!");
            return res.status(401).json({"message" : "Creator is not found!!!"})
        }
        const appointmentCreated = await appointmentService.createAppointment(body);
        console.log("********appointmentCreated:");
        console.log(appointmentCreated)
        // const userAppointment = await userService.addAppointmentById(body.studentId, appointmentCreated)
        // console.log("********userAppointment:")
        //console.log(userAppointment);
        res.status(200).json({"message" : "Appointment created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Appointment!!!"});
    };

}

//Update Appointment in Data Base
const updateAppointment = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        console.log(body);
        const appointment = await appointmentService.updateAppointmentById(req.params.appointmentId, body);
        res.status(200).json({"message" : "Appointment updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating appointment!!!"});
    }
}

//Validate appointment to User
const validateAppointment = async (req, res) =>{
    
    try {
        const body = JSON.parse(req.headers.body);
        
        const receiver = await userService.getUserById(body.receiverId);
        if (!receiver) {
            console.log("not receiver");
            return res.status(401).json({"message" : "Receiver not found!!!"})
        }
        const appointment = await appointmentService.getAppointmentById(body.appointmentId)
        if (!appointment) {
            console.log("not appointment");
            return res.status(401).json({"message" : "Appointment not found!!!"})
        }
        console.log("********#####################****************")
        console.log(receiver)
        const emailSent = await emailService.sendMailToUser(
          receiver,
          body.subject,
          body.emailBody
        );
        appointment.validated = true
        appointment.save()
        console.log("********************");
        console.log(emailSent);
        res.status(200).json({"message" : "Email sent successfully!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

//Get a Appointment in Data Base
const getAppointment = async (req, res) =>{
    
    try{
        const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
        res.status(200).json(appointment);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Appointment not exist in DB!!!"});
    }
}

//Get All Appointments in Data Base
const getAppointments = async (req, res) =>{
    
    try{
        const appointments = await appointmentService.getAppointments();
        res.status(200).json(appointments);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Appointments not exist in DB!!!"});
    }
}

const assignParentToStudent = async (req, res) =>{
    
    try{
        const appointments = await appointmentService.assignParentToStudentById(req.params.parentId, req.params.studentId);
        res.status(200).json({"message" : "Parent assigned to a Student!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Appointments not exist in DB!!!"});
    }
}

//Delete a Appointments in Data Base
const deleteAppointment = async (req, res) =>{
    
    try{
        const appointment = await appointmentService.deleteAppointmentById(req.params.appointmentId);
        res.status(200).json({"message": "Appointment deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createAppointment,
  updateAppointment,
  getAppointment,
  getAppointments,
  deleteAppointment,
  assignParentToStudent,
  validateAppointment,
};
