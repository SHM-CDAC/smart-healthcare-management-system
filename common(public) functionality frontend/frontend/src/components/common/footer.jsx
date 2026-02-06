import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container footerContainer">
      <div className="container-fluid">
          <div className="row d-flex gap-5 justify-content-between ">
              <div className="col-lg-4 col-12 text-center text-lg-start">
                <div className="d-flex gap-2 mb-4 justify-content-center justify-content-lg-start">
                  <img
                src="/images/logo.png"
                alt="logo"
                style={{ width: "33px", height: "33px" }}
              />
              <span className="logoName">
                <Link to="/home" className="logoitem">
                  Smart Healthcare
                </Link>
              </span>
                </div>
              <span className="">
                Smart Healthcare is a modern platform focused on simplifying healthcare interactions.
                It connects patients with reliable medical services through a secure and user-friendly experience.
              </span>
              </div>
              <div className="col-lg-2 col-12 text-center text-lg-start">
                 <span className="fw-bold">COMPANY</span>
                 <div className="d-flex flex-column mt-4 gap-2 align-items-center align-items-lg-start">
                  <span><Link to="/home" className="footerLinks">Home</Link></span>
                  <span><Link to="/about" className="footerLinks">About</Link></span>
                  <span><Link to="/contact" className="footerLinks">Contact</Link></span>
                 </div>
              </div>
              <div className="col-lg-2 col-12 text-center text-lg-start">
                <span className="fw-bold">GET IN TOUCH</span>
                <div className="d-flex flex-column mt-4 gap-2 align-items-center align-items-lg-start">
                <span>+91 - 9960499988</span>
                <span>rigved2vyas@gmail.com</span>
                </div>
          
              </div>
          </div>
          <p className="text-center mt-5 fw-bold">Copyright 2026 @Smart-Healthcare - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
