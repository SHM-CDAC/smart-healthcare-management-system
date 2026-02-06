import {useRef} from "react";
import { useDispatch, useSelector } from "react-redux";  
import { useState } from "react";
import {toast} from "react-toastify";   
import validatePatientUpdationForm from "../../validatePatientProfile";
import { updateMyProfile } from "../../services/patientService";
import { setLoggedInPatientDetails } from "../../store/PatientSlice";
import { useNavigate } from "react-router-dom";

const UpdatePatientProfile = () => {

    const loggedInPatientDetails = useSelector((state)=>state.loggedInPatient);   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[photo,setPhoto] = useState(null); 
    const[updatedPatientDetails,setUpdatedPatientDetails] = useState({
        firstName:loggedInPatientDetails.firstName,
        lastName:loggedInPatientDetails.lastName,
        email:loggedInPatientDetails.email,
        city:loggedInPatientDetails.city,
        mobileNo:loggedInPatientDetails.mobileNo,
        dob:loggedInPatientDetails.dob,
        gender:loggedInPatientDetails.gender,
        address:loggedInPatientDetails.address
    }); 

    const handleInputChange = (e) => {
        setUpdatedPatientDetails({...updatedPatientDetails,[e.target.name]:e.target.value});
    }

    const handleProfileUpdation = async (e)=>{
        e.preventDefault();
        const formdata = new FormData();
        const result = validatePatientUpdationForm(updatedPatientDetails);
        if(result == ""){
            formdata.append(
                "dto",
                new Blob([JSON.stringify(updatedPatientDetails)],
            {type:"application/json"})
            )

            if(photo){
                formdata.append("photo",photo);
            }

            try{
                const response = await updateMyProfile(formdata,loggedInPatientDetails.patientId);
                console.log(response);
                toast.success("Profile updated successfully!");
                dispatch(setLoggedInPatientDetails(response.data));
                navigate("/patient/dashboard");
            }
            catch(error){
                if(error.response)
                    toast.error(error.response.data);
                
                else
                    toast.error("Server is not reachable!");
            }
        }
        else{
            toast.error(result);
        }
    }

    return(
        <div className="container">
            <div className="container-fluid">
                <h2 className="text-center mt-5 mt-lg-0 mb-5">Patient Profile Page</h2>
                <form action="" onSubmit={handleProfileUpdation}>
                    <div className="row">
                    <div className="col-12 justify-content-center d-flex flex-column align-items-center mb-4">
                        <div>
                            <img src={`http://localhost:8080${loggedInPatientDetails.photoUrl}`} alt="ProfilePic" style={{height:"100px",width:"100px",borderRadius:"50%"}}/>
                            
                        </div>
                        <input type="file" className="ps-5" onChange={(e)=> setPhoto(e.target.files[0])}/>
                        <span className="text-danger" style={{fontSize:"14px"}}>image size must be less than 10MB</span>
                    </div>
                    
                    
                </div>
                <div className="row justify-content-center my-5">
                    <div className="col-lg-4 px-0 px-sm-3 px-md-5 px-lg-3">
                       <div className="mb-4">
                            <label htmlFor="">First Name: </label>
                            <input type="text" name="firstName" className="form-control inputBoxBorder" placeholder="Enter first name..." value={updatedPatientDetails.firstName} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                         <label htmlFor="">Last Name: </label>
                            <input type="text" name="lastName" className="form-control inputBoxBorder" placeholder="Enter last name..." value={updatedPatientDetails.lastName} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">City: </label>
                            <input type="text" className="form-control inputBoxBorder" name="city" placeholder="Enter your city..." value={updatedPatientDetails.city} onChange={handleInputChange}/>
                        </div>
                        
                    </div>
                    <div className="col-lg-4 mb-4 px-0 px-sm-3 px-md-5 px-lg-3">
                        <div className="mb-4">
                            <label htmlFor="">Email: </label>
                            <input type="text" className="form-control inputBoxBorder" name="email" placeholder="Enter your email..." value={updatedPatientDetails.email} onChange={handleInputChange}/>
                        </div>
                       <div className="mb-4">
                            <label htmlFor="">Mobile Number: </label>
                            <input type="text" className="form-control inputBoxBorder" name="mobileNo" placeholder="Enter your number..." value={updatedPatientDetails.mobileNo} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Date of Birth: </label>
                            <input type="date" className="form-control inputBoxBorder" name="dob" value={updatedPatientDetails.dob} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <span>Gender: </span>
                            <div className="d-flex gap-lg-5 gap-3 ms-3">
                                    <div>
                                        <input type="radio" name="gender" id="male" value="MALE"  style={{width:"15px"}} checked={updatedPatientDetails.gender === "MALE"} onChange={handleInputChange}/><label htmlFor="male" >Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" value="FEMALE" style={{width:"15px"}} checked={updatedPatientDetails.gender === "FEMALE"} onChange={handleInputChange}/><label htmlFor="female">Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="other" value="OTHER" style={{width:"15px"}} checked={updatedPatientDetails.gender === "OTHER"} onChange={handleInputChange}/><label htmlFor="other">Other</label>
                                    </div>
                            </div>
                    </div>
                    <div className="d-flex mb-5 justify-content-center">
                        <div className="w-50 patUpdateFormAddress">
                            <label htmlFor="">Address: </label>
                            <textarea name="address" id="" className="form-control inputBoxBorder" placeholder="Enter address..." value={updatedPatientDetails.address} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <button className="updateProfileBtn">Update Profile</button>
                    </div>
                     
                </div>
                
                </form>
                
            </div>
        </div>
    )
}

export default UpdatePatientProfile;