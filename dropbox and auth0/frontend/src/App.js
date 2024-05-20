import logo from './logo.svg';
import React from 'react';
import './App.css';
import Login from './components/login';
import Logout from './components/Logout';
import Home from './home';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const clientId="698590027106-eu0smltjguhnh35qja617q6ovpbp6pbg.apps.googleusercontent.com";
function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  return (
    
    <React.StrictMode>
 
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<><Login /></>}></Route>
        <Route exact path="/home" element={<><Home /><Logout /></>}></Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
  )
}

export default App;
