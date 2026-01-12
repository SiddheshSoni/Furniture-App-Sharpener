import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer">

        <div className="footer-column">
          <h5>Furniture</h5>
          <ul>
            <li>Home Furniture</li>
            <li>Office Furniture</li>
            <li>Mattress</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>About Us</h5>
          <ul>
            <li>About HomeEssence</li>
            <li>Social Impact</li>
            <li>Contact Us</li>
            <li>FAQ's</li>
            <li>Feedback</li>
            <li>Blogs</li>
          </ul>
        </div>

        <div className="footer-column">
          <h5>Help</h5>
          <ul>
            <li>Shipping & Delivery</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Purchase & Returns</li>
            <li>Downloads</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>📞 1800 0000 000</h4>
          <p>
            You can reach us 7 days a week. Chat with us or call our toll-free
            number between 9.00 am to 6.00 pm.
          </p>
          <p>✉️ homeEsscense.store@gmail.com</p>
          <p>
            3rd Floor, Chromium Building,<br />
            Near L&T Junction, Powai,<br />
            Mumbai – 400072
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
