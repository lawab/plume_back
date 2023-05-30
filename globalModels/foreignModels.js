const TimeSpendedDurationType = {

}

const LessonProgressionType = {

}

const LessonCommentType = {

}

//userObject Foreign Model
const UserType = {
    email: { type: String},
    role: { type: String, default: 'STUDENT'},
    adress:{ type: String},
    avatar:{ type: String},
    phoneNumber: {type: String},
    scoolSubject: {type: String},
    dateOfBirth: {type: Date},
    password: {type: String},
    plainPassword: {type: String},
    fullName: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    class:{type: Object},
    courses: {type: [{type: Object}]},
    children: {type: [{type: Object}]},
    creator: {type: Object},
    kind: {type: Number, default: 0},
    lessonProgressions: {type: [{type: Object}]},
    numberOfSessions: {type: Number, default: 0},
    parentOfStudent: {type: Object},
    //teacher: {type: mongoose.SchemaTypes.ObjectId, ref: 'Teacher'},
    reports: {type: [{type: Object}]},
    //reportsComments: {type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'ReportComment'}] },
    gender: {type: Boolean, default: true},
    deletedAt: { type: Date, default: null }

}

//Foreign file for homework
const FileType = {
    name: { type: String},
    description: {type: String},
    filePath: {type: String},
    folder: {type: Object},
}
//Foreign folder for file
const FolderType = {
    name: { type: String},
    description: {type: String},
    files: {type: [{type: Object}] }, 
}


//Foreign Homework of student
const HomeworkType = {
    title: { type: String},
    description: { type: String},
    state: {type: Number, default:0},
    kind: {type: Number},
    deadline: {type: Date},
    validated: {type: Boolean, default: false},
    file: {type: Object},
    teacher: {type: Object},
}
//Foreign Section for Lesson
const SectionType = {
    title: { type: String },
    description: { type: String},
    modules: {type: [{ type: Object }]},
    course:{type: Object},
}

//Foreign Lesson of course
const LessonType = {
    title: { type: String},
    description: { type: String},
    file: {type: Object},
    section: {type: Object},
    lessonProgressions: {type:[{type: Object}]},
    lessonComments: {type: [ {type: Object}]},
    kind: {type: Number},
    validated: {type: Boolean}
}

//Foreign Subject for Course
const SubjectType = {
    name: {type: String},
    courses: {type:[ {type:Object}]}
}

//Foreign Course of student
const CourseType = {
    name: { type: String},
    description: {type: String},
    sections: {type:[ {type: Object} ]},
    ownedBy: {type: Object},
    subject: {type: Object},
    timeSpendedDurations: {type: [{type: Object}]},
    class: {type: Object},
    validated: {type: Boolean, default: false}
}
//Foreign Class of student
const ClassType = {
    name: {type: String},
    description: {type: String},
    students: {type:[ {type: Object}]},
    teachers: { type:[ {type: Object}]},
    homeworks: { type:[ {type: Object}]},
    courses: {type:[ {type: Object}]}
}

//Foreign Report of student
const ReportType = {
    title: {type: String},
    description: {type: String},
    kind: {type: Number, defaul: 0},
    state: {type: Number, defaul: 0},
    parent: {type: Object},
    student: {type: Object},
    owner: {type: Object},
    teacher: {type: Object},
    file: {type: Object},
    reportsComments: {type:[ {type: Object}]},
    validated: {type: Boolean, default: false},
}


module.exports = {
    ClassType,
    CourseType,
    HomeworkType,
    LessonCommentType,
    LessonType,
    LessonProgressionType,
    FileType,
    FolderType,
    SubjectType,
    SectionType,
    TimeSpendedDurationType,
    ReportType,
    UserType
}