
const Course = require('../models/course');


//Create Course
const createCourse = async (courseBody) =>{
    
   const course = await Course.create(courseBody);
    return course;
}

//Get all courses
const getCourses = async () =>{

    const courses = await Course.find()
            .populate({path: 'sections', populate: {path: 'modules', populate : {path: 'homeworks'}}});
    return courses;
};

//Edit Course by Id
const updateCourseById = async (courseId, courseBody) =>{

    const course = await Course.findByIdAndUpdate(
        courseId,
        {$set: courseBody},
        {new: true}
    );
    return course;
}

//Get Course by Id
const getCourseById = async (courseId) =>{

    console.log("GET COURSE BY COURSE ID111: ", courseId);
    const course = await Course.findById(courseId)
            .populate({path: 'sections', populate: {path: 'modules'}});
            console.log("GET COURSE BY ID");
            console.log(course);
    return course;
}

//Get Course by Subject Id
const getCourseSubjectById = async (subjectId) =>{
    const courses = await Course.find({subject:subjectId})
            .populate({path: 'sections', populate: {path: 'modules', populate: {path: 'homeworks'}}});
    return courses;
}

//Add Section to Course Id
const addSectionToCourseById = async (courseId, sectionId) =>{
    console.log("COURSE iD UPDATEEDDD:", courseId)
    console.log("SECTION iD CREATEDDD:", sectionId)
    const course = await Course.findById(courseId);
    if(course){
        if(course.sections){
            course.sections.push(sectionId)
        }
        else{
            course.sections = [sectionId]
        }
        course.save();
    }
    return course;
}

//Validate and unvalidate course
const validateAndUnvalidateCourseById = async(courseId) => {

    const course = await Course.findById(courseId);
    if(course){
        course.validated? course.validated = false : course.validated = true
        course.save()
    }

    return course
}

//Delete Course by Id
const deleteCourseById = async (courseId) =>{

    const course = await Course.findById(courseId)
    .then(data =>{
        data.deletedAt = Date.now();
        data.save()
        return data
    })
    .catch(err =>{
        return err
    })
}

//Add a Class to a Course
const addClassToCourseById = async (courseId, classeId) =>{
    console.log(classeId)
    const course = await Course.findById(courseId);
    if(course){
        course.classes ? course.classes.push({classe: classeId, beginDate: Date.now()}) : course.classes = [{classe: classeId, beginDate:Date.now()}]
        course.save()
    }
    return course;
}

//Get all courses
const getAllCourse = async () =>{

    const courses = await Course.find()
            .populate({path: 'sections', populate: {path: 'modules'}});
    return courses;
}

//Get Courses By Class ID
const getCourseClassById = async (classeId) =>{

    const courseClasses = [];
    const courses = await Course.find()
            .populate({path: 'sections', populate: {path: 'modules'}});
    courses.map((item) =>{

        const course = item
        if(course.classes){
            course.classes.map((item) => {
                if(item.classe == classeId){
                    courseClasses.push(course)
                }
            })
        }
    })
    console.log("********** COURSES **********")
    console.log(courseClasses)
    return courseClasses;
}

//Get Courses By Class ID
const getCourseUserById = async (userId) =>{

    
    const courseUsers = [];
    const courses = await Course.find()
            .populate({path: 'sections', populate: {path: 'modules'}});
    courses.map((item) =>{

        const course = item
        if(course.classes){
            course.classes.map((item) => {
                if(item.classe == classeId){
                    courseClasses.push(course)
                }
            })
        }
    })
    console.log("********** COURSES **********")
    console.log(courseClasses)
    return courseClasses;
}

//Get Modulees By Course ID
const getModuleCourseById = async (courseId) =>{

    const course = await Course.findById(courseId)
            .populate({path: 'sections', populate: {path: 'modules'}});
        const modules =[]
        if(course.sections){
            const sections = course.sections
            sections.map((item) => {
                const section = item.modules
                section.map((item) =>{
                    modules.push(item)
                })
            })
            console.log("********** MODULES **********")
            //console.log(modules)
            return modules
        }

    
}



module.exports ={

    createCourse,
    getCourses,
    updateCourseById,
    getCourseById,
    getAllCourse,
    deleteCourseById,
    getCourseSubjectById,
    addSectionToCourseById,
    validateAndUnvalidateCourseById,
    addClassToCourseById,
    getCourseClassById,
    getModuleCourseById
}
