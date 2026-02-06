import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cancelMyBookedApmt, fetchPatientUpcomingApmt } from "../../services/patientService";

const PatientUpcomingApmts = ()=>{
    const [upcomingApmts,setUpcomingApmts] = useState([]);
    const patient = useSelector((state)=>state.loggedInPatient);
   
    useEffect(()=>{
        const fetchUpcomingApmts = async()=>{
            try{
                const response = await fetchPatientUpcomingApmt(patient.patientId);
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

    const handleCancellation = async(apmt)=>{
           const res = confirm("Are you sure? you want to cancel Appointment.")
           if(res){

               try{
                    const response = await cancelMyBookedApmt(patient.patientId,apmt.slotId);
                    const remainingApmts = upcomingApmts.filter((appointment)=> appointment.slotId != apmt.slotId)
                    setUpcomingApmts(remainingApmts);
                    toast.success(response.data);
               }
               catch(error){
                    if(error.response)
                        toast.error(error.response.data);
                    else 
                        toast.error("Server is not Reachable!");
               }
           }
    }
    return(
        <div className="container" >
            <div className="container-fluid">
                {upcomingApmts.length === 0 ? <h5 className="text-center mt-lg-0 mt-5">You don’t have any upcoming appointments.</h5> : 
                <div>
                    <h5 className="mb-5 mt-lg-0 mt-5 text-center text-lg-center">Here are your upcoming appointments.</h5>
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center">
                            {upcomingApmts.map((apmt)=>(
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
                                </div>
                                </div>
                                <div className="d-flex justify-content-center mb-3">
                                    <button className="cancelApmtBtn p-2" onClick={()=>handleCancellation(apmt)}>Cancel appointment</button>
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

export default PatientUpcomingApmts;