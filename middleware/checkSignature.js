const jwt_decode = require('jwt-decode');
const helpers = require('../config/helpers');
const Joi = require('joi');
var CryptoJS = require('crypto-js');

const signatureSigner = time  => {
    var sign = CryptoJS.enc.Utf8.parse(time);
    //var sign = time;
    var hash = CryptoJS.HmacSHA256(sign, process.env.SECRET);
    return hash.toString(CryptoJS.enc.Hex);
}

const signatureSignerMiddleware = (req,res,next) =>{

    const hasValue = req.headers.hasOwnProperty("signatures");

    if(!hasValue)
    {
        return res.status(400).json(
            helpers.sendError("Signatures header is required")
        );
    }

    var time1 = helpers.timestamp();
    var time2 = time1 + 1;

    //console.log(time1);

    var serverSignature1 = signatureSigner(time1);  //1
    var serverSignature2 = signatureSigner(time2);  //2
    var clientSignature = req.headers.signatures;   //2

    // console.log(serverSignature1)
    // console.log(serverSignature2)
    // console.log(clientSignature)

    if(!(serverSignature1 != clientSignature ||  serverSignature2 != clientSignature ))
    {
        return res.status(400).json(
            helpers.sendError("Request not signed")
        );
    }

    next();
}

module.exports = {signatureSignerMiddleware};