const User = require("../models/users");
const role = require("../models/roles");
const cryptoJS = require("crypto-js");

exports.createSuperUser = function () {
  User.findOne({ role: 'SUDO' })
  .then(user =>{
    if (user == null) {
      var data = {};
      data.email = process.env.ADMIN_MAIL;
      data.firstName = process.env.FIRSTNAME;
      data.lastName = process.env.LASTNAME;
      data.fullName = [process.env.FIRSTNAME, process.env.LASTNAME].join(" ");
      data.password = cryptoJS.AES.encrypt(
        process.env.SUPER_SEC,
        process.env.PASS_SEC
      ).toString();
      data.role = 'SUDO';
      // Then save the user
      User.create(data)
      .then(data =>{
        console.log("Super Admin compte created");
      })
      .catch(err =>{
        console.log(err);
      })
    } else {
      console.log("Super Admin compte already exists");
      return true;
    }
  })
  .catch(err => {
      console.log("err");
      console.log(err);
    })
};
