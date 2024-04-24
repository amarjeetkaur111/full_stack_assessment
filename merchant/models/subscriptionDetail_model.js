
const mongoose = require('mongoose');
const SubscriptionModel = require('./subsciptions');

const SubcriptionDetailSchema = new mongoose.Schema({
    subscriptionID: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionModel' },
    type: String, // Subscribe Or Unsubscribe
    status: String, //Pending Or Approved or Rejected
},
{
    timestamps:true
});

const SubcriptionDetailModel = mongoose.model("subscriptionDetail", SubcriptionDetailSchema);

module.exports  = SubcriptionDetailModel;