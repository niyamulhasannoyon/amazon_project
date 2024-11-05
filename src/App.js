import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Nomatch from './components/NoMatch/Nomatch';
import Pd from './components/ProductDetail/Pd';
import Shipment from './Shipment/Shipment';
import Login from './Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App(props) {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <div>
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/manage" element={<Manage/>} />
          <Route path="/login" element={<Login/>} />
            <Route
                  path="/shipment"
                  element={
                      <PrivateRoute>
                          <Shipment />
                      </PrivateRoute>
                  }
              />
          <Route exact path="/" element={<Shop/>} />
          <Route path='/product/:productId' element={<Pd/>} />
          <Route path="*" element={<Nomatch/>} />
        </Routes>
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
