var axios = require('axios');
const config = require('../config/conf');

const get = async function (url, publickey) {

  var data = ''

  var option = {
    method: 'get',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${publickey}`,
      'Content-Type': 'application/json',
    },
    data: data
  };
 
  return axios(option)
}

const post = async function(url, param, publickey) {

    var data = JSON.stringify(param);

    var option = {
      method: 'post',
      url: url,
      headers: {
        'Accept': 'application/json', 
        'Authorization': `Bearer ${publickey}`, 
        'Content-Type': 'application/json',
       },
      data : data
    };
   
    return axios(option)
}

module.exports = {
    post,
    get
};
