
const mongoose = require('mongoose');
const SubcriptionDetailModel = require('./subscriptionDetail_model');

const callBackLogSchema = new mongoose.Schema({
    subDetailID: { type: mongoose.Schema.Types.ObjectId, ref: 'SubcriptionDetailModel' },
    data: Object,
    status: String, //Recieved Or Error or Approved or Rejected
    message: String
},
{
    timestamps:true
});

const CallbackLogModel = mongoose.model("callbacklog", callBackLogSchema);

module.exports  = CallbackLogModel;