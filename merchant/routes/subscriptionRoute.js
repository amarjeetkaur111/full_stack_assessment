
const express = require('express');
const router = express.Router();
const {getPartners, getPartnerServices, insertPartneService , subscribe, subscriptionCallback, checkUserSubscription} = require('../controllers/subscriptionController');


router.get('/', getPartners);
router.get('/services/:partnerId', getPartnerServices);
router.post('/services/add', insertPartneService);

//Route to subscribe || Unsubscribe
router.post('/services/subscribe', subscribe);
router.post('/services/callback', subscriptionCallback);

//Router to check if user subscribed to a service
router.get('/services/checkUserSubsciption/:userId/:serviceId', checkUserSubscription);


module.exports = router;
