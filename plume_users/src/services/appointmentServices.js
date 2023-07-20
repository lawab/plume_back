
const path = require('path');
const Appointment = require('../models/appointment');


//Create Appointment
const createAppointment = async (appointmentBody) =>{
    
    const appointment = await Appointment.create(appointmentBody)
    return appointment;
}

//Get all appointments
const getAppointments = async () =>{

    const appointments = await Appointment.find().
    populate({path: 'creator'});
    console.log(appointments);
    return appointments;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit Appointment by Id
const updateAppointmentById = async (appointmentId, appointmentBody) =>{

    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        {$set: appointmentBody},
        {new: true}
    );
    return appointment;
}

//Assign Student to Parents by Id
const assignParentToStudentById = async (parentId, studentId) =>{

    const student = await Appointment.findById(studentId)
    student.parentOfStudent = parentId
    student.save()
    const parent = await Appointment.findById(parentId)
    parent.children? parent.children.push(studentId) : parent.children = [studentId]
    parent.save()
    return {student, parent};
}

//Get Appointment by Id
const getAppointmentById = async (appointmentId) =>{

    const appointment = await Appointment.findById(appointmentId).
        populate({path: 'creator'});
    return appointment;
}

//Delete Appointment by Id
const deleteAppointmentById = async (appointmentId) =>{

    const appointment = await Appointment.findById(appointmentId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}

//Add a Class to a Appointment
const addClassToAppointmentById = async (appointmentId, classe) =>{

    const appointment = await Appointment.findById(appointmentId);
    if(appointment){
        appointment.class = classe
        appointment.save()
    }
    return appointment;
}

const unAssignByAppointmentIdByCourseId = async(appointmentId, courseId) => {

    const appointment = await Appointment.findById(appointmentId);
    console.log(appointment);
    const course = await Course.findById(courseId);
    console.log(course);
    if(appointment.courses){
        console.log("appointment courses******");
        let courses = appointment.courses;
        for(let i = 0; i < courses.length; i++){
            if(courses[i].formationId == courseId){
                courses.splice(i,1);
            }
        }

    }
    if(course.assignments){
        console.log("courses**********");
        let assignments = course.assignments;
        for (let i = 0; i < assignments.length; i++) {
            if(assignments[i].appointmentId == appointmentId){
                assignments.splice(i,1);
            }
            
        }
    }
    appointment.save();
    course.save();
    return {appointment, course};
}



module.exports ={

    createAppointment,
    getAppointments,
    updateAppointmentById,
    getAppointmentById,
    deleteAppointmentById,
    addClassToAppointmentById,
    assignParentToStudentById
}
