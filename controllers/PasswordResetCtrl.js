const db = require('../database/db');
const helpers = require('../config/helpers');
const sendpassword = require('../mailer/sendPasswordReset');
const bcrypt =  require('bcryptjs');
var uuid = require('node-uuid');
const Joi = require('joi');

const resetPasswordSchema = Joi.object().keys({
    email: Joi.string().min(5).required()
}).unknown();


const validateTokenschema = Joi.object().keys({
    token: Joi.string().min(5).required()
}).unknown();

const updatePasswordSchema = Joi.object().keys({
    password: Joi.string().min(5).required(),
    token: Joi.string().min(3).required()
}).unknown();

module.exports = {
    ResetPassword: async (req, res, next) => {

        const validate = Joi.validate(req.body, resetPasswordSchema)

        if(validate.error != null)
        {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            return res.status(400).json(
                helpers.sendError(errorMessage)
            );
        }

        var user = await helpers.checkUserEmail(req);

        if(user)
        {
            await db.PasswordReset.destroy({ 
                where: {
                user_id: user.id 
            }});
                
            var token = uuid();

            const message = {
                firstname: user.firstname,
                email: user.email,
                code: token
            };

            const reset = await db.PasswordReset.create({
                user_id: user.id,
                token: token,
            });
        
            sendpassword.sendPasswordMail(message);

            return res.status(200).json(
                helpers.sendSuccess("Kindly check your email for reset link!")
            );
        }

        return res.status(400).json(
            helpers.sendError("Email was not found!")
        );
    },

    validateToken: async (req, res, next) => {

        const validate = Joi.validate(req.body, validateTokenschema)

        if(validate.error != null)
        {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            return res.status(400).json(
                helpers.sendError(errorMessage)
            );
        }

        var token = req.body.token;
        var check = await db.PasswordReset.findOne({ where: { token: token }});

        if(check)
        {
            if(check.used == 1)
            {
                return res.status(400).json(
                    helpers.sendError("Password Token has been used")
                );
            }

            return res.status(200).json(
                helpers.sendSuccess("Valid Token")
            );
        }

        return res.status(400).json(
            helpers.sendError("Password Token has expired")
        );

    },

    updatePassword: async (req, res, next) => {
        
        const validate = Joi.validate(req.body, updatePasswordSchema)

        if(validate.error != null)
        {
            const errorMessage = validate.error.details.map(i => i.message).join('.');
            return res.status(400).json(
                helpers.sendError(errorMessage)
            );
        }

        var getUser = await db.PasswordReset.findOne({ where: { token: req.body.token }});

        if(getUser)
        {
            var user = await db.User.findOne({ where: { id: getUser.user_id }});
            user.password = bcrypt.hashSync(req.body.password);
            await user.save();

            getUser.used = 1;
            await getUser.save();

            return res.status(200).json(
                helpers.sendSuccess("Password updated successfully!")
            );
        }

        return res.status(400).json(
            helpers.sendError("Password Token has expired")
        );

    },

}