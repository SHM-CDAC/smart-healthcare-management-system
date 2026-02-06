import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchPatientCancelledApmtHistory } from "../../services/patientService";

const PatientCancelledApmts = ()=>{
    const [apmtHistory,setApmtHistory] = useState([]);
    const patient = useSelector((state)=>state.loggedInPatient);

    useEffect(()=>{
        
            const fetchApmtHistory = async()=>{
                try{
                    const response = await fetchPatientCancelledApmtHistory(patient.patientId);
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
            fetchApmtHistory();
        },[])

    return(
         <div className="container">
            <div className="container-fluid">
                {apmtHistory.length === 0 ? <h5 className="text-center text-success mt-lg-0 mt-5">You don’t have any cancelled appointment.</h5> : 
                <div>
                    <h5 className="mb-5 mt-lg-0 mt-5 text-center text-lg-center text-danger">Here is your cancelled appointment history.</h5>
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center">
                            {apmtHistory.map((apmt)=>(
                                <div className="shadow-lg">
                                <div className="d-lg-flex gap-3 p-3">
                                <div className="mb-1 p-2 shadow-lg">
                                    <h5 className="mb-1" style={{color:"#28CFFE"}}>Dr. {apmt.doctorName}</h5>
                                    <p className="mb-1 text-muted">{apmt.speciality} • {apmt.degree}</p>
                                    <p className="mb-1">{apmt.city} • {apmt.clinicName}</p>
                                    <p className="mb-1">{apmt.clinicAddress} • {apmt.mobileNo}</p>
                                </div>
                                <div className="p-2 shadow-lg mb-1">
                                    <p className="mb-1"><b>Appointment Time:</b> {apmt.startTime.slice(0,5)} — {apmt.endTime.slice(0,5)}</p>
                                    <p className="mb-1"><b>Appointment date:</b> {apmt.date}</p>
                                    <p className="mb-1"><b>Fees Paid:</b> {apmt.fee}</p>
                                    <p className="mb-1"><b>Booked on:</b> {apmt.bookedAt}</p>
                                    <p className="mb-1"><b>Status:</b> {apmt.status === "CANCELLED_BY_PATIENT" ? "CANCELLED BY YOU":"CANCELLED BY DOCTOR"}</p>
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

export default PatientCancelledApmts;