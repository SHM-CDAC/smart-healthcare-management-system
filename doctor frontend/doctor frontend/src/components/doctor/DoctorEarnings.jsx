import { fetchDoctorCancelledApmts, getAllTypesOfApmts, getMyEarnings } from "../../services/doctorService";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DoctorEarnings = ()=>{

    const [earning,setEarning] = useState("");
    const [apmtHistory,setApmtHistory] = useState([]);
    const doctor = useSelector((state)=>state.loggedInDoctor);

    useEffect(()=>{
        
            const fetchApmtHistory = async()=>{
                try{
                    const response = await getAllTypesOfApmts(doctor.doctorId);
                    console.log(response.data)
                    setApmtHistory(response.data);
                }
                catch(error){
                    if(error.response)
                        toast.error(error.response.data);
                    else
                        toast.error("Server is not Reachable!");
                }
            }
            const fetchEarnings = async()=>{
                 try{
                    const response = await getMyEarnings(doctor.doctorId);
                    console.log(response.data)
                    setEarning(response.data);
                }
                catch(error){
                    if(error.response)
                        toast.error(error.response.data);
                    else
                        toast.error("Server is not Reachable!");
                }
            }
            fetchApmtHistory();
            fetchEarnings();
        },[])


    return(
         <div className="container">
            <div className="container-fluid">
                {earning === 0 ? <div> <h5 className="text-success text-center mt-lg-0 mt-5">You haven’t earned anything yet.</h5> 
                    <div className="d-flex justify-content-center">
                        <img src="/images/noEarnings.png" alt=""  style={{width:"110px",height:"150px"}}/>
                    </div>
                </div>: 
                <div>
                     <h5 className="mb-5 mt-lg-0 mt-5 text-center text-success">Great job! You’ve earned ₹{earning} so far.</h5>
                    <h5 className="mb-5 mt-lg-0 mt-5 text-center text-lg-start">Here is your appointment history.</h5>
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center">
                            {apmtHistory.map((apmt)=>(
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
                                    <p className="mb-1"><b>Booked on:</b> {apmt.bookedAt}</p>
                                    <p className="mb-1"><b>Status:</b> {apmt.status === "BOOKED" ? "BOOKED" : "Cancelled by Patient "}</p>
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

export default DoctorEarnings;