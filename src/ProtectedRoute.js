import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import auth from './firebase';

const ProtectedRoute = ({ children }) => {
 const [user,setUser]=useState(null)
 
 useEffect(() => {
   // const auth = getAuth()
   const userr =  localStorage.getItem("loggedinuser")
   console.log(userr)
   const auth = getAuth();
   setUser(auth.currentUser.uid)  
   console.log(auth)
    onAuthStateChanged(auth,(user)=>{
      console.log("inside auth changed",user)
      setUser(user.uid)
    })
  },[])

  // Check if the user is authenticated

  if (user == null) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
