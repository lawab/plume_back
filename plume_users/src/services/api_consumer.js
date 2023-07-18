const {default: axios} = require('axios');
const config = require('../configs/config');

const getCourseById = async (courseId, token) =>{
    console.log("*******COURSE ID: "+courseId);
    console.log("*******URL: "+config.url_course+`/fetch/one/${courseId}`);
    try{
        const course = await axios.get(config.url_course+`/fetch/one/${courseId}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        });
        console.log("COURSEEE: ");
        console.log(course.data);
        return course;
    }
    catch(err ){
        console.log(err.data);
        return err;
    }
    
}

module.exports = {
  getCourseById
};