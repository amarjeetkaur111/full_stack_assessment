import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from '../utility/services';

export const SubscriptionContext = createContext({});

export const SubscriptinContextProvider = ({children, user}) => {
    const [userSubscriptions, setUserSubscriptions ]   = useState(null);

    const [partners, setPartner] = useState(null);
    const [isPartnerLoading, setIspartnerLoading] = useState(false);
    const [httpPartnerError, setHttpPartnerError] = useState(null);
    const [currentPartner, setCurrentPartner ] = useState(null);

    const [services, setServices ] = useState(null);
    const [isServiceLoading, setIsServiceLoading ] = useState(false);
    const [httpServiceError, setHttpServiceError ] = useState(null);

    //get all Partners
    useEffect(() => {
        const getPartners = async() => {
            setIspartnerLoading(true);
            setHttpPartnerError(null);
            if(user?.id)
            {
                var response =  await getRequest(`${baseUrl}/partners/`);
                setIspartnerLoading(false);
                if(response.error) setHttpPartnerError(response.error);
                response = response.data;
                setPartner(response);
            }
        };
        getPartners();
    },[user]);

    useEffect(() => {
        if(currentPartner === null ) return;
        const getServices = async() => {
            setIsServiceLoading(true);
            setHttpServiceError(null);
            if(currentPartner?._id)
            {
                var response =  await getRequest(`${baseUrl}/partners/services/${currentPartner?._id}`);
                setIsServiceLoading(false);
                if(response.error) setHttpServiceError(response.error);
                response = response.data;
                setServices(response);
            }
        };
        getServices();
    },[currentPartner]);

    const updateCurrentPartner = useCallback((partner) => {
        setCurrentPartner(partner);
    },[])

    var subscriptionData = {partners , isPartnerLoading, httpPartnerError, updateCurrentPartner, services, isServiceLoading, httpServiceError}
    return <SubscriptionContext.Provider value={subscriptionData}>{children}</SubscriptionContext.Provider>
}