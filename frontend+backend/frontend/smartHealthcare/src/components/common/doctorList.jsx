import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedDoctorDetails } from "../../store/SelectedDoctorSlice";
const DoctorList = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doctors = useSelector((state)=>state.doctorList);
    console.log("doctor data length: ",doctors.length)

    const handleBookAppointment =(doctor)=>{
        
        dispatch(setSelectedDoctorDetails(doctor));
        navigate("/doctor/appointments");
       
    }

    const handleSeeReviews = (doctor)=>{
        dispatch(setSelectedDoctorDetails(doctor));
        navigate("/doctor/reviews");
    }

    return(
        <div className="container">
            <div className="container-fluid">
                {doctors.length == 0 ? <div className="text-center"><h5 className="mb-4 text-danger">Sorry, no doctors are currently available in your city.</h5>
                <img src="/images/sorry.png" alt="" style={{width:"150px",height:"150px"}}/></div> : 
                <div>
                    <div className="mb-5 mt-5 mt-lg-0">
                        <h3 className="text-success">There are {doctors.length} doctor available in your city.</h3>
                        <span>Book appointments with minimum wait-time & verified doctors.</span>
                    </div>
                    <div className="row ">
                        <div className="col-12 d-flex flex-wrap justify-content-center">
                            {doctors.map((doctor)=>(
                                <div className="doctorListContainer p-3 p-sm-4 p-lg-4 mb-3 d-md-flex gap-2 shadow-lg">
                                    <div>
                                        <img src={`http://localhost:8080${doctor.photoUrl}`} alt="" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                                    </div>
                                    <div className="">
                                        <h5 className="mb-1" style={{color:"#28CFFE"}}>Dr. {doctor.fullName}</h5>
                                        <p className="mb-1">{doctor.specialization} • {doctor.degree}</p>
                                        <div className="d-flex mb-1 gap-4">
                                           <p className="mb-0 text-muted">{doctor.experience} years experience overall</p> 
                                           <p className="mb-0 text-muted">₹{doctor.fee} Consultation fee at clinic</p> 
                                        </div>
                                        <div  className="d-flex mb-1 gap-1">
                                            <p className="mb-0">{doctor.city} </p>
                                            <p className="mb-0"> • {doctor.clinicName}</p>
                                        </div>
                                        <div className="d-flex mb-1 gap-4">
                                            <p className="mb-0">Contact no. {doctor.mobileNo} </p>
                                        </div>
                                        <div className="d-flex mb-1 gap-4">
                                            <p className="mb-0">{doctor.clinicAddress} </p>
                                        </div>
                                        <p className="text-center mt-4">
                                            <span className="text-info seeReviewsLink" style={{textDecoration:"underline"}} onClick={()=>handleSeeReviews(doctor)}>See Reviews</span>
                                        </p>
                                    </div>
                                    
                                    <div className="d-flex flex-column justify-content-end">
                                        
                                        <button className="bookApmtBtn" onClick={()=> handleBookAppointment(doctor)}>Book Appointment</button>
                                    </div>
                                    
                                </div>
                                
                            ))}
                            
                        </div>
                    </div>
                </div> }
            </div>
        </div>
    )

}

export default DoctorList;