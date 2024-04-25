import {Container, Row, Col, Card, Navbar } from 'react-bootstrap';
import ServicesList from '../components/ServicesList';
import { useContext } from 'react';
import { SubscriptionContext } from '../context/SubscriptionContext';

const Services = () => {
    const {partners, isPartnerLoading, httpPartnerError, updateCurrentPartner} = useContext(SubscriptionContext);

    return (
        <Container>
            {partners?.length < 1 ? null : (
            <Row>
                <Col sm='4'>
                    <section>
                        <div className='out-container'>
                            <div className='out-container-header'>Partners</div>
                        </div>
                        <div className='out-container'>
                            <div>
                                <div className='card'>
                                    {isPartnerLoading && <p>Loading Partners....</p>}
                                    {httpPartnerError  ? <p>{httpPartnerError}</p> : (
                                        partners?.map((partner, index) => {
                                            return (
                                                <div className='card-body partner-list' key={index} onClick={() => updateCurrentPartner(partner)}>
                                                    <div>{partner?.name}</div>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </section> 
                </Col>
                <Col sm='8'>
                    <ServicesList/>
                </Col>
            </Row> 
            )}
        </Container>
    )
}

export default Services;