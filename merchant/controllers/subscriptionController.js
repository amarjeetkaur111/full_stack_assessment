
const partnerModel = require('../models/partner_model');
const serviceModel = require('../models/sevice_model');
const subscriptionModel = require('../models/subsciptions');
const subDetailModel = require('../models/subscriptionDetail_model');
const callbackLogModel = require('../models/callbackLog_model');
const axios = require('axios');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { createToken, payloadOptions } = require('../jwt_auth');
const SubscriptionModel = require('../models/subsciptions');
const SubcriptionDetailModel = require('../models/subscriptionDetail_model');

const getPartners = async(req,res) => {
    try{
        const partners = await partnerModel.find({});
        if(!partners)
            return res.status(200).json({
                success:false,
                message: 'No Record Found'
            })
        res.status(200).json({
            success:true,
            message:'Records Found!',
            data: partners
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error while getting records : '+err
        })
    }
}

const insertPartneService = async(req,res) => {
    const {partnerId, name} = req.body;
    try{
        let service = new serviceModel({partnerId,name});
        await service.save()
                .then((data) => {res.status(200).json('Serice record added');})
                .catch((data) => {res.status(404).json('Something went wrong');});
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error while getting records : '+err
        })
    }
} 

const getPartnerServices = async(req,res) => {
    const partnerId = req.params.partnerId;
    try{
        const partner_services = await serviceModel.find({partnerId:partnerId});
        // return res.send(partner_services);
        if(!partner_services)
            return res.status(200).json({
                success:false,
                message: 'No Record Found'
            })
        res.status(200).json({
            success:true,
            message:'Records Found!',
            data: partner_services
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error while getting records : '+err
        })
    }
}

const saveLog = async(log) => {
    const newLog = new callbackLogModel(log);
    return await newLog.save();
}

const updateSubscriptionStatus = async(req,res) => {
 console.log('Req',req);
    const subDetailID = req.subDetailID;
    const type = req.data.type;
    const userId= req.data.userId;
    const serviceId = req.data.serviceId;
    const status = req.status;
    const message = req.message;

    const subDetail = await subDetailModel.findOneAndUpdate({_id: subDetailID},{$set: {status: status,message:message}},{upsert: false});
    await subDetail.save();
    const subscriptionId = subDetail.subscriptionID;

    //Update the status in subscription table
    let updatedStatus = 'Pending';
    if(status === 'Approved' )  updatedStatus = type;
    else if(type === 'subscribe') updatedStatus = 'unsubscribe';
    else if(type === 'unsubscribe') updatedStatus = 'subscribe';
    else updatedStatus = 'unsubscribe';

    const subscription = await subscriptionModel.findOneAndUpdate({_id: subscriptionId},{$set: {currentStatus: updatedStatus}},{upsert: false});
    return await subscription.save();
}

//User subscribe & Unsubscribe to service
const subscribe = async(req,res) => {
    const userId = req.body.userId;
    const serviceId = req.body.serviceId;
    const type = req.body.type;
    try{
        let subDetailID = '234';
        const existingSubscription = await subscriptionModel.findOne({userId:userId,serviceId:serviceId});
        if(existingSubscription)
        {
            if(existingSubscription.currentStatus == type || existingSubscription.currentStatus == 'Pending')
            {
                console.log(`In Existing block ${existingSubscription}`);
                return res.status(400).json({
                    success:false,
                    message: `Already applied to ${type}`
                });
            }

            const subDetail = new subDetailModel({subscriptionID:existingSubscription._id,type,status:'Pending',message:'Pending'});
            await subDetail.save();
            subDetailID = subDetail._id;

            //Updating the status of subscription; a user linked with a service
            existingSubscription.currentStatus = 'Pending';
            await existingSubscription.save();
        }
        if(!existingSubscription)
        {
            const newSubcription = new subscriptionModel({userId:userId,serviceId:serviceId,currentStatus:'Pending'});
            await newSubcription.save();
            const newSubcriptionID = newSubcription._id;
            const subDetail = new subDetailModel({subscriptionID:newSubcriptionID,type,status:'Pending',message:'Pending'});
            await subDetail.save();
            subDetailID = subDetail._id;
        }

        const subscriptionData = {
            userId: userId,
            type: type,
            serviceId : serviceId,
            subDetailID: subDetailID,
        };

        let payload = {...payloadOptions,subscriptionId:subDetailID,action:type}
        const token = createToken(payload);
        // console.log('Token ',token);

        // Sending request to Partner to Subscribe or Unsubscribe
        axios.post('http://localhost:3001/subRequest', subscriptionData,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    "Content-Type":"application/json",
                }
            })
                .then(response => {
                    console.log('Subscription request response:', response.data);
                    let logData = {
                        subDetailID: response.data.data.subDetailID, 
                        data: response.data.data, 
                        status: response.data.status,
                        message:response.data.message
                    }
                    if ( response.data.success === true) {
                        saveLog({...logData});
                        return res.status(200).json({success:true,message:response.data.message,data:response.data.data});
                    }
                    saveLog({...logData});
                    return res.status(400).json({success:false,message:response.data.message,data:response.data.data});
                })
                .catch(error => {
                    let logData = {
                        subDetailID: subDetailID, 
                        data: subscriptionData, 
                        status: 'Rejected',
                        message:'401 Unauthorized: Invalid Token'
                    }
                    saveLog({...logData});
                    updateSubscriptionStatus({...logData});
                    return res.status(500).json({success:false,message:'401 Unauthorized: Invalid Token',data:subscriptionData});
                });

    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'Error while getting records : '+err
        })
    }

}

const subscriptionCallback = (req, res) => {
    try{
        const { subDetailID, data, status, message } = req.body;
        let logData = {
            subDetailID:subDetailID, 
            data: data, 
            status: status,
            message:message  
        }
        if (status === 'Approved') {            
            saveLog({...logData});
            updateSubscriptionStatus({...logData});
            return res.status(200).json({success:true,message:'Response Received as '+status});

        } else if (status === 'Rejected') {
            saveLog({...logData});
            updateSubscriptionStatus({...logData});
            return res.status(200).json({success:false,message:'Response Received as '+status});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'Caught Exception while notification callback in Merchant : '+err
        })
    }
}

const checkUserSubscription = async(req,res) => {
    try{
        const {userId, serviceId} = req.params;
        const subscription = await SubscriptionModel.findOne({userId:userId, serviceId:serviceId});

        if(!subscription)
            return res.status(200).json({
                success:false,
                messageShow:false,
                message:'No Subscription Found!'
            });

        
        const subsciptionId = subscription._id;
        const subscriptionDetail = await SubcriptionDetailModel.findOne({subscriptionID:subsciptionId}).sort({$natural: -1});
        if(subscription.currentStatus === 'subscribe' && subscriptionDetail.status === 'Rejected'){
            res.status(200).json({
                success:true,
                messageShow:true,
                message:subscriptionDetail.message 
            });
        }
        else if(subscription.currentStatus === 'unsubscribe' && subscriptionDetail.status === 'Rejected'){
            res.status(200).json({
                success:false,
                messageShow:true,
                message:subscriptionDetail.message 
            });
        }
        else if(subscription.currentStatus === 'subscribe' && subscriptionDetail.status === 'Approved')
        {
            res.status(200).json({
                success:true,
                messageShow:false,
                message:subscriptionDetail.message 
            });
        }
        else
        {
            res.status(200).json({
                success:false,
                messageShow:false,
                message:subscriptionDetail.message 
            });
        }        

    }catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Error while getting data : '+err
        })
        
    }
}


module.exports = { getPartners , getPartnerServices, insertPartneService ,subscribe,subscriptionCallback, checkUserSubscription }   