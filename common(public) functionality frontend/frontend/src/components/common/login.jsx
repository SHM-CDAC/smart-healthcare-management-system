import { useRef, useState } from "react";
import { authenticateUser } from "../../services/publicService";
import { useDispatch } from "react-redux";
import { setLoggedInPatientDetails } from "../../store/PatientSlice";
import { useNavigate } from "react-router-dom";
import { setLoggedInAdminDetails } from "../../store/AdminSlice";
import { setLoggedInDoctorDetails } from "../../store/DoctorSlice";
import { login } from "../../store/LoginStateSlice";
import { toast } from "react-toastify";

const Login = ()=>{
    const errmsg = useRef("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginFormData,setLoginFormData] = useState({
        email:"",
        password:""
    });

    const updateFormData = (e)=>{
        errmsg.current.innerText = "";
        setLoginFormData({...loginFormData,[e.target.name] : e.target.value});
        
    }

    const handleUserLogin = async(e)=>{
        e.preventDefault();
        if(loginFormData.email == "")
                errmsg.current.innerText = "Please enter your email address.";

        else if(loginFormData.password == "")
                errmsg.current.innerText = "Please enter your password.";

        else{
            try{
                const response = await authenticateUser(loginFormData);
                localStorage.setItem("token",response.data.jwt);
                
                console.log("---RESPONSE: ",response);
            if(response.data.role === "ROLE_PATIENT"){
                console.log(response.data);
                toast.success("Login Successful!!!");
                navigate("/patient/dashboard");
                
            }
            else if(response.data.role === "ROLE_DOCTOR"){
                toast.success("Login Successful!!!");
                navigate("/doctor/dashboard");
            }
            else if(response.data.role === "ROLE_ADMIN"){
                toast.success("Login Successful!!!");
                navigate("/admin/dashboard");
            }
            }
            catch(error){
                if(error.response)
                toast.error(error.response.data);

                else
                toast.error("Server is not reachable!");
            }  
        }
        
    }

    return (
        <div className="container mt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center px-1">
                        <h4 className="loginFormHeading">Login here</h4>
                        <h5 ref={errmsg} style={{color:"red"}} className="loginErrmsg"></h5>
                        <div className="loginFormContainer p-5 shadow-lg">
                            Email: <input type="text" className="form-control mb-4" placeholder="Enter your email..." name="email" value={loginFormData.email} onChange={updateFormData}/>
                            Password: <input type="password" className="form-control mb-4" placeholder="Enter your password..." value={loginFormData.password} name="password" onChange={updateFormData}/>
                            <div className="d-flex justify-content-center">
                                <button className="loginPageLoginBtn mb-4" onClick={handleUserLogin}>Login</button>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
