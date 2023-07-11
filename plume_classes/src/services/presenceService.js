
const Presence = require('../models/presence');
const api_consumer = require('./api_consumer')

//Create Presence
const createPresence = async (presenceBody) =>{
    
  const presence = await Presence.findOne({
    week: presenceBody.week,
    year: presenceBody.year,
    classeId: presenceBody.classeId,
    courseId: presenceBody.courseId
  });
  if (presence) {
    console.log("presence services****************");
    console.log(presence);
    console.log("INSIDE FIRST IF****************");
      if (presence.presences) {
        console.log("INSIDE SECOND IF****************");
        let found = false;
        const calls = presence.presences;
        let i = 0;
        while (found == false && i < calls.length) {
          console.log("*****LENGTH: ", calls.length);
          console.log(calls[i])
          if (calls[i].student._id == presenceBody.student._id) {
            console.log("##########****** FOUNDEDDDDD STUDENTTTTTT *****************");
            console.log(calls[i].student._id);
            console.log("false", presenceBody.day);
            console.log(calls[i]);
            const day = presenceBody.day;
            switch (day) {
              case "lundi":
                {
                  calls[i].lundi = {
                    date: presenceBody.date,
                    presence: presenceBody.presence,
                    holiday: false,
                  }
                }
                break
              case "mardi":
                {
                  calls[i].mardi = {
                    date: presenceBody.date,
                    presence: presenceBody.presence,
                    holiday: false,
                  }
                }
                break
              case "mercredi":
                {
                  calls[i].mercredi = {
                    date: presenceBody.date,
                    presence: presenceBody.presence,
                    holiday: false,
                  }
                }
                break
              case "jeudi":
                {
                  calls[i].jeudi = {
                    date: presenceBody.date,
                    presence: presenceBody.presence,
                    holiday: false,
                  }
                }
                break
              case "vendredi":
                {
                  calls[i].vendredi = {
                    date: presenceBody.date,
                    presence: presenceBody.presence,
                    holiday: false,
                  }
                }
                break
            }
            console.log("true");
            found = true;
            console.log("FOUND: ", found);
          }
          i++;
        }
        if (found == false) {
          let day = presenceBody.day
          const newPresence = {
            student: presenceBody.student,
            [day]: {
              date: presenceBody.date,
              presence: presenceBody.presence,
              holiday: false,
            },
          }
          calls.push(newPresence)
        }
      }
    presence.save();
    return presence;
  }
  else {
    const calls = {
      student: presenceBody.student,
      [presenceBody.day]: {
              date: presenceBody.date,
              presence: presenceBody.presence,
              holiday: false,
            },

    }
    const newPresence = {
      week: presenceBody.week,
      year: presenceBody.year,
      classeId: presenceBody.classeId,
      courseId: presenceBody.courseId,
      presences: [calls]
    }
    const presenceSaved = await Presence.create(newPresence)
    return presenceSaved
  }
  
  
}


const createEmptyWeek = async (weekBody) => {
  const week = await Presence.create(weekBody)
  return week
}

//Get all presences
const getPresences = async (classeId, courseId) => {
  const presences = await Presence.find({
    classeId: classeId,
    courseId: courseId,
  }).populate({ path: "classeId" });
  return presences;
};

//Get all presences
const getPresence = async (body) =>{

  const presence = await Presence.findOne({
    week: body.week,
    year: body.year,
    classeId: body.classeId,
    courseId: body.courseId,
  }).populate({ path: "classeId" });
    return presence;
};

module.exports = {
  createPresence,
  getPresences,
  getPresence,
  createEmptyWeek,
};
