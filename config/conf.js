require('dotenv').config();

module.exports = {
    'config': {
        'key': process.env.AWS_SES_ACCESS_KEY_ID,
        'secret': process.env.AWS_SES_SECRET_ACCESS_KEY
    },
    'virtual': {
        'sandbox':{
            'base_url': 'https://lotgrand-api.staging-hub.xpressgaming.net/api/v3',
            'private_key': 'CQ9OAIB6JUHX5734T2GR',
            'site_id': 108672
        },
        'production': {
            'base_url': 'https://lotgrand-api.staging-hub.xpressgaming.net/api/v3',
            'private_key': 'CQ9OAIB6JUHX5734T2GR',
            'site_id': 108672
        }
    },

};