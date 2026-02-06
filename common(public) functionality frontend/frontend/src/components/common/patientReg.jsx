import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateRegForm from "../../validatePatientReg";
import { savePatientDetails } from "../../services/userService";
import { toast } from "react-toastify";


const PatientRegistration = ()=>{
    const navigate = useNavigate(); 
    const errmsg = useRef("");
    const[photo,setPhoto] = useState(null);
    const[patientRegDetails,setPatientRegDetails] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPwd:"",
        city:"",
        mobileNo:"",
        dob:"",
        gender:"",
        address:""
    });

     const handleRegistration = async(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        const result = validateRegForm(patientRegDetails);
        
        if(result == "")
        {
            formdata.append(
                "patientRegDto",
                new Blob([JSON.stringify({
                    firstName:patientRegDetails.firstName,
                    lastName:patientRegDetails.lastName,
                    email:patientRegDetails.email,
                    password:patientRegDetails.password,
                    city:patientRegDetails.city,
                    mobileNo:patientRegDetails.mobileNo,
                    dob:patientRegDetails.dob,
                    gender:patientRegDetails.gender,
                    address:patientRegDetails.address
                })],
            {type:"application/json"})
                
            )

            if(photo){
                formdata.append("photo",photo)
            }
            
            try{
                const response  = await savePatientDetails(formdata);
                toast.success("Registration Done Successfuly!!!");
                navigate("/login"); 
            }
            catch(error){
            if(error.response)
                toast.error(error.response.data);
            else
                toast.error("Server is not reachable!");
            }
        }
        else
            errmsg.current.innerText = result;
    }

    const handleOnChange = (e)=>{
        errmsg.current.innerText = "";
        setPatientRegDetails({...patientRegDetails,[e.target.name]: e.target.value});
    }

       return (
            <div className="container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-0 px-lg-3 d-flex flex-column justify-content-center align-items-center">
                            <h4 className="text-center mt-5 mt-lg-0 regFormHeading">Patient Registration Form</h4>
                            <div className="regFormContainer p-2 p-sm-3 p-lg-5 shadow-lg">
                                <div className="d-flex justify-content-between">
                                    <h5 style={{color:"#28CFFE"}}>Join Us</h5>
                                    <span >Are you a Doctor?<br className="linebreaker"/> <Link to={"/doctorReg"}>register here</Link></span>
                                </div>
                                
                                <form action="">
                                <div className="d-flex flex-wrap flex-lg-nowrap gap-lg-5 gap-3 justify-content-center mb-4 mt-4">
                                  <div className="regFormContentDiv">
                                    <label htmlFor="">First Name: </label>
                                    <input type="text" name="firstName" className="form-control" placeholder="Enter first name..." onChange={handleOnChange}/>
                                  </div>
                                  <div className="regFormContentDiv">
                                    <label htmlFor="">Last Name: </label>
                                    <input type="text" name="lastName" className="form-control" placeholder="Enter last name..." onChange={handleOnChange}/>
                                  </div>
                                 
                                </div>
                                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-4 mb-4">
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Email: </label>
                                        <input type="text" className="form-control" name="email" placeholder="Enter your email..." onChange={handleOnChange}/>
                                    </div>
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Password: </label>
                                        <input type="password" className="form-control" name="password" placeholder="Enter your password..." onChange={handleOnChange}/>
                                    </div>
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Confirm Password: </label>
                                        <input type="password" className="form-control" name="confirmPwd" placeholder="Confirm your password..." onChange={handleOnChange}/>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center mb-4 gap-4">
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">City: </label>
                                        <input type="text" className="form-control" name="city" placeholder="Enter your city..." onChange={handleOnChange}/>
                                    </div>
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Mobile Number: </label>
                                        <input type="text" className="form-control" name="mobileNo" placeholder="Enter your number..." onChange={handleOnChange}/>
                                    </div>
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Date of Birth: </label>
                                        <input type="date" className="form-control" name="dob" onChange={handleOnChange}/>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-evenly mb-4 gap-4 gap-lg-5">
                                <div>
                                         <span>Gender: </span>
                                  <div className="d-flex gap-lg-5 gap-3">
                                    <div>
                                        <input type="radio" name="gender" id="male" value="MALE"  style={{width:"15px"}} onChange={handleOnChange}/><label htmlFor="male" >Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" value="FEMALE" style={{width:"15px"}} onChange={handleOnChange}/><label htmlFor="female">Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="other" value="OTHER" style={{width:"15px"}} onChange={handleOnChange}/><label htmlFor="other">Other</label>
                                    </div>
                                  </div>
                                </div>
                                   
                                <div style={{width:"230px"}}>
                                        <label htmlFor="">Upload your ProfilePic: </label>
                                        <input type="file" className="" name="photo"  style={{width:"230px"}} onChange={(e)=>{setPhoto(e.target.files[0])}}/>
                                        <span className="text-danger" style={{fontSize:"14px"}}>image size must be less than 10MB</span>
                                </div>
                                </div>
                                <div className="d-flex mb-5 justify-content-center">
                                    <div className="regFormContentDiv">
                                        <label htmlFor="">Address: </label>
                                        <textarea name="address" id="" className="form-control" placeholder="Enter address..."onChange={handleOnChange}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center ">
                                    <button onClick={handleRegistration}>Register</button>
                                </div>
                                <h5 ref={errmsg} style={{color:"red"}} className="text-center mt-3"></h5>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default PatientRegistration;