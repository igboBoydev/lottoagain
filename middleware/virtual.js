const db = require('../database/db');
const jwt_decode = require('jwt-decode');
const Joi = require('joi');
const helpers = require('../config/helpers');
const site_id = 108672;

const schema = Joi.object().keys({
    data: Joi.string().min(5).required()
});

Date.prototype.addHours = function(h){
    this.setHours(this.getHours() + h);
    return this;
}

function errorResponse(code, msg)
{
   var res =  {
        "status": false,
        "code": code,
        "message": msg
    };

    return res;
}

const middleWare = async (req,res,next) =>{

    if(req.body.siteId != site_id)
    {
        return res.status(200).json(errorResponse(113, "Incorrect parameters for a player session."));
    }

    if(req.body.hasOwnProperty('currency'))
    {
        if(req.body.currency != "NGN")
        {
            return res.status(200).json(errorResponse(113, "Incorrect parameters for a player session."));
        }
    }

    // if(req.body.action != "login")
    // {
    //     var virtual = await db.VirtualGame.findOne({ where: { uuid: req.body.sessionId, active: 1 }});
    //     current = new Date().addHours(1);
    //     expire = new Date(virtual.expire_at);

    //     if($expire < $current)
    //     {
    //         return res.status(200).json(errorResponse(106, "Invalid secure token"));
    //     }
    // }

    next();
    
}

module.exports = {middleWare};