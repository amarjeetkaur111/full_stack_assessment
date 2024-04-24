

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { authenticateToken } = require('./jwt_auth');


const app = express();

app.use(express.json());
app.use(cors());

app.post('/subRequest', authenticateToken, async(req, res) => {
    try{
        const subscriptionRequest = req.body;
        console.log(subscriptionRequest);
        if(subscriptionRequest.userId && subscriptionRequest.type && subscriptionRequest.serviceId, subscriptionRequest.subDetailID)
        {
            res.status(200).json({success:true,message:'Request Received',data:subscriptionRequest,status:'Received'});

                    // For demonstration, let's assume processing takes some time
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await sendSubscriptionNotification(subscriptionRequest);
        }
        else
            res.status(400).json({success:false,message:'No Data received in request', data:subscriptionRequest,status:'Error'});
    }
    catch(err)
    {   
        return res.status(500).json({success:false,messag:'Error while getting request: ', err});
    }
})

const sendSubscriptionNotification = async(subscriptionRequest) => {
    try{
    const { subDetailID } = subscriptionRequest;
    axios.post('http://localhost:3000/partners/services/callback', {subDetailID, data:subscriptionRequest,status:'Approved'},{
                headers:{
                    "Content-Type":"application/json",
                }
            })
                .then(response => {
                    console.log('Callback notification reached Merchant:', response.data);
                    return {success:true,data:response.data};
                })
                .catch(error => {
                    console.log('Erorr is receiving notification from Merchant:', error);
                    return {success:false,message:'Caught Exception'+error};
                });
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'Caught Exception while notification callback in Merchant : '+err
        })
    }
}

app.listen(3001, () => {
    console.log('Partner working on port 3001');
});