import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Headdy from './components/Headdy'
import Header from './components/Header'
import Footer from './components/Footer'
import Homescreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserFeedsScreen from './screens/UserFeedsScreen'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        {/* <Headdy /> */}
        <main className='py-3'>
          <Container>
            <Route path='/feeds' component={UserFeedsScreen} />
            <Route path='/dashboard' component={ProfileScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/signup' component={RegisterScreen} />
            <Route path='/' component={Homescreen} exact />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
