const {default: axios} = require('axios');
const config = require('../../src/configs/config');

const getUserById = async (userId, token) =>{
    console.log("*******USER ID: "+userId);
    console.log("*******URL: "+config.url_user+`/fetch/one/${userId}`);
    try{
        const user = await axios.get(config.url_user+`/fetch/one/${userId}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
        //console.log(user.data);
        return user;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}

const getSubjectById = async (subjectId, token) =>{
    console.log("*******SUBJECT ID: "+subjectId);
    console.log("*******URL: "+config.url_subject+`/fetch/one/${subjectId}`);
    try{
        const subject = await axios.get(config.url_subject+`/fetch/one/${subjectId}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
        console.log("SUBBBJECT : ")
        console.log(subject.data);
        return subject;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}

const getCourseById = async (courseId, token) =>{
    console.log("*******SUBJECT ID: "+courseId);
    console.log("*******URL: "+config.url_subject+`/fetch/one/${courseId}`);
    try{
        const subject = await axios.get(config.url_subject+`/fetch/one/${courseId}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
        console.log("SUBBBJECT : ")
        console.log(subject.data);
        return subject;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}

const addCourseToSubjectById = async (subjectId, courseId) =>{
    console.log("*******SUBJECT ID: "+subjectId);
    console.log("*******COURSE ID: "+courseId);
    console.log("*******URL: "+config.url_subject+`/addCourse/${subjectId}/${courseId}`);
    try{
        const subject = await axios.patch(config.url_subject+`/addCourse/${subjectId}/${courseId}`,
                        {  
                            // headers: {
                            //     authorization: `Bearer ${token}`
                            // }
                        });
        console.log("ADD COURSE TO SUBJECT##############: ")
        console.log(subject.data);
        return subject;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}

const addCourseToUserById = async (userId, courseId) =>{
    console.log("*******USER ID: "+userId);
    console.log("*******COURSE ID: "+courseId);
    console.log("*******URL: "+config.url_user+`/addCourse/${userId}/${courseId}`);
    try{
        const user = await axios.patch(config.url_user+`/addCourse/${userId}/${courseId}`,
                        {  
                            // headers: {
                            //     authorization: `Bearer ${token}`
                            // }
                        });
        console.log("ADD COURSE TO USER##############: ")
        console.log(user.data);
        return user;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}


module.exports ={
    getUserById,
    getSubjectById,
    addCourseToSubjectById,
    getCourseById,
    addCourseToUserById
}