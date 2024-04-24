
const mongoose = require('mongoose');
const serviceModel = require('./sevice_model');

const SubcriptionSchema = new mongoose.Schema({
    userId: Number,
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'serviceModel' },
    currentStatus: String //Pending Or Subscribe or Unsubscribe
});

const SubscriptionModel = mongoose.model("subscription", SubcriptionSchema);

module.exports  = SubscriptionModel;