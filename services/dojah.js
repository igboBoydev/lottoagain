var axios = require('axios');
//const { sendSms } = require('../../firstbet-admin/config/helpers');

var app_id = '60b23de283547300332228f6';
var auth = 'test_sk_DlzKdyZ6xHZLsA0WoS8fviJiC'
var sms_url = 'https://sandbox.dojah.io/api/v1/messaging/sms';
var voice_url = 'https://sandbox.dojah.io/api/v1/messaging/otp';
var validate_url = 'https://sandbox.dojah.io/api/v1/messaging/otp/validate/';

const sendVoice = async function(mobile) {
  
    var data = JSON.stringify({
        "channel": "voice",
        "priority": false,
        "destination": mobile, //"2348023900500",
        "sender_id": "Dojah"
    });

    var config = {
    method: 'post',
    url: voice_url,
    headers: { 
        'Authorization': auth, 
        'AppId': app_id, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    return axios(config);

    // await axios(config)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     return response.data;
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     return error;
    // });
}

const sendSms = async function(mobile, message) {
  
    var data = JSON.stringify({
        "priority": false,
        "channel": "sms",
        "message": message,
        "destination": mobile, //"2348023900500",
        "sender_id": "Dojah"
    });

    var config = {
    method: 'post',
    url: sms_url,
    headers: { 
        'Authorization': auth, 
        'AppId': app_id, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    return axios(config);

    // await axios(config)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     return response.data;
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     //return error;
    // });
}

const sendWhatsapp = async function(mobile, message) {
  
    var data = JSON.stringify({
        "priority": false,
        "channel": "whatsapp",
        "message": message,
        "destination": mobile, //"2348023900500",
        "sender_id": "Dojah"
    });

    var config = {
    method: 'post',
    url: sms_url,
    headers: { 
        'Authorization': auth, 
        'AppId': app_id, 
        'Content-Type': 'application/json'
    },
    data : data
    };

    return axios(config);

    // await axios(config)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     return response.data;
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     //return error;
    // });
}

const validateOTP = async function(code, reference_id) {
  
    // validate_url = validate_url + "?code=" + code + "&reference_id=" + reference_id;
    validate_url = `${validate_url}?code=${code}&reference_id=${reference_id}`;

    var config = {
    method: 'get',
    url: validate_url,
    headers: { 
        'Authorization': auth, 
        'AppId': app_id, 
        'Content-Type': 'application/json'
    },
    data : {}
    };

    return axios(config);

    // await axios(config)
    // .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //     return response.data;
    // })
    // .catch(function (error) {
    //     console.log(error);
    //     return error;
    // });
}

module.exports = {
    sendVoice,
    sendSms,
    sendWhatsapp,
    validateOTP
}