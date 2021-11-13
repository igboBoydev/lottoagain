#!/usr/bin/env nodejs
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const helpers = require('./config/helpers');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');
const db = require('./database/db');

//import all games
//let game = require('./seeders/202106292222-lottos')

//Load Environment Variables
require('dotenv').config();
//Connect to DataBase
require('./database/db');

// set security HTTP headers
app.use(helmet());

//sanitize request data
//app.use(xss());

//gzip compression
app.use(compression());

//Cross origin fix
app.use(cors());
//app.options('*', 'cors');

// Logger
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

//Parses requests body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Initialise Passport
app.use(passport.initialize());
//app.use(passport.session());

//Configure socket global
app.use(function (req, res, next){
    req.io = io;
    next();
});


const Queue = require('bull')
const { createBullBoard } = require('bull-board')
const { BullAdapter } = require('bull-board/bullAdapter')
const batchRegularQueue = new Queue('batchRegularLotto')
const sortRegularQueue = new Queue('sortRegularLotto')

const { router, setQueues, replaceQueues, addQueue, removeQueue } = createBullBoard([
  new BullAdapter(batchRegularQueue),
  new BullAdapter(sortRegularQueue)
]);

//card-queue
app.use('/admin/queues', router);

//Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if(req.method == "OPTIONS")
    {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
        return res.status(200).json({});
    }

    next();
})

//include route module
const publicRoute = require('./routes/public');
const authRoute = require('./routes/auth');

//App Routes
app.use('/api/v1/', publicRoute);
app.use('/api/v1/auth/', authRoute);


// lottoExpress numbers

//let arr = []

// async function getResult() {
    
//     setInterval( async() => {
//         const number = Math.floor(Math.random() * 90)
//         const number1 = Math.floor(Math.random() * 90)
//         const number2 = Math.floor(Math.random() * 90)
//         const number3 = Math.floor(Math.random() * 90)
//         const number4 = Math.floor(Math.random() * 90)
//         arr = [number, number1, number2, number3, number4]
//         let numberSet = new Set(arr)
//         let array = [...numberSet]

//         var d = new Date();
//         var minutes = d.getMinutes()
//         var seconds = d.getSeconds()
//         var hours1 = d.getHours()
//         var date = d.getDate();
//         var month = d.getMonth() + 1; 
//         var year = d.getFullYear();
//         var time1 = hours1 + ":" + minutes + ":" + seconds
//         var dates = `${year}-${month}-${date} ${time1}`

//         await db.Gameresults.create({
//             name: 'Lotto Express',
//             odds: array.toString(),
//             dates: dates
//         });
//         console.log(dates)

//     }, 1800000)

// }
    
// getResult()

// softLotto numbers
// let setArr = []

// async function getSoftLottoOdds() {

//     setInterval( async() => {
//         const number = Math.floor(Math.random() * 90)
//         const number1 = Math.floor(Math.random() * 90)
//         const number2 = Math.floor(Math.random() * 90)
//         const number3 = Math.floor(Math.random() * 90)
//         const number4 = Math.floor(Math.random() * 90)
//         setArr = [number, number1, number2, number3, number4]
//         let numberSet = new Set(setArr)
//         let array = [...numberSet]

//         var d = new Date();
//         var minutes = d.getMinutes()
//         var seconds = d.getSeconds()
//         var hours1 = d.getHours()
//         var date = d.getDate();
//         var month = d.getMonth() + 1;
//         var year = d.getFullYear();
//         var time1 = hours1 + ":" + minutes + ":" + seconds
//         var dates = `${year}-${month}-${date} ${time1}`

//         console.log(dates)

//         await db.Gameresults.create({
//             name: 'soft Lotto',
//             odds: array.toString(),
//             dates: dates
//         });

//     }, 300000)

// }
    
// getSoftLottoOdds()
         

//Error handling
app.use( (err, req, res, next) => {
    const error = new Error(err.message);
    error.status = 401;
    next(error);
});

app.use((error, req, res, next) => {
    if(error.message == "Unauthorized from server")
    {
        return res.status(401).json(
            helpers.sendError("Email does not exist")
        );
    }
    
    res.status(error.status || 500);
    res.json({
        error: {
            status: "ERROR",
            message: error.message
        }
    })
})

// Error Handling middleware
app.use((err, req, res, next) => {
    let errCode, errMessage
  
    if (err.errors) {
      // mongoose validation error
      errCode = 400 // bad request
      const keys = Object.keys(err.errors)
      // report the first validation error
      errMessage = err.errors[keys[0]].message
    } else {
      // generic or custom error
      errCode = err.status || 500
      errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('txt')
      .send(errMessage)
})

//Landing Page
app.use('/', function(req, res, next){
    res.status(200).json({ suceess: true });
    // console.log(game.up.arguments)
});

const PORT = process.env.PORT || 3014;

http.listen(PORT, err => {
    if (err) {
        throw err;
    } else {
        console.log('Server running on port: '+PORT);
    }
});