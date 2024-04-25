import React,{ useContext, useState } from "react";
import {Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import Subscription from "./Subscription";
import { SubscriptionContext } from "../context/SubscriptionContext";


const ServicesList = () => {
    
    const {services, isServiceLoading, httpServiceError} = useContext(SubscriptionContext);
    return (
        <React.Fragment>
            <section>
                <div className='out-container'>
                    <div className='out-container-header'>Services</div>
                </div>
                    {services?.length < 1 ? null : (
                        <div className='out-container'>
                            <div>
                            {isServiceLoading && <p>Loading Services ... </p>}
                            {httpServiceError ? <p>{httpServiceError}</p> : (
                            services?.map((service, index) => {
                                return (
                                    <div className='card' key={index} >                                    
                                        <div className='card-body' style={{backgroundColor:'#3d78b8'}}>
                                            <div className='row'>
                                                <Col sm='8'>
                                                    <div className='service'>
                                                        {service?.name}
                                                    </div>
                                                </Col>
                                                <Col sm='4'>
                                                    <Subscription />
                                                </Col>
                                            </div>
                                        </div>                                            
                                    </div>
                                    )
                                })                                        
                            )}
                        </div>                        
                    </div>
                    )}
            </section>
        </React.Fragment>
    )
}   

export default ServicesList;