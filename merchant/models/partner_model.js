
const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
    name:{type: String, required: true, minlength: 3}
});

const partnerModel = mongoose.model("Partner",PartnerSchema);

module.exports  = partnerModel;