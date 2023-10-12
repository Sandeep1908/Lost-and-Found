import React from 'react';
import './Login.css';
import logo from './lostfound1.jpg';
import { Button } from '@mui/material';
import { useMsal } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import auth from '../firebase'
import {provider} from '../firebase'
import { signInWithPopup } from 'firebase/auth';
 
export default function Login(props) {



  const { instance } = useMsal();
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const handleLogin = async () => {


    signInWithPopup(auth,provider)
    .then((resutl)=>{
  
    
      const user=resutl.user
      console.log("googel data",user)
      localStorage.setItem("loggedinuser", user)
      navigate('/home')

    }).catch((err)=>{
      console.log(err)
    })
    
    
    
    // try {
    //   await instance.loginPopup({
    //     redirectUri: "https://osoc-lost-and-found-webapp.netlify.app/", // Update this with the correct redirect URI
    //   });

    //   // After successful login, navigate to the home path
    //   navigate('/home');
    // } catch (error) {
    //   console.log("Error during login:", error);
    // }
  };

  



  return (
    <div className={`bdy ${props.theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className='row'>
        <div className='banner-ad col col-sm-6' style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}` }}>
          <h2 className='title'><span style={{ color: '#9C27B0' }}>Lost</span>  & <span className='found'>Found</span></h2>
          <h1 className='title' style={{ color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}` }}>Welcome !</h1>
          <div className='login-btn'>
            <Button onClick={handleLogin} variant="contained" color="secondary" style={{ textTransform: "none", borderRadius: "10px", fontFamily: "'Poppins', sans-serif", fontSize: "1.1rem" }}>Login with Google</Button>
          </div>
        </div>
        <div className='banner col col-sm-6'>
          <img src={logo} alt='logo' className='logo' />
        </div>
      </div>
    </div>
  );
}