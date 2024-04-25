import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { baseUrl, getRequest, postRequest } from '../utility/services';


const Subscription = ({serviceId}) => {
    const [isSubscribed, setIsSubscribed ] = useState(false);
    const [subscriptionError, setSubsriptionError] = useState(null);
    const {user} = useContext(AuthContext);

    console.log('Service: '+serviceId, 'Userid: '+user?.id);

    useEffect(()=>{
        const getStatus = async() => {
            setSubsriptionError(null);
            if(serviceId && user?.id)            {
                const userId = user.id;
                var response =  await getRequest(`${baseUrl}/partners/services/checkUserSubsciption/${userId}/${serviceId}`);
                if(response.error) setSubsriptionError(response.error);
                if(response.success === true)
                    setIsSubscribed(true);
                if(response.messageShow)
                    setSubsriptionError(response.message);
            }
        };
        getStatus();
    },[serviceId])

    const handleSubscriptionChange = async(currentStatus) => {
        try{
            const type = currentStatus ? 'unsubscribe' : 'subscribe';
            if(serviceId && user?.id)
            {
                const response =  await postRequest(`${baseUrl}/partners/services/subscribe`,JSON.stringify({userId:user.id,type:type,serviceId:serviceId}));
                if(response.error || response.success == false)   {
                    setIsSubscribed(currentStatus);
                    setSubsriptionError(response.message);
                }
                else
                    setIsSubscribed(!currentStatus);
                    setSubsriptionError(null);
            }
        }
        catch(error)
        {
            console.error('Error updating subscription status:', error);
            setIsSubscribed(currentStatus);
            setSubsriptionError('Error: '+error);
        }
    }

    return (
        <React.Fragment>
            <section>
                <div className='subscribe'>
                    <button onClick={() => handleSubscriptionChange(isSubscribed)} className='btn-outline-light btn'>
                        {isSubscribed === true ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                    {subscriptionError && <div style={{backgroundColor:'tan',color:'#9a2323'}}>{subscriptionError}</div> }                                        
                </div>
            </section>
        </React.Fragment>
    )
}

export default Subscription;