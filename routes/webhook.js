const express = require('express');
const router = express.Router();

//import controller
var WebHook = require('../controllers/WebHook');
var DebitByBatch = require('../controllers/DebitByBatch');

//webhook route
//router.post('/flutterwave-node/webhook', WebHook.verifyFlutterwave);
//router.post('/paystack-node/webhook',  WebHook.verifyPaystack);

router.post('/digitain/DebitByBatch', DebitByBatch.debitByBatch);

module.exports = router;