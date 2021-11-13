const db  = require('../database/db');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const Joi = require('joi');
const helpers = require('../config/helpers');

const dataSchema = Joi.object().keys({
    data: Joi.string().min(5).required()
});

module.exports = {

    decode: async (req, res, next) => {

        const result = Joi.validate(req.body, dataSchema);

        if(result.error != null)
        {
            return res.status(400).json(
                helpers.sendError("Data field is required")
            );
        }

        var token = req.body.data;

        try
        {
            var decoded = jwt_decode(token);
            delete decoded.iat;
            return res.status(200).json(
               decoded
            );
        }
        catch(e)
        {
            return res.status(400).json(
                helpers.sendError(e.message)
            );
        }
    },

    encode: async (req, res, next) => {

        var body = req.body;
        var signed = jwt.sign(body,process.env.SECRET);
        return res.status(200).json(
            {"data": signed}
         );
    }

}