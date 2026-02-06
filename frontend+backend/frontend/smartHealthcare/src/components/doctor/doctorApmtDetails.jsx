import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchDoctorApmts } from "../../services/doctorService";
import { toast } from "react-toastify";
import { addApmtDetails } from "../../store/AppointmentSlice";
import { setSelectedDoctorDetails } from "../../store/SelectedDoctorSlice";
const DoctorApmtDetails =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginState = useSelector((state)=>state.loginState);
    const doctor = useSelector((state)=>state.selectedDoctor);
    const [appointments,setAppointments] = useState([]);
    
    useEffect(()=>{

        const fetchApmts =async()=>{
            try{
            const response = await fetchDoctorApmts(doctor.doctorId);
            setAppointments(response.data);
            console.log("Apmts: ",response.data);
        }
        catch(error){
            if(error.response)
                toast.error(error.response.data)
            else
                toast.error("Server is not Reachable!")
        }
        }
        fetchApmts();
    },[])

    const handleBooking =(appointment)=>{
        if(loginState.value === false)
            toast.error("Please log in to book an appointment.")
        else if(loginState.userRole === "ADMIN"){

            toast.error("Admin cannot book an appointment");
            navigate("/admin/dashboard");
        }
        else if(loginState.userRole === "DOCTOR"){
            toast.error("Doctor cannot book an appointment");
            navigate("/doctor/dashboard");
        }
        else
        {
            console.log("Booked APMT: ",appointment)
            dispatch(addApmtDetails(appointment));
            navigate("/patient/payment");
        }

    }

     const handleSeeReviews = (doctor)=>{
            dispatch(setSelectedDoctorDetails(doctor));
            navigate("/doctor/reviews");
    }

    return(
        <div className="container">
            <div className="container-fluid">
                <div className="row ">
                    <h3 className="text-center mb-5 mt-5 mt-lg-0">Doctor Appointments Page</h3>
                        <div className="col-12 d-flex flex-wrap justify-content-center">
                                <div className="p-3 p-sm-4 p-lg-4 mb-3 d-md-flex gap-2 shadow-lg">
                                    <div className="text-center">
                                        <img src={`http://localhost:8080${doctor.photoUrl}`} alt="" style={{width:"150px",height:"150px",borderRadius:"5px"}} className="doctorProfilePic"/>
                                    </div>
                                    <div className="">
                                        <h5 className="mb-1  text-lg-start" style={{color:"#28CFFE"}}>Dr. {doctor.fullName}</h5>
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
                                    
                                </div>
                                  
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            {appointments.length === 0 ? <div className="text-danger text-center">
                                <h5>Sorry, no appointments are currently available.</h5>
                            </div> :  
                            <div className="apmtContainer p-lg-4 p-3 shadow-lg">
                                <div className="d-lg-flex justify-content-between">
                                <h5>Available Appointments</h5>
                                <span className="text-success">{appointments.length} slots available</span>
                                </div>
                                <hr className="mt-0 mb-4"/>
                                {appointments.map((apmt)=>(
                                <div>
                                <div className="d-lg-flex align-items-center justify-content-between">
                                    <div>
                                        <div>Date: <b>{apmt.date}</b></div>
                                        <div>Time: <b>{apmt.startTime.slice(0,5)} — {apmt.endTime.slice(0,5)}</b></div>
                                    </div>
                                    <div>
                                        <button className="bookNowBtn p-2 mt-2 mt-lg-0" onClick={()=>handleBooking(apmt)}>Book now</button>

                                    </div>
                                </div>
                                <hr/>
                                </div>
                                ))}
                            </div>
                            }
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default DoctorApmtDetails;