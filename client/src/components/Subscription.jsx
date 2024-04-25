import React, { useState } from "react";

const Subscription = () => {
    const [isSubscribed, setIsSubscribed ] = useState(false);
    const [subscriptionError, setSubsriptionError] = useState(null);

    return (
        <React.Fragment>
            <section>
                <div className='subscribe'>
                    <button className='btn-outline-light btn'>
                        Subscribe
                    </button>    
                    <div style={{backgroundColor:'tan',color:'#9a2323'}}>Request Failed!</div>                                            
                </div>
            </section>
        </React.Fragment>
    )
}

export default Subscription;