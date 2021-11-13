const Sequelize = require('sequelize')

let LottoExpressOdds = (sequelize, type) => {
    return sequelize.define('LottoExpressOdds', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        admin_id: Sequelize.STRING,
        odd: Sequelize.STRING,
    })
}

module.exports = LottoExpressOdds





















// #!/usr/bin/env nodejs
// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });

// // const session = require('express-session')
// // var MySQLStore = require('express-mysql-session')(session)
// // const mysql = require('mysql2/promise')
// const helpers = require('./config/helpers');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const morgan = require('morgan');
// const cors = require('cors');
// const passport = require('passport');
// //const jwt_decode = require('jwt-decode');
// const helmet = require('helmet');
// const compression = require('compression');
// const xmlparser = require('express-xml-bodyparser');
// const db = require('./database/db');

// //import all games
// let game = require('./seeders/202106292222-lottos')

// //Load Environment Variables
// require('dotenv').config();
// //Connect to DataBase
// require('./database/db');

// // set security HTTP headers
// app.use(helmet());

// //sanitize request data
// //app.use(xss());

// //gzip compression
// app.use(compression());

// //Cross origin fix
// app.use(cors());
// //app.options('*', 'cors');

// // Logger
// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }));

// //Parses requests body
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// //Initialise Passport
// app.use(passport.initialize());
// //app.use(passport.session());

// //Configure socket global
// app.use(function (req, res, next){
//     req.io = io;
//     next();
// });

// //Cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );

//     if(req.method == "OPTIONS")
//     {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
//         return res.status(200).json({});
//     }

//     next();
// })

// // const sessionConfig = {
// //     name: 'session',
// //     secret: process.env.SESSION_SECRET,
// //     resave: false,
// //     saveUninitialized: false,
// //     cookie: {
// //         httpOnly: true,
// //         expires: Date.now() + 1000 * 60 * 60 * 7,
// //         maxAge: 1000 * 60 * 60 * 24 * 7
// //     }

// // }

// // let sessionConnection = mysql.createConnection(db)

// // let sessionStore = new MySQLStore({
// //     expiration: 10800000,
// //     createDatabaseTable: true,
// //     schema: {
// //         tableName: 'session',
// //         columnNames: {
// //             session_id: 'session_id',
// //             expires: 'expires',
// //             data: 'data'
// //         }
// //     }
// // }, sessionConnection)

// // app.use(session({
// //     key: 'keyin',
// //     secret: process.env.SESSION_SECRET,
// //     store: sessionStore,
// //     resave: false,
// //     saveUninitialized: false
// // }))

// //include route module
// const publicRoute = require('./routes/public');
// const authRoute = require('./routes/auth');

// //App Routes
// app.use('/api/v1/', publicRoute);
// app.use('/api/v2/auth/', authRoute);


// let arr = []

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

//     }, 1800000)

// }
    
// getResult()


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

//         await db.Gameresults.create({
//             name: 'soft Lotto',
//             odds: array.toString(),
//             dates: dates
//         });

//     }, 300000)

// }
    
// getSoftLottoOdds()

         

// //Error handling
// app.use( (err, req, res, next) => {
//     const error = new Error(err.message);
//     error.status = 401;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     if(error.message == "Unauthorized from server")
//     {
//         return res.status(401).json(
//             helpers.sendError("Email does not exist")
//         );
//     }
    
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             status: "ERROR",
//             message: error.message
//         }
//     })
// })

// // Error Handling middleware
// app.use((err, req, res, next) => {
//     let errCode, errMessage
  
//     if (err.errors) {
//       // mongoose validation error
//       errCode = 400 // bad request
//       const keys = Object.keys(err.errors)
//       // report the first validation error
//       errMessage = err.errors[keys[0]].message
//     } else {
//       // generic or custom error
//       errCode = err.status || 500
//       errMessage = err.message || 'Internal Server Error'
//     }
//     res.status(errCode).type('txt')
//       .send(errMessage)
// })

// //Landing Page
// app.use('/', function(req, res, next){
//     res.status(200).json({ suceess: true });
//     console.log(game.up.arguments)
// });

// const PORT = process.env.PORT || 3014;

// http.listen(PORT, err => {
//     if (err) {
//         throw err;
//     } else {
//         console.log('Server running on port: '+PORT);
//     }
// });



//package.json
// {
//   "name": "nodejs",
//   "version": "1.0.0",
//   "description": "NodeJs Restful API for Grandlotto",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "nodemon lotto.js",
//     "migrate": "npx sequelize db:migrate",
//     "seed": "npx sequelize db:seed:all"
//   },
//   "author": "Babafemi Ajobiewe",
//   "license": "ISC",
//   "dependencies": {
//     "aws-sdk": "^2.596.0",
//     "axios": "^0.21.1",
//     "bcryptjs": "^2.4.3",
//     "body-parser": "^1.19.0",
//     "compression": "^1.7.4",
//     "cors": "^2.8.5",
//     "crypto-js": "^4.0.0",
//     "dotenv": "^8.2.0",
//     "express": "^4.17.1",
//     "express-ip": "^1.0.4",
//     "express-rate-limit": "^5.2.3",
//     "express-xml-bodyparser": "^0.3.0",
//     "flutterwave-node-v3": "^1.0.6",
//     "fs": "0.0.1-security",
//     "handlebars": "^4.7.6",
//     "helmet": "^4.3.1",
//     "http-errors": "^1.8.0",
//     "joi": "^14.3.1",
//     "jsonwebtoken": "^8.5.1",
//     "jwt-decode": "^3.1.2",
//     "moment": "^2.29.1",
//     "morgan": "^1.9.1",
//     "multer": "^1.4.2",
//     "mysql2": "^2.0.2",
//     "node-cron": "^2.0.3",
//     "node-jsencrypt": "^1.0.0",
//     "node-uuid": "^1.4.8",
//     "nodemailer": "^6.4.17",
//     "nodemailer-express-handlebars": "^4.0.0",
//     "paginate-info": "^1.0.4",
//     "passport": "^0.4.1",
//     "passport-jwt": "^4.0.0",
//     "passport-local": "^1.0.0",
//     "path": "^0.12.7",
//     "paystack": "^2.0.1",
//     "request": "^2.88.0",
//     "sequelize": "^5.21.3",
//     "socket.io": "^3.0.5",
//     "xml-js": "^1.6.11",
//     "xml2js": "^0.4.23",
//     "xss": "^1.0.8"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.2",
//     "sequelize-cli": "^6.2.0"
//   }
// }




 

