const express = require('express');

const router = express.Router();

const {getClientSecret, connectionToken,retrieveBalance, getPaymentIntent } = require('../controllers/stripe');

//@route    POST /api/stripe/create-
//@desc     Get client secret from stripe
//@access   Public

router.post('/create_payment_intent', getClientSecret);

router.post('/connection_token', connectionToken)

router.get("/retrieve-balance", retrieveBalance);


router.get("/retrieve", getPaymentIntent);

module.exports = router