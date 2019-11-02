import React from "react";
import '../styles/Footer.css'
import Logo from "../images/slice-it-logo.svg";

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footerInner">
         <img src={Logo} alt="Slice it logo" />
         <p>® 2019 Slice It - Product of <a href="https://www.talentpath.com" target="_blank" className="tpLink">Talent Path</a></p>
          

          <a className="feedbackLink" href="https://docs.google.com/forms/d/1zEwEIBv_OVq0OJ9pEKJgHPg160Mz3yHK21VrutrX9NY/viewform?edit_requested=true" target="_blank" >Submit Feedback</a>
        </div>
        
      </footer>
    );
}

export default Footer;
