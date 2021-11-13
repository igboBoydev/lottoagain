const db = require('../database/db');
const helpers = require('../config/helpers');
const sendotp = require('../mailer/sendotp');
const bcrypt = require('bcryptjs');
var uuid = require('node-uuid');
const Joi = require('joi');
const dojah = require('../services/dojah');

const signToken = (user, token) => {

  var token = jwt.sign({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    mobile: user.mobile,
    balance: parseFloat(user.wallet) + parseFloat(user.withdrawable) + parseInt(1000),
    wallet: parseFloat(user.wallet) + parseInt(1000)
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

Register: async (req, res, next) => {

  const schema = Joi.object().keys({
    email: Joi.string().min(5).required(),
    mobile: Joi.string().min(3).required(),
    password: Joi.string().required()
  }).unknown();
  
  const validate = Joi.validate(req.body, schema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var checkEmail = await helpers.checkUserEmail(req);

  if (checkEmail) {
    return res.status(400).json(
      helpers.sendError("Email already in use!")
    );
  }

  var checkPhone = await helpers.checkUserPhone(req);

  if (checkPhone) {
    return res.status(400).json(
      helpers.sendError("Phone number has already been used!")
    );
  }

  var code = await helpers.generateOTP();
  var customer_id =  helpers.generateClientId(10);

  const createUser = await db.User.create({
    mobile: req.body.mobile,
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password),
    uuid: uuid(),
    otp: code,
    customer_id: customer_id
  });

  if (createUser) {

    const message = {
      email: req.body.email.toLowerCase(),
      code: code
    };

    try {
      //dispatch email
      sendotp.sendMail(message);

      var msg =`Please use the OTP ${code}.`;
      //dispatch sms
      //helpers.sendSms(req.body.mobile, msg);
      await dojah.sendSms(req.body.mobile, msg)

      var msg =`Hello. Thank you for registering on Grandlotto. Kindly use OTP code: ${code} to complete your registration`;
      //Send whatsapp
      whatsapp.post(req.body.mobile, msg);
    }
    catch (e) 
    {

    }

    return res.status(200).json(
      helpers.sendSuccess("Account created successfully")
    );
  }
  else 
  {
    res.status(400).json(
      helpers.sendError("Error ocurred!")
    )
  }
},

validateOTP: async (req, res, next) => {

  const validateOTPschema = Joi.object().keys({
    otp: Joi.string().min(4).required(),
    mobile: Joi.string().min(5).required()
  }).unknown();

  const validate = Joi.validate(req.body, validateOTPschema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var user = await db.User.findOne({ where: { mobile: req.body.mobile } });

  if(!user)
  {
    return res.status(400).json(helpers.sendError("Invalid OTP"));
  }

  if(user.activated == 1)
  {
    return res.status(400).json(helpers.sendError("Account has been validated already!"));
  }

  if(Number(user.voice) == 1)
  {
    try{
      const response = await dojah.validateOTP(req.body.otp, user.reference_id);
  
      if(response.data.entity.valid)
      {
        user.activated = 1;
        await user.save();

        // var rand = uuid();
        // var virtual = await db.VirtualGame.findOne({ where: { user_id: user.id }});

        // if(virtual)
        // {
        //   virtual.token = rand;
        //   virtual.save();
        // }

        const token = signToken(user);

        return res.status(200).json({
          success: {
            status: "SUCCESS",
            message: "Account activated successfully",
            token: token
          }
        });
        
      }
      
      return res.status(400).json(helpers.sendError("Invalid OTP"));
  
    }
    catch (e) 
    {
      return res.status(400).json(helpers.sendError("Your request was not processed. Kindly try again."));
    }
  }
  else
  {
    if(user.otp == req.body.otp)
    {
      user.activated = 1;
      await user.save();
      return res.status(200).json(helpers.sendSuccess("Account activated successfully"));
    }

    return res.status(400).json(helpers.sendError("Invalid OTP"));
  }

},

resendOTPVoice: async (req, res, next) => {

  const validateOTPschema = Joi.object().keys({
    mobile: Joi.string().min(5).required()
  }).unknown();

  const validate = Joi.validate(req.body, validateOTPschema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var mobile = req.body.mobile;
  var user = await db.User.findOne({ where: { mobile: mobile }});

  if(!user)
  {
    return res.status(400).json(helpers.sendError("Account associated to phone number was not found!"));
  }

  if(user.voice == 1)
  {
    return res.status(400).json(helpers.sendError("Voice Call has been sent already"));
  }

  try {
    const result = await dojah.sendVoice(mobile);
    //console.log(result.data);
    user.reference_id = result.data.entity[0].reference_id;
    user.voice = 1;
    await user.save();
    return res.status(200).json(helpers.sendSuccess("OTP sent successfully"));
  }
  catch (e) 
  {
    return res.status(400).json(helpers.sendError("An error occurred while processing your request. Kindly try again."));
  }

},

resendOTPWhatsApp: async (req, res, next) => {

  const validateOTPschema = Joi.object().keys({
    mobile: Joi.string().min(5).required()
  }).unknown();

  const validate = Joi.validate(req.body, validateOTPschema)

  if (validate.error != null) {
    const errorMessage = validate.error.details.map(i => i.message).join('.');
    return res.status(400).json(
      helpers.sendError(errorMessage)
    );
  }

  var mobile = req.body.mobile;
  var user = await db.User.findOne({ where: { mobile: mobile }});

  if(!user)
  {
    return res.status(400).json(helpers.sendError("Account associated to phone number was not found!"));
  }

  try{
    var code = await helpers.generateOTP();
    user.otp = code;
    user.voice = 0;
    await user.save();

    var msg =`Hello. Thank you for registering on Grandlotto. Kindly use OTP code: ${code} to complete your registration`;
    //Send whatsapp
    //whatsapp.post(req.body.mobile, msg);
    await dojah.sendWhatsapp(mobile, msg);
    return res.status(200).json(helpers.sendSuccess("OTP sent successfully"));
  }
  catch (e) 
  {
    return res.status(400).json(helpers.sendError("Your request was not processed. Kindly try again."));
  }

} 

}