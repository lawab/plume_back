const User = require("../../models/users");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator"); // LOGIN WITH JWT
const print = require("../../log/print");
const login = async function (req, res) {
  try {
    // check if email of user is valided
    if (!isEmail(req.body?.email) || !req.body?.password) {
      print("Bad data!");
      return res.status(401).json({ message: "Wrong credentials!" });
    } else {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        print("Bad mail!");
        return res.status(401).json({ message: "Wrong credentials!" });
      } else {
        const hashedPassword = cryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );
        const password = hashedPassword.toString(cryptoJS.enc.Utf8);
        if (password !== req.body.password) {
          print("Bad Password!");
          return res.status(401).json({ message: "Wrong credentials!" });
        }
      }
      //const exp = 24*3600;
      
      const accessToken = jwt.sign(
        { id: user._id, role: user.role, email: user.email},
        process.env.JWT_SEC,
        {expiresIn: "3d"},
      );
      //const token = {token: accessToken};
      //user.isOnline = true; // enable that user is online
      //user.token = accessToken;
      const userAuthenticated = await user.save();
      //console.log({...user, ...token});;
      if (userAuthenticated?._id) {
        res.status(200).json({ user: userAuthenticated, accessToken });
        print("LOGIN SUCCESSFULY!");
      } else {
        res.status(401).json({
          message: "User authentification failed,please try again!!!",
        });
        print("LOGIN failed!!!");
      }
    }
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

// EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  login,
};
