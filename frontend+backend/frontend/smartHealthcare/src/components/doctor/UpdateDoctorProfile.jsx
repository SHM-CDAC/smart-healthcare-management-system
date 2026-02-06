import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import validateDoctorUpdationForm from "../../validateDoctorProfile";
import { toast } from "react-toastify";
import { updateProfile } from "../../services/doctorService";
import { setLoggedInDoctorDetails } from "../../store/DoctorSlice";
import { useNavigate } from "react-router";

const UpdateDoctorProfile = ()=>{

    const loggedInDoctorDetails = useSelector((state)=>state.loggedInDoctor);
    const [photo,setPhoto] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updatedDoctorDetails,setUpdatedDoctorDetails] = useState({
        email:loggedInDoctorDetails.email,
        firstName:loggedInDoctorDetails.firstName,
        lastName:loggedInDoctorDetails.lastName,
        gender:loggedInDoctorDetails.gender,
        city:loggedInDoctorDetails.city,
        clinicAddress:loggedInDoctorDetails.clinicAddress,
        clinicName:loggedInDoctorDetails.clinicName,
        degree:loggedInDoctorDetails.degree,
        dob:loggedInDoctorDetails.dob,
        experience:String(loggedInDoctorDetails.experience),
        fee:String(loggedInDoctorDetails.fee),
        mobileNo:loggedInDoctorDetails.mobileNo,
        specialization:loggedInDoctorDetails.specialization,
    });

    const handleInputChange = (e)=>{
        setUpdatedDoctorDetails({...updatedDoctorDetails,[e.target.name]:e.target.value})
    }

    const handleProfileUpdation = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        const result = validateDoctorUpdationForm(updatedDoctorDetails);
        if(result == "")
        {
            formData.append(
                "profileDto",
                 new Blob([JSON.stringify(updatedDoctorDetails)],
            {type:"application/json"})
            )

            if(photo)
                formData.append("photo",photo);

            try{
                const response = await updateProfile(formData,loggedInDoctorDetails.doctorId);
                toast.success("Profile Updated Successfuly!!")
                dispatch(setLoggedInDoctorDetails(response.data))
                navigate("/doctor/dashboard")
            }
            catch(error){
                if(error.response)
                    toast.error(error.response.data)

                else
                    toast.error("Server is not Reachable!")
            }
        }
        else
            toast.warning(result);
    }
    return(
        <div className="container">
            <div className="container-fluid">
                <h2 className="text-center mt-5 mt-lg-0 mb-5">Doctor Profile Page</h2>
                <form action="" onSubmit={handleProfileUpdation}>
                    <div className="row">
                    <div className="col-12 justify-content-center d-flex flex-column align-items-center mb-4">
                        <div>
                            <img src={`http://localhost:8080${loggedInDoctorDetails.photoUrl}`} alt="ProfilePic" style={{height:"100px",width:"100px",borderRadius:"50%"}}/>
                            
                        </div>
                        <input type="file" className="ps-5" onChange={(e)=> setPhoto(e.target.files[0])}/>
                        <span className="text-danger" style={{fontSize:"14px"}}>image size must be less than 10MB</span>
                    </div>
                    
                    
                </div>
                <div className="row justify-content-center my-5">
                    <div className="col-lg-4 px-0 px-sm-3 px-md-5 px-lg-3">
                       
                       <div className="mb-4">
                            <label htmlFor="">First Name: </label>
                            <input type="text" name="firstName" className="form-control inputBoxBorder" placeholder="Enter first name..." value={updatedDoctorDetails.firstName} onChange={handleInputChange}/>
                            
                        </div>
                        <div className="mb-4">
                         <label htmlFor="">Last Name: </label>
                            <input type="text" name="lastName" className="form-control inputBoxBorder" placeholder="Enter last name..." value={updatedDoctorDetails.lastName} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">City: </label>
                            <input type="text" className="form-control inputBoxBorder" name="city" placeholder="Enter your city..." value={updatedDoctorDetails.city} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Clinic Name: </label>
                            <input type="text" className="form-control inputBoxBorder" name="clinicName" placeholder="Enter your clinic name..." value={updatedDoctorDetails.clinicName} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Experience: </label>
                            <input type="text" className="form-control inputBoxBorder" name="experience" placeholder="Enter your experience..." value={updatedDoctorDetails.experience} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 px-0 px-sm-3 px-md-5 px-lg-3">
                        <div className="mb-4">
                            <label htmlFor="">Email: </label>
                            <input type="text" className="form-control inputBoxBorder" name="email" placeholder="Enter your email..." value={updatedDoctorDetails.email} onChange={handleInputChange}/>
                        </div>
                       <div className="mb-4">
                            <label htmlFor="">Mobile Number: </label>
                            <input type="text" className="form-control inputBoxBorder" name="mobileNo" placeholder="Enter your number..." value={updatedDoctorDetails.mobileNo} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Date of Birth: </label>
                            <input type="date" className="form-control inputBoxBorder" name="dob" value={updatedDoctorDetails.dob} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="">Degree: </label>
                            <input type="text" className="form-control inputBoxBorder" name="degree" placeholder="Enter your degree..." value={updatedDoctorDetails.degree} onChange={handleInputChange}/>
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="">Specialization: </label>
                            <input type="text" className="form-control inputBoxBorder" name="specialization" placeholder="Enter your specialization..." value={updatedDoctorDetails.specialization} onChange={handleInputChange}/>
                        </div> */}
                
                    <label htmlFor="">Specialization: </label>
                    <select id="speciality" name="specialization" className="form-select" style={{border:"1px solid grey"}} onChange={handleInputChange}>
                        <option value="">Select Speciality...</option>
                        <option value="General Physician" selected={updatedDoctorDetails.specialization === "General Physician"}>General Physician</option>
                        <option value="Family Medicine" selected={updatedDoctorDetails.specialization === "Family Medicine"}>Family Medicine</option>
                        <option value="Internal Medicine" selected={updatedDoctorDetails.specialization === "Internal Medicine"}>Internal Medicine</option>
                        <option value="Cardiologist" selected={updatedDoctorDetails.specialization === "Cardiologist"}>Cardiologist</option>
                        <option value="Neurologist" selected={updatedDoctorDetails.specialization === "Neurologist"}>Neurologist</option>
                        <option value="Endocrinologist" selected={updatedDoctorDetails.specialization === "Endocrinologist"}>Endocrinologist</option>
                        <option value="Gastroenterologist" selected={updatedDoctorDetails.specialization === "Gastroenterologist"}>Gastroenterologist</option>
                        <option value="Pulmonologist" selected={updatedDoctorDetails.specialization === "Pulmonologist"}>Pulmonologist</option>
                        <option value="Nephrologist" selected={updatedDoctorDetails.specialization === "Nephrologist"}>Nephrologist</option>
                        <option value="Rheumatologist" selected={updatedDoctorDetails.specialization === "Rheumatologist"}>Rheumatologist</option>
                        <option value="Oncologist" selected={updatedDoctorDetails.specialization === "Oncologist"}>Oncologist</option>
                        <option value="General Surgeon" selected={updatedDoctorDetails.specialization === "General Surgeon"}>General Surgeon</option>
                        <option value="Orthopedic Surgeon" selected={updatedDoctorDetails.specialization === "Orthopedic Surgeon"}>Orthopedic Surgeon</option>
                        <option value="Neurosurgeon" selected={updatedDoctorDetails.specialization === "Neurosurgeon"}>Neurosurgeon</option>
                        <option value="Plastic Surgeon" selected={updatedDoctorDetails.specialization === "Plastic Surgeon"}>Plastic Surgeon</option>
                        <option value="Vascular Surgeon" selected={updatedDoctorDetails.specialization === "Vascular Surgeon"}>Vascular Surgeon</option>
                        <option value="Gynecologist / Obstetrician" selected={updatedDoctorDetails.specialization === "Gynecologist / Obstetrician"}>
                         Gynecologist / Obstetrician
                        </option>
                        <option value="Pediatrician" selected={updatedDoctorDetails.specialization === "Pediatrician"}>Pediatrician</option>
                        <option value="Pediatric Surgeon" selected={updatedDoctorDetails.specialization === "Pediatric Surgeon"}>Pediatric Surgeon</option>
                        <option value="ENT Specialist" selected={updatedDoctorDetails.specialization === "ENT Specialist"}>ENT Specialist</option>
                        <option value="Ophthalmologist" selected={updatedDoctorDetails.specialization === "Ophthalmologist"}>Ophthalmologist</option>
                        <option value="Dentist" selected={updatedDoctorDetails.specialization === "Dentist"}>Dentist</option>
                        <option value="Oral & Maxillofacial Surgeon" selected={updatedDoctorDetails.specialization === "Oral & Maxillofacial Surgeon"}>
                         Oral & Maxillofacial Surgeon
                        </option>
                        <option value="Psychiatrist" selected={updatedDoctorDetails.specialization === "Psychiatrist"}>Psychiatrist</option>
                        <option value="Psychologist" selected={updatedDoctorDetails.specialization === "Psychologist"}>Psychologist</option>
                        <option value="Dermatologist" selected={updatedDoctorDetails.specialization === "Dermatologist"}>Dermatologist</option>
                        <option value="Cosmetologist" selected={updatedDoctorDetails.specialization === "Cosmetologist"}>Cosmetologist</option>
                        <option value="Radiologist" selected={updatedDoctorDetails.specialization === "Radiologist"}>Radiologist</option>
                        <option value="Pathologist" selected={updatedDoctorDetails.specialization === "Pathologist"}>Pathologist</option>
                        <option value="Anesthesiologist" selected={updatedDoctorDetails.specialization === "Anesthesiologist"}>Anesthesiologist</option>
                        <option value="Physiotherapist" selected={updatedDoctorDetails.specialization === "Physiotherapist"}>Physiotherapist</option>
                        <option value="Dietitian / Nutritionist" selected={updatedDoctorDetails.specialization === "Dietitian / Nutritionist"}>
                            Dietitian / Nutritionist
                        </option>
                        <option value="Ayurveda Practitioner" selected={updatedDoctorDetails.specialization === "Ayurveda Practitioner"}>
                            Ayurveda Practitioner
                        </option>
                        <option value="Homeopathy Doctor" selected={updatedDoctorDetails.specialization === "Homeopathy Doctor"}>Homeopathy Doctor</option>
                    </select>
                
                    </div>
                    <div className="d-flex justify-content-center mb-4 align-items-center gap-4 gap-md-5 gap-lg-5">
                        <div className="mb-4">
                            <label htmlFor="">Fee: </label>
                            <input type="text" className="form-control inputBoxBorder" name="fee" placeholder="Enter your fee..." value={updatedDoctorDetails.fee} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <span>Gender: </span>
                            <div className="d-flex gap-lg-5 gap-3 ms-3">
                                    <div>
                                        <input type="radio" name="gender" id="male" value="MALE"  style={{width:"15px"}} checked={updatedDoctorDetails.gender === "MALE"} onChange={handleInputChange}/><label htmlFor="male" >Male</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="female" value="FEMALE" style={{width:"15px"}} checked={updatedDoctorDetails.gender === "FEMALE"} onChange={handleInputChange}/><label htmlFor="female">Female</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="gender" id="other" value="OTHER" style={{width:"15px"}} checked={updatedDoctorDetails.gender === "OTHER"} onChange={handleInputChange}/><label htmlFor="other">Other</label>
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="d-flex mb-5 justify-content-center">
                        <div className="w-50 patUpdateFormAddress">
                            <label htmlFor="">Clinic Address: </label>
                            <textarea name="clinicAddress" id="" className="form-control inputBoxBorder" placeholder="Enter address..." value={updatedDoctorDetails.clinicAddress} onChange={handleInputChange} />
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

export default UpdateDoctorProfile ;