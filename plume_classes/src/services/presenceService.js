
const presence = require('../models/presence');
const Presence = require('../models/presence');
const api_consumer = require('./api_consumer')

//Create Presence
const createPresence = async (presenceBody) =>{
    console.log("presence services")
    console.log(presenceBody)
    const presences = await Presence.find()
    const found = false
    let i = 0
  if (presences.length != 0) {
    while (found == false && i < presences.length) {
      if (
        presences[i].week == presenceBody.week &&
        presences[i].classeId == presenceBody.classeId &&
        presences[i].courseId == presenceBody.courseId
      ) {
        if (presences[i].presences) {
          const calls = presences[i].presences;
          let j = 0;
          while (found == false && j < calls.length) {
            if (calls[i].student._id == presenceBody.student._id) {
              calls[i].presenceBody.day = {
                date: presenceBody.date,
                presence: presenceBody.presence,
                holiday: false,
              };
              found = true;
            }
            j++;
          }
        }
      }
      i++
      presences[i].save()
      return presences[i]
    }
  }
  else {
    const newPresence = {
      week: presenceBody.week,
      classeId: presenceBody.classeId,
      courseId: presenceBody.course,
      presences: [
        {
          student: presenceBody.student,
          lundi: {
            date: presenceBody.date,
            presence: presenceBody.presence,
            holiday: false,
          },
        },
      ],
    };
    const presence = await Presence.create(newPresence)
    return presence
  }
}

const createEmptyWeek = async (weekBody) => {
  const week = await Presence.create(weekBody)
  return week
}

//Get all presences
const getPresences = async () =>{

  const presences = await Presence.find()
            .populate({path : 'classeId'})
    return presences;
};

//Get all presences
const getPresence = async (presenceId) =>{

  const presence = await Presence.findById(presenceId)
            .populate({path : 'classeId'})
    return presence;
};

module.exports = {
  createPresence,
  getPresences,
  getPresence,
  createEmptyWeek,
};
