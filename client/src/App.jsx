import { Routes, Route, Navigate } from 'react-router-dom';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { SubscriptinContextProvider } from './context/SubscriptionContext';

function App() {
  const { user,isRegistered }= useContext(AuthContext); 

  return (
    <SubscriptinContextProvider user={user}>
    <NavBar></NavBar>
    <Container className='text-secondary'>
      <Routes>
        <Route path='/' element={user ? <Services /> : <Login/> }/>
        <Route path='/login' element={user ? <Services /> :<Login />}/>
        <Route path='/register' element={(isRegistered && !user ) ? <Login /> : (isRegistered && user ) ? <Services />: <Register /> }/> 
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </Container>
    </SubscriptinContextProvider>
  )
}

export default App