
const mongoose = require('mongoose');
const partnerModel = require('../models/partner_model');


const ServiceSchema = new mongoose.Schema({
    partnerId:{ type: mongoose.Schema.Types.ObjectId, ref: 'partnerModel' },
    name:{type: String, required: true, minlength: 3} //Service Name
});

const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports  = ServiceModel;