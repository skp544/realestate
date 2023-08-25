import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left */}
        <div className="flexColStart f-left">
          <Link to={"/"}>
            <img src="./logo2.png" alt="" width={120} />
          </Link>

          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        {/* right */}
        <div className="flexColStart f-right">
          <span className="primaryText">Information </span>
          <span className="secondaryText">145 New York, FL 5467, USA</span>

          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
