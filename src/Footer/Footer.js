import React from 'react';
import "./Footer.css";
import fb from "../images/insta-logo.png";
import twitter from "../images/twitter-logo.png";
import insta from "../images/facebook-logo.png";
import linkedin from "../images/linkedin-logo.png"
const Footer = () => {
  return (
    <div className="footer">
      <div className="sb__footer__section__padding">
        <div className="sb__footer-links">
          <div className="sb__footer-links_div">
            <h4>About Us</h4>
            <a href="/home">
              <p>Home</p>
            </a>
            <a>
              <p>Feedback</p>
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Services</h4>
            <a href="/lost">
              <p>Report Lost Item</p>
            </a>
            <a href="/found">
              <p>Report Found Item</p>
            </a>
            <a href="/items">
              <p>See Items Gallery</p>
            </a>
            {/* <a href="/helpusfind">
              <p>Help Us Find</p>
            </a> */}
          </div>
          {/* <div className="sb__footer-links_div">
            <h4>Partners</h4>
            <a href="/about">
              <a href="https://upes-open.org/"> <p>UPES Open Community</p></a>
            </a>
          </div> */}
          <div className="sb__footer-links_div">
            <h4>Feedback</h4>
            <a >
              <a ><p>Email</p></a>
            </a>
            <a >
              <a ><p>Contact Number</p></a> 
            </a>
            <a>
              <a ><p>Visit Us</p></a> 
            </a>
          </div>
          <div className="sb__footer-links_div">
            <h4>Social</h4>
            <div className='socialmedia'>
            <a ><p><img src={fb} alt="instaimage"/></p></a>
            <a ><p><img src={twitter} alt="twitterimage"/></p></a>
            <a ><p><img src={insta} alt="fbimage"/></p></a>
            <a ><p><img src={linkedin} alt="linkedinimage"/></p></a>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className='sb__footer-below'>
          <div className='sb__footer-copyright'>
            <p>
              @{new Date().getFullYear()}. All right reserved.
            </p>
          </div>
          <div className='sb__footer-below-links'>
            <a ><div><p>Terms & Conditions</p></div></a>
           
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
