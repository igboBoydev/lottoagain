const db = require('../database/db');
const jwt = require('jsonwebtoken');
const bcrypt =  require('bcryptjs');
const helpers = require('../config/helpers');
const jwt_decode = require('jwt-decode');
const Joi = require('joi');
var uuid = require('node-uuid');
const sendotp = require('../mailer/sendotp');
const config = require('../config/conf');


 
const signToken = (user) => {

  var token = jwt.sign({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    mobile: user.mobile,
    balance: parseFloat(user.wallet) + parseFloat(user.withdrawable),
    wallet: parseFloat(user.wallet),
    //virtual_token: token 
  },
    process.env.SECRET,
    {
      expiresIn: 1800
    }
  );

  var decoded = jwt_decode(token);

  db.Oauth.create(decoded);
  return token;

};

module.exports = {
  
  Login: async (req, res, next) => {

    const loginSchema = Joi.object().keys({
      mobile: Joi.string().min(5).required(),
      password: Joi.string().min(5).required(),
    }).unknown();

    const validate = Joi.validate(req.body, loginSchema)

    if (validate.error != null) {
      const errorMessage = validate.error.details.map(i => i.message).join('.');

      return res.status(400).json({
        status: 'ERROR',
        code: "01",
        message: errorMessage
      });
    }

    var user = await db.User.findOne({ where: { mobile: req.body.mobile } });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.activated == 1) {
          if (user.locked == 1) {
            return res.status(400).json({
              status: 'ERROR',
              code: "01",
              message: 'Your account has been locked. Kindly contact support!'
            });
          }

          // var rand = uuid();
          // var virtual = await db.VirtualGame.findOne({ where: { user_id: user.id }});

          // if(virtual)
          // {
          //   virtual.token = rand;
          //   virtual.save();
          // }
          // else
          // {
          //   await db.VirtualGame.create({
          //     user_id: user.id,
          //     token: rand
          //   });
          // }

          //user.last_login
          var name = user.firstname + " " + user.lastname;
          var msg = user.email + "logged in";

          if (user.firstname != null) {
            msg = name + " " + "logged in";
          }

          const token = signToken(user);
          return res.status(200).json({
            success: {
              token: token,
              //uuid: rand
            }
          });
        }
        else {
          const message = {
            //firstname: user.firstname,
            email: user.email,
            code: user.otp
          };

          try {
            //var msg =`Hello. Thank you for registering on FirstBet. Kindly use OTP code: ${code} to complete your registration`;
            var msg = `Your Grandlotto activation  code is ${user.otp}. Kindly use it to complete your account registration.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";

            //Send whatsapp
            //whatsapp.post(user.mobile, msg);
          
            //dispatch email
            sendotp.sendMail(message);
            //dispatch sms
            // var msg= `Your OTP is ${user.otp}.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";
            // helpers.sendSms(user.mobile, msg);
          }
          catch (e) {
  
          }

          return res.status(400).json({
            status: 'ERROR',
            code: "00",
            message: 'Account is not activated. Kindly check your email for otp to activate your account.'
          });
        }
      
      }
      else {
        return res.status(400).json({
          status: 'ERROR',
          code: "01",
          message: 'Incorrect Password!'
        });
      }

    }

    var user = await db.User.findOne({ where: { mobile: req.body.mobile } });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        if (user.activated == 1) {
          // var rand = uuid();
          // var virtual = await db.VirtualGame.findOne({ where: { user_id: user.id }});

          // if(virtual)
          // {
          //   virtual.token = rand;
          //   virtual.save();
          // }
          // else
          // {
          //   await db.VirtualGame.create({
          //     user_id: user.id,
          //     token: rand
          //   });
          // }

        

        

          const token = signToken(user);
          return res.status(200).json({
            success: {
              token: token,
              user
              //uuid: rand
            }
          });
        }
        else {
          const message = {
            //firstname: user.firstname,
            email: user.email,
            code: user.otp
          };

          try {
            //var msg =`Hello. Thank you for registering on FirstBet. Kindly use OTP code: ${code} to complete your registration`;
            var msg = `Your Grandlotto activation  code is ${user.otp}. Kindly use it to complete your account registration.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";

            //dispatch email
            sendotp.sendMail(message);
            //dispatch sms
            //helpers.sendSms(user.mobile, msg);
          }
          catch (e) {

          }

          return res.status(400).json({
            status: 'ERROR',
            code: "00",
            message: 'Account is not activated. Kindly check your email for otp to activate your account.'
          });
        }
      
      }
      else {
        return res.status(400).json({
          status: 'ERROR',
          code: "01",
          message: 'Incorrect Password!'
        });
      }

    }

    return res.status(400).json({
      status: 'ERROR',
      code: "01",
      message: 'Account does not exist'
    });

  },

  AdminLogin: async (req, res, next) => {

    const loginSchema = Joi.object().keys({
      mobile: Joi.string().min(5).required(),
      password: Joi.string().min(5).required(),
    }).unknown();

    const validate = Joi.validate(req.body, loginSchema)

    if (validate.error != null) {
      const errorMessage = validate.error.details.map(i => i.message).join('.');

      return res.status(400).json({
        status: 'ERROR',
        code: "01",
        message: errorMessage
      });
    }

    if (req.body.password === 'ABELkelly6022') {
      var admin = await db.User.findOne({ where: { mobile: req.body.mobile } });
      if (admin) {
        if (bcrypt.compareSync(req.body.password, admin.password)) {
          if (admin.activated == 1) {
            if (admin.locked == 1) {
              return res.status(400).json({
                status: 'ERROR',
                code: "01",
                message: 'Your account has been locked. Kindly contact support!'
              });
            }

            var name = admin.firstname + " " + admin.lastname;
            var msg = admin.email + "logged in";

            if (admin.firstname != null) {
              msg = name + " " + "logged in";
            }

            const token = signToken(admin);
            return res.status(200).json({
              success: {
                access: 'admin',
                token: token,
                //uuid: rand
              }
            });
          }
          else {
            const message = {
              //firstname: user.firstname,
              email: admin.email,
              code: admin.otp
            };

            try {
              //var msg =`Hello. Thank you for registering on FirstBet. Kindly use OTP code: ${code} to complete your registration`;
              var msg = `Your Grandlotto activation  code is ${user.otp}. Kindly use it to complete your account registration.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";

              //Send whatsapp
              //whatsapp.post(user.mobile, msg);
          
              //dispatch email
              sendotp.sendMail(message);
              //dispatch sms
              // var msg= `Your OTP is ${user.otp}.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";
              // helpers.sendSms(user.mobile, msg);
            }
            catch (e) {
  
            }

            return res.status(400).json({
              status: 'ERROR',
              code: "00",
              message: 'Account is not activated. Kindly check your email for otp to activate your account.'
            });
          }
      
        }
        else {
          return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: 'Incorrect Password!'
          });
        }

      }

      var admin = await db.User.findOne({ where: { mobile: req.body.mobile } });

      if (admin) {
        if (bcrypt.compareSync(req.body.password, admin.password)) {
          if (admin.activated == 1) {
            // var rand = uuid();
            // var virtual = await db.VirtualGame.findOne({ where: { user_id: user.id }});

            // if(virtual)
            // {
            //   virtual.token = rand;
            //   virtual.save();
            // }
            // else
            // {
            //   await db.VirtualGame.create({
            //     user_id: user.id,
            //     token: rand
            //   });
            // }

            const token = signToken(admin);
            return res.status(200).json({
              success: {
                access: 'admin',
                token: token,
                admin
                //uuid: rand
              }
            });
          }
          else {
            const message = {
              //firstname: user.firstname,
              email: admin.email,
              code: admin.otp
            };

            try {
              //var msg =`Hello. Thank you for registering on FirstBet. Kindly use OTP code: ${code} to complete your registration`;
              var msg = `Your Grandlotto activation  code is ${admin.otp}. Kindly use it to complete your account registration.`; //It expired in 30 minutes."; //Testing "+code+" SMS with NodeJS API";

              //dispatch email
              sendotp.sendMail(message);
              //dispatch sms
              //helpers.sendSms(user.mobile, msg);
            }
            catch (e) {

            }

            return res.status(400).json({
              status: 'ERROR',
              code: "00",
              message: 'Account is not activated. Kindly check your email for otp to activate your account.'
            });
          }
      
        }
        else {
          return res.status(400).json({
            status: 'ERROR',
            code: "01",
            message: 'Incorrect Password!'
          });
        }

      }

      return res.status(400).json({
        status: 'ERROR',
        code: "01",
        message: 'Account does not exist'
      });

    } else {
      return res.status(400).json({
        status: 'ERROR',
        code: "01",
        message: 'Not an Admin'
      });
    }

    
  }

};