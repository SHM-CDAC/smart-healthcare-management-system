import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { blockPatientAcc, fetchRegisteredPatient } from "../../services/adminService";

const AllRegisteredPatients = ()=>{
    const [registeredPatients,setRegisteredPatients] = useState([]);
    
        useEffect(()=>{
            const fetchRegisteredPatients = async()=>{
             try{
                const response = await fetchRegisteredPatient();
                console.log("List : ",response.data)
                setRegisteredPatients(response.data);
            }
            catch(error){
                if(error)
                    toast.error(error.response.data);
                else
                    toast.error("Server is not Reachable!")
            }
           
        }
         fetchRegisteredPatients();
        },[])
    
        const removeRegisteredPatient = async(patient)=>{
            const res = confirm("Are you sure? you want to remove Doctor.");
            if(res){
                 try{
                     const response = await blockPatientAcc(patient.patientId);
                     toast.success(response.data);
                     const remainingPatients = registeredPatients.filter((p)=>p.patientId != patient.patientId);
                     setRegisteredPatients(remainingPatients);
                  }
                 catch(error){
                     if(error.response)
                        toast.error(error.response.data)
                     else
                        toast.error("Server is not Reachable!");
                 }
            }
        }


        return(
            <div className="container">
                <div className="container-fluid">
                {registeredPatients.length == 0 ? <div className="text-center mt-lg-0 mt-5"><h5 className="mb-4">No Patients are currently registered on the platform.</h5>
                <img src="/images/sorry.png" alt="" style={{width:"150px",height:"150px"}}/></div> : 
                <div>
                    <div className="mb-5 mt-5 mt-lg-0">
                        <h3 className="text-success text-center">All patients registered on the platform.</h3>
                        <h3 className="text-success text-center">Total number of patients: {registeredPatients.length}</h3>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap gap-5 justify-content-center">
                            {registeredPatients.map((patient)=>(
                                <div className="shadow-lg">
                                <div className="d-lg-flex gap-3 p-3">
                                <div className="text-center">
                                        <img src={`http://localhost:8080${patient.photoUrl}`} alt="" style={{width:"140px",height:"140px",borderRadius:"5px"}} className="doctorProfilePic"/>
                                </div>
                                <div className="mb-1 p-2">
                                    <h5>Patient Details:</h5>
                                    <h5 className="mb-1" style={{color:"#28CFFE"}}>{patient.fullName}</h5>
                                    <p className="mb-1 text-muted">{patient.gender} • {patient.mobileNo}</p>
                                    <p className="mb-1">dob: {patient.dob}</p>
                                    <p className="mb-1">{patient.city}</p>
                                    <p className="mb-1">Address: {patient.address}</p>
                                    <div className="mb-2">
                                        <p className="mb-0">Status: {patient.active ? <span className="text-success">ACTIVE</span> : <span className="text-danger">IN-ACTIVE</span> } • {patient.status == "VERIFIED" ? <span className="text-success">{patient.status}</span> : <span className="text-danger">{patient.status}</span> }</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {patient.status !== "BLOCKED" ? <div><button className="btn btn-danger" onClick={()=>removeRegisteredPatient(patient)}>Remove Patient</button></div> : <div className="text-danger">REMOVED</div>}
                                        
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

export default AllRegisteredPatients;