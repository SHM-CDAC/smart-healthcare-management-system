import { fetchDoctorUpcomingApmts } from "../../services/doctorService";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DoctorUpcomingApmts = ()=>{
    const [upcomingApmts,setUpcomingApmts] = useState([]);
    const doctor = useSelector((state)=>state.loggedInDoctor);
   
    useEffect(()=>{
        const fetchUpcomingApmts = async()=>{
            try{
                const response = await fetchDoctorUpcomingApmts(doctor.doctorId);
                console.log(response.data)
                setUpcomingApmts(response.data);
            }
            catch(error){
                if(error.response)
                    toast.error(error.response.data);
                else
                    toast.error("Server is not Reachable!");
            }
        }
        fetchUpcomingApmts();
    },[])

    return(
        <div className="container" >
            <div className="container-fluid">
                {upcomingApmts.length === 0 ? <h5 className="text-center mt-lg-0 mt-5">You don’t have any upcoming appointments.</h5> : 
                <div>
                    <h5 className="mb-5 mt-lg-0 mt-5 text-center text-lg-start text-success">Here are your upcoming appointments.</h5>
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center">
                            {upcomingApmts.map((apmt)=>(
                                <div className="shadow-lg">
                                <div className="d-lg-flex gap-3 p-3">
                                <div className="mb-1 p-2 shadow-lg">
                                    <h5>Patient Details:</h5>
                                    <h5 className="mb-1" style={{color:"#28CFFE"}}>{apmt.patientName}</h5>
                                    <p className="mb-1 text-muted">{apmt.gender} • {apmt.mobileNo}</p>
                                    <p className="mb-1">dob: {apmt.dob}</p>
                                    <p className="mb-1">{apmt.city}</p>
                                    <p className="mb-1">Address: {apmt.address}</p>
                                </div>
                                <div className="p-2 shadow-lg mb-1">
                                    <p className="mb-1"><b>Appointment Time:</b> {apmt.startTime.slice(0,5)} — {apmt.endTime.slice(0,5)}</p>
                                    <p className="mb-1"><b>Appointment date:</b> {apmt.date}</p>
                                    <p className="mb-1"><b>Fees Paid:</b> {apmt.fee}</p>
                                    <p className="mb-1"><b>Booked At:</b> {apmt.bookedAt}</p>
                                </div>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> 
                }
                
            </div>
        </div>
    )
}

export default DoctorUpcomingApmts;