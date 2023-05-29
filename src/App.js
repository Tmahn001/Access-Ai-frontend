import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Chat';
import Login from './components/login.component';
import Home from './components/home.component';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';


const App = ()=>{
  return(
    <div className='App'>
      <Router>
        <AuthProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        </Routes>
        </AuthProvider>

      </Router>

      </div>
  )
}

export default App;
