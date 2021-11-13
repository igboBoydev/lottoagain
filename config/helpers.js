const request = require('request');
const db  = require('../database/db');
const axios = require('axios');
const JSEncrypt = require('node-jsencrypt');
require('dotenv').config();

const sendError = message => {
    var error = {
        "error": {
            "status": "ERROR",
            "message": message
        }
    }

    return error;
}

const sendSuccess = message => {
    var success = {
        "success": {
            "status": "SUCCESS",
            "message": message
        }
    }

    return success;
}

const sendSms = async function (mobile, message){

    var sender = "N-Alert"; // or Lotgrand
    var live_key = "TLRC23xSoBslkto91dEuOASTKbjMVb1IWIkw5WSpk4FDTPQaO4ccWfzU6rygFP";
    var url = "https://termii.com/sapp/sms/api";
    
    var data = {
        "to": mobile,
        "from":sender,
        "sms": message,
        "type":"plain",
        "api_key":live_key,
        "channel":"generic"
    };

    var options = {
        'method': 'POST',
        'url': 'https://termii.com/api/sms/send',
        'headers': {
            'Content-Type': ['application/json']
        },
        
        body: JSON.stringify(data)
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        //console.log(response.body);
        return response.body;
    });
}

const checkUserPhone = async function checkUserMobile(req, res) {
    return await db.User.findOne({ 
        where: {
        mobile: req.body.mobile }
    });
}

const checkUserEmail = async function createUserMail(req) {
    return await db.User.findOne({ 
        where: {
        email: req.body.email }
    });
}

const checkUserToken = async function checkToken(token) {
    return await db.Oauth.findOne({ 
        where: {
        token: token }
    });
}

const checkUserTransaction = async function checkTransaction(reference) {
    return await db.Transaction.findOne({ 
        where: {
        reference: reference }
    });
}

const checkInterswitchTransaction = async function checkInterswitchTransaction(paymentlogid, paymentreference) {
    return await db.InterswitchNotification.findOne({ 
        where: {
        paymentlogid: paymentlogid,
        paymentreference: paymentreference
    }
    });
}

const insertInterswitchData = async function saveInterswitch(db_data) {
    return await db.InterswitchNotification.create({
        serviceurl: db_data.serviceurl[0],
        paymentlogid: db_data.payments[0].payment[0].paymentlogid[0],
        custreference: db_data.payments[0].payment[0].custreference[0],
        alternatecustreference: db_data.payments[0].payment[0].alternatecustreference[0],
        amount: db_data.payments[0].payment[0].amount[0],
        paymentmethod: db_data.payments[0].payment[0].paymentmethod[0],
        paymentreference: db_data.payments[0].payment[0].paymentreference[0],
        terminalid: db_data.payments[0].payment[0].terminalid[0],
        channelname: db_data.payments[0].payment[0].channelname[0],
        location: db_data.payments[0].payment[0].location[0],
        paymentdate: db_data.payments[0].payment[0].paymentdate[0],
        institutionid: db_data.payments[0].payment[0].institutionid[0],
        institutionname: db_data.payments[0].payment[0].institutionname[0],
        branchname: db_data.payments[0].payment[0].branchname[0],
        bankname: db_data.payments[0].payment[0].bankname[0],
        customername: db_data.payments[0].payment[0].customername[0],
        othercustomerinfo: db_data.payments[0].payment[0].othercustomerinfo[0],
        receiptno: db_data.payments[0].payment[0].receiptno[0],
        collectionsaccount: db_data.payments[0].payment[0].collectionsaccount[0],
        bankcode: db_data.payments[0].payment[0].bankcode[0],
        customeraddress: db_data.payments[0].payment[0].customeraddress[0],
        customerphonenumber: db_data.payments[0].payment[0].customerphonenumber[0],
        depositorname: db_data.payments[0].payment[0].depositorname[0],
        depositslipnumber: db_data.payments[0].payment[0].depositslipnumber[0],
        paymentcurrency: db_data.payments[0].payment[0].paymentcurrency[0],
        itemname: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].itemname[0],
        itemcode: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].itemcode[0],
        itemamount: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].itemamount[0],
        leadbankcode: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].leadbankcode[0],
        leadbankcbncode: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].leadbankcbncode[0],
        leadbankname: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].leadbankname[0],
        categorycode: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].categorycode[0],
        categoryname: db_data.payments[0].payment[0].paymentitems[0].paymentitem[0].categoryname[0],
        productgroupcode: db_data.payments[0].payment[0].productgroupcode[0],
        paymentstatus: db_data.payments[0].payment[0].paymentstatus[0],
        isreversal: db_data.payments[0].payment[0].isreversal[0],
        settlementdate: db_data.payments[0].payment[0].settlementdate[0],
        feename: db_data.payments[0].payment[0].feename[0],
        thirdpartycode: db_data.payments[0].payment[0].thirdpartycode[0],
        originalpaymentlogid: db_data.payments[0].payment[0].originalpaymentlogid[0],
        originalpaymentreference: db_data.payments[0].payment[0].originalpaymentreference[0],
        teller: db_data.payments[0].payment[0].teller[0],
    });
}

const generateOTP = async function generateOTP()
{
    return Math.floor(100000 + Math.random() * 900000);
    //return seq = (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
}

const timestamp = async  => {
    return Date.now()/1000 | 0;
}

const logActivity = async (user, msg) => {
    await db.AuditLog.create({  
        user_id: user.id,
        description: msg,
        type: "user"
    });
}

const authCheck = async function generateOTP(req) {
    if(req.user)
    {
        return true;
    }

    return false;
}

function generateString(length)
{
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function generateClientId(length)
{
   var result           = '';
   var characters       = '123456789123456789123456789';
   var charactersLength = characters.length;

   for ( var i = 0; i < length; i++ ) 
   {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}
    
function calculateOdd(stakeList)
{
    var odd = 1;

    stakeList.forEach(data => {
        //console.log(data);
        odd = odd * data.Factor;
    });

    return odd;
}

function xmlParser(paymentLogId, status, message)
{
    let obj = {
        'PaymentNotificationResponse': {
          'Payments': {
            'Payment': {
              'PaymentLogId': paymentLogId,
              'Status': status,
              'StatusMessage':message
            }
          }
        }
    };

    const xml2js = require('xml2js');
    var builder = new xml2js.Builder({renderOpts: { 'pretty': true, 'indent': ' ', 'newline': '\n', allowEmpty: true }});
    var xml = builder.buildObject(obj);
    return xml;
}

function nameCheck(names, bankname)
{
    var num = 0;

    for (const element of bankname) 
    {
        //var value = element.replace(/\s/g, '');
        var value = element.trim();
        value = value.replace(",", '');
        
        if(names.includes(value)) {
            num = num + 1;
        }
    }

    return num;
}

function jsEncrypt(data, key)
{
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    var encrypted = jsEncrypt.encrypt(data);
    return encrypted;
}

function factorial(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
}

function perm2(n)
{
    return ((n * n) - n ) / 2;
}

function perm3(n)
{
    return (factorial(n) / factorial(n - 3)) / 6;
}

function perm4(n)
{
    return (factorial(n) / factorial(n - 4)) / 24;
}

function perm5(n)
{
    return (factorial(n) / factorial(n - 5)) / 120;
}

module.exports = {
    authCheck,
    sendError, 
    sendSms, 
    sendSuccess,
    checkUserEmail,
    checkUserPhone, 
    checkUserToken, 
    generateOTP,
    checkUserTransaction,
    timestamp,
    generateString,
    generateClientId,
    calculateOdd,
    xmlParser,
    insertInterswitchData,
    checkInterswitchTransaction,
    nameCheck,
    jsEncrypt,
    factorial,
    perm2,
    perm3,
    perm4,
    perm5
};