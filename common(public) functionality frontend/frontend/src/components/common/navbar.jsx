import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/LoginStateSlice";
import { clearLoggedInPatientDetails } from "../../store/PatientSlice";
import { clearLoggedInDoctorDetails } from "../../store/DoctorSlice";
import { clearLoggedInAdminDetails } from "../../store/AdminSlice";


const Navbar = () => {

  let navigateToDashboard ;
  const isLoggedIn = useSelector((state)=>state.loginState);
  const admin = useSelector((state)=>state.loggedInAdmin);
  const doctor = useSelector((state)=>state.loggedInDoctor);
  const patient = useSelector((state)=>state.loggedInPatient);  

  let loggedInUserDetails ;
  if(isLoggedIn.userRole === "PATIENT"){
    loggedInUserDetails = patient;
    navigateToDashboard = "/patient/dashboard";
  }
  else if(isLoggedIn.userRole === "DOCTOR"){ 
    loggedInUserDetails = doctor; 
    navigateToDashboard = "/doctor/dashboard";
  }
  else{
    loggedInUserDetails = admin;  
    navigateToDashboard = "/admin/dashboard";
  }
    

  console.log("loggedInUser: ", loggedInUserDetails );
  let role, uid;
  if(loggedInUserDetails?.role){
    role = loggedInUserDetails.role.substring(5).toLowerCase(); 
    uid = loggedInUserDetails.userId; 
  }
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginClick = ()=>{
      navigate("/login");
  }

  const handleRegistration = ()=>{
    navigate("/patientReg");
  }

  const handleLogout = ()=>{
   const result = confirm("Are you sure you want to logout?");
   if(result){
    if(isLoggedIn.userRole === "PATIENT"){
        localStorage.removeItem("token");
        dispatch(clearLoggedInPatientDetails());
        dispatch(logout({value:false, userRole:"", userName:""})); 
        navigate("/login");
    }
    else if(isLoggedIn.userRole === "DOCTOR"){
        localStorage.removeItem("token");
        dispatch(clearLoggedInDoctorDetails());
        dispatch(logout({value:false, userRole:"", userName:""})); 
        navigate("/login");
    }
    else{
      localStorage.removeItem("token");
      dispatch(clearLoggedInAdminDetails());
      dispatch(logout({value:false, userRole:"", userName:""}));
      navigate("/login");
    }
   }
   
  }

  return (
    <>
      <div className="container mb-lg-5">
        <div className="container-fluid">
          <div className="mynavbar d-flex justify-content-between align-items-center py-3">
            {/* Logo */}
            <div className="d-flex gap-2 align-items-center">
              <img
                src="/images/logo.png"
                alt="logo"
                style={{ width: "35px", height: "35px" }}
              />
              <span className="logoName">
                <Link to="/home" className="logoitem">
                  Smart Healthcare
                </Link>
              </span>
            </div>

            {/* Desktop Menu */}
            <ul
              className="d-none d-lg-flex navlistitems justify-content-center align-items-center p-0 m-0"
              style={{ listStyle: "none" }}
            >
              <li>
                <Link to="/home" className="navlinkitems">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="navlinkitems">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="navlinkitems">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Desktop Buttons */}
            <div className="d-none d-lg-flex gap-4 navbtns">
              {isLoggedIn.value ? <><Link to={navigateToDashboard}><img src={`http://localhost:8080/${role}/photo/${uid}`} alt=""  style={{width:"45px",height:"45px",borderRadius:"50%"}} className="img-fluid" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom"/></Link> <button className="logoutbtn" onClick={handleLogout}>Logout</button> </>: <>
                <button className="loginbtn" onClick={handleLoginClick}>Login</button>
              <button className="registerbtn" onClick={handleRegistration}>Register</button>
                </>}
            </div>

            {/* Mobile Burger Button */}
            <button
              className="btn d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileMenu"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas (Left) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu">
        <div className="offcanvas-header">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{ width: "35px", height: "35px" }}
          />
          <h5 className="logoitem">Smart Healthcare</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-unstyled d-flex flex-column gap-3">
            <li>
              <Link to="/home" className="navlinkitems">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="navlinkitems">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="navlinkitems">
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="d-flex flex-column gap-3 mt-4">
           {isLoggedIn.value ? <><Link to={navigateToDashboard}><img src={`http://localhost:8080/${role}/photo/${uid}`} alt=""  style={{width:"45px",height:"45px",borderRadius:"50%"}}/></Link> <button className="logoutbtn" onClick={handleLogout}>Logout</button> </> : <>
                <button className="loginbtn" onClick={handleLoginClick}>Login</button>
              <button className="registerbtn" onClick={handleRegistration}>Register</button>
                </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
