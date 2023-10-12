import React, { useState, useEffect } from "react";
import FeedbackForm from "./feedback/FeedbackForm";
import Navbar from "./Navbar/Navbar";
import HelpUs from "./help-us-find-page/HelpUs";
import AboutUs from "./About/AboutUs";
import Home from "./home-page/Home";
import GoToTop from "./go-to-top/GoToTop";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LostUpload from './lost-details-upload-page/LostUpload';
import FoundUpload from './found-item-details-page/FoundUpload';
import ItemDetails from "./item-gallery-details/ItemDetails";
import ItemGallery from "./items-gallery/ItemGallery";
import CategorySelection from "./items-gallery/CategorySelection";
import Login from "./login-page/Login";
import Faq from "./faq/Faq";
import Footer from "../src/Footer/Footer";
import ProtectedRoute from './ProtectedRoute'; // Import the refactored ProtectedRoute component
import Confirm from './confirmation_page/Confirm';

import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication, LogLevel } from "@azure/msal-browser";
import auth from "./firebase";
import HomePage from "./home-page/Home";



const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = (theme) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  const [showConfirmPage, setShowConfirmPage] = useState(false);

  const showConfirm = (value) => {
    setShowConfirmPage(value);
  };

  return (
 
      <Router>
        {showConfirmPage ?
          <Confirm func={showConfirm} /> :
          (<>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login theme={theme} />} />
              {/* Non-protected routes */}
              <Route path="/about" element={<AboutUs theme={theme} />} />
              <Route path="/faq" element={<Faq theme={theme} />} />

              {/* Protected routes */}
              <Route path="/home" element={<Home theme={theme} /> }/>
              <Route path="/lost" element={<LostUpload theme={theme} />} />
              <Route path="/found" element={<FoundUpload theme={theme} /> }/>
              <Route path="/feedback" element={<FeedbackForm theme={theme} /> }/>
              <Route path="/items" element={<CategorySelection theme={theme} />} />
              <Route path="/items/:category" element={<ItemGallery func={showConfirm} theme={theme} /> }/>
              <Route path="/details/:id" element={<ItemDetails func={showConfirm} theme={theme} /> }/>
              <Route path="/helpusfind" element={<HelpUs theme={theme} />} />
              {/* <Route path="/home" element={<ProtectedRoute><Home theme={theme} /></ProtectedRoute>} />
              <Route path="/lost" element={<ProtectedRoute><LostUpload theme={theme} /></ProtectedRoute>} />
              <Route path="/found" element={<ProtectedRoute><FoundUpload theme={theme} /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><FeedbackForm theme={theme} /></ProtectedRoute>} />
              <Route path="/items" element={<ProtectedRoute><CategorySelection theme={theme} /></ProtectedRoute>} />
              <Route path="/items/:category" element={<ProtectedRoute><ItemGallery func={showConfirm} theme={theme} /></ProtectedRoute>} />
              <Route path="/details/:id" element={<ProtectedRoute><ItemDetails func={showConfirm} theme={theme} /></ProtectedRoute>} />
              <Route path="/helpusfind" element={<ProtectedRoute><HelpUs theme={theme} /></ProtectedRoute>} /> */}

              {/* Sign-out route */}
              <Route path="/signout" element={<SignOut />} />
            </Routes>
            <GoToTop />
            <Footer />
          </>)}
      </Router>
 
  );
};

// ProtectedRoute component remains the same as in the previous example

// Sign-out component to handle sign-out process
const SignOut = () => {
  const { instance } = useMsal();

  useEffect(() => {
    auth.signOut();
  }, [instance]);

  return (
    <div>
      <h1>Signing Out...</h1>
      <p>Please wait while we sign you out.</p>
      {/* Optionally, you can add a link to redirect users back to the homepage */}
      <Link to="/home">Go to Homepage</Link>
    </div>
  );
};

export default App;
