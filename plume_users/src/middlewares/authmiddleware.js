const jwt = require("jsonwebtoken");

// middleware to check if user is authenticated
const authmiddleware = (req, res, next) => {
  //console.log("#######CONTROL LOGIN");
  let header = req.headers;
  let array = header?.authorization ? header?.authorization.split(" ") : [];
  let token = array.length == 2 ? array[1] : null;
  //console.log("######TOKEN: ",token)
  if (!token) {
    console.log("user is not authenticated")
    return res.status(401).json({ "message": "user is not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SEC, (err, _) => {
      if (err){
        console.log("invalid token")
        return res.status(401).json({ "message": "invalid token" });
      } 
      else {
        console.log("token verified successfully!!!");
        req.token = token;
        next();
      }
    });
  }
};

module.exports = { authmiddleware };
