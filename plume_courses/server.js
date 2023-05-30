
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const dotenv = require("dotenv").config();
const connection = require('./db');

//import routes
const courseRouter = require('./src/routes/courseRoute');
const sectionRouter = require('./src/routes/sectionRoute');
const moduleRouter = require('./src/routes/moduleRoute');
const homeworkRouter = require('./src/routes/homeworkRoute');
//const { db } = require("./src/models/category");

//bodyParser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Use all parser utilities
app.use(express.json({limit: '10000000mb'}));

app.use(express.json());
app.use(express.static(path.join(__dirname, './build/web')));

//allows multiple http request anywhere
app.use(cors());

// All router app
app.use('/api/courses', courseRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/modules', moduleRouter);
app.use('/api/homeworks', homeworkRouter);

//Public files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/datas/")));


connection()
.then(() =>{
    //App listener
    app.listen(process.env.APP_PORT, () => 
    console.log(`your server is listening on port ${process.env.APP_PORT}`)
    );
}).catch((error) =>{
  console.log("*********************ERRRROORRRR",error)
});


