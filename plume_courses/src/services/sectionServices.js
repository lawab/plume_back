
const Section = require('../models/section');


//Create Section
const createSection = async (sectionBody) =>{
    
   const section = await Section.create(sectionBody)
        // .then(data => {
        //     console.log("DATA: ")
        //     console.log(data)
        //     return data
        // })
        // .catch(err =>{
        //     console.log("ERROR########: ")
        //     console.log(err)
        //     return err
        // });
        console.log("#####SECTION: ")
    console.log(section);    
    return section;
}

//Get all sections
const getSections = async () =>{

    const sections = await Section.find()
                .populate({path: 'modules'});
    return sections;
};

//Edit Section by Id
const updateSectionById = async (sectionId, sectionBody) =>{

    const section = await Section.findByIdAndUpdate(
        sectionId,
        {$set: sectionBody},
        {new: true}
    );
    return section;
}

//Get Section by Id
const getSectionById = async (sectionId) =>{

    const section = await Section.findById(sectionId)
            .populate({path: 'modules'});
    return section;
}

//Get Section by Subject Id
const getSectionCourseById = async (courseId) =>{

    const sections = await Section.find({course: courseId})
                //.populate({path: 'modules'});
    return sections;
}

//Add Module Into Section by Id
const addModuleToSectionById = async (sectionId, moduleId) =>{

    const section = await Section.findById(sectionId);
    if(section){
        section.modules? section.modules.push(moduleId) : section.modules = [moduleId];
        section.save();
    }
    return section;
}

//Delete Section by Id
const deleteSectionById = async (sectionId) =>{

    const section = await Section.findById(sectionId)
    .then(data =>{
        data.deletedAt = Date.now();
        data.save()
        return data
    })
    .catch(err =>{
        return err
    })
}

//Get all sections
const getAllSection = async () =>{

    const sections = await Section.find();
    return sections;
}




module.exports ={

    createSection,
    getSections,
    updateSectionById,
    getSectionById,
    getAllSection,
    deleteSectionById,
    getSectionCourseById,
    addModuleToSectionById
}
