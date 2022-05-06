import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TextField, Select,MenuItem, InputLabel, Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Dashboard from './dashboard';
import { Link } from 'react-router-dom';
  
const Login = () => {
    const axios = require('axios');

    

    const handleAccessKeyChange= e => {
      console.log(e.target.id)
      setAccessKey(e.target.value);
    }
  
    const handleSecretKeyChange= e => {
      console.log(e.target.id)
      setSecretKey(e.target.value);
    }
  
    const handleSubmission= e => {
      e.preventDefault();
  
      let req = {
        'secretKey': secretKey,
        'accessKey': accessKey
      }
      console.log(req);
      axios.post('http://localhost:8080/home/authenticate', req)
      .then(function (response) {
        console.log(response);
  
        let username = response.data.username;
        let token1 = response.data.token1;
        let token2 = response.data.token2;

        console.log('Response Code: '+response.status);
        
        setAuthenticated(true);
       
        
        document.getElementById('dash-link').click();
        handleCookie(username, token1, token2);
        
      })
      .catch(function (error) {
        
        alert('Invalid Credentials');
        console.log(error);
      });

        
    }

    
  
    const handleCookie = (username, token1, token2) => {
      setCookie('username', username);
      setCookie('token1', token1);
      setCookie('token2', token2);
   };
    
  
    const [accessKey, setAccessKey] =  useState('');
    const [secretKey, setSecretKey] = useState('');
    const [cookies, setCookie] = useCookies(['user']);
    const [authenticated, setAuthenticated] = useState(false);
  
    return(
      <div className="main-wrapper center border-grey">
        <h1>AWS Login</h1>
        <form id="main-login-form" onSubmit={handleSubmission}>
          <div className='access-key-wrapper center input-field-wrapper'>
            <TextField onChange={handleAccessKeyChange} value={accessKey} type="password" id="access-key" label="Access Key" variant="outlined" />
          </div>
          <div className='secret-key-wrapper center input-field-wrapper'>
            <TextField onChange={handleSecretKeyChange} value={secretKey} id="secret-key" type="password" label="Secret Key" variant="outlined" /> 
          </div>
          <Button type='submit' variant="contained" color="success">
            Validate
          </Button>
        </form>
    </div>
  );
};
  
export default Login;