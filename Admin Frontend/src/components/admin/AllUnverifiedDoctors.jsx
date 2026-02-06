import { blockDoctorAcc, fetchAllUnverifiedDoctors, fetchRegisteredDoctorList, verifyDoctor } from "../../services/adminService";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"

const AllUnverifiedDoctors = ()=>{

     const [unverifiedDoctors,setUnverifiedDoctors] = useState([]);
     const [registeredDoctors,setRegisteredDoctors] = useState([]);
    
        useEffect(()=>{
            const fetchUnverifiedDoctorList = async()=>{
             try{
                const response = await fetchAllUnverifiedDoctors();
                console.log("Unverfied List : ",response.data)
                setUnverifiedDoctors(response.data);
            }
            catch(error){
                if(error)
                    toast.error(error.response.data);
                else
                    toast.error("Server is not Reachable!")
            }
           
        }
        const fetchRegisteredDoctors = async()=>{
                 try{
                    const response = await fetchRegisteredDoctorList();
                    console.log("List : ",response.data)
                    setRegisteredDoctors(response.data);
                }
                catch(error){
                    if(error)
                        toast.error(error.response.data);
                    else
                        toast.error("Server is not Reachable!")
                }
               
        }
        fetchRegisteredDoctors();
        fetchUnverifiedDoctorList();
        },[])
    
        const removeUnverifiedDoctors = async(doctor)=>{
            const res = confirm("Are you sure? you want to remove Doctor.");
            if(res){
                try{
                    const response = await blockDoctorAcc(doctor.doctorId);
                    console.log("RESPONSE: ", response);
                    toast.success(response.data);
                    const remainingDoctors = unverifiedDoctors.filter((d)=>d.doctorId != doctor.doctorId);
                    setUnverifiedDoctors(remainingDoctors);
                }
                catch(error){
                    console.log("ERR : ",error)
                    if(error.response)
                        toast.error(error.response.data)
                    else
                        toast.error("Server is not Reachable!");
                }
            }
        }

        const handleVerification = async(doctor)=>{
            const res = confirm("Are you sure? you want to verify this Doctor.");
            if(res){
                try{
                    const response = await verifyDoctor(doctor.doctorId);
                    toast.success(response.data);
                    const remainingDoctors = unverifiedDoctors.filter((d)=>d.doctorId != doctor.doctorId);
                    setUnverifiedDoctors(remainingDoctors);
                }
                catch(error){
                    console.log("ERR : ",error)
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
                    {registeredDoctors.length == 0 ? <div className="text-center mt-lg-0 mt-5"><h5 className="mb-4">No doctors are currently registered on the platform.</h5>
                    <img src="/images/sorry.png" alt="" style={{width:"150px",height:"150px"}}/></div> :
                    <div>
                        {unverifiedDoctors.length == 0 ? <div className="text-center"><h5 className="mb-4 text-success mt-lg-0 mt-5">All Doctors are verified </h5>
                    </div> : 
                    <div>
                    <div className="mb-5 mt-5 mt-lg-0">
                        <h3 className="text-success text-center">All doctors that are needed to be Verified.</h3>
                        <h3 className="text-success text-center">Total number of doctors: {unverifiedDoctors.length}</h3>
                    </div>
                    <div className="row ">
                        <div className="col-12 d-flex flex-wrap justify-content-center">
                            {unverifiedDoctors.map((doctor)=>(
                                <div className="doctorListContainer p-3 p-sm-4 p-lg-4 mb-3 d-md-flex gap-2 shadow-lg">
                                   <div className="text-center">
                                        <img src={`http://localhost:8080${doctor.photoUrl}`} alt="" style={{width:"150px",height:"150px",borderRadius:"5px"}} className="doctorProfilePic"/>
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
                                        <div className="mb-1">
                                        <p className="mb-0">Status: {doctor.active ? <span className="text-success">ACTIVE</span> : <span className="text-danger">IN-ACTIVE</span> } • {doctor.status == "VERIFIED" ? <span className="text-success">{doctor.status}</span> : <span className="text-danger">{doctor.status}</span> }</p>
                                    </div>
                                    <div className="mb-3">
                                       <a href={`http://localhost:8080${doctor.certUrl}`} target="_blank">View uploaded certificate</a>
                                    </div>
                                    </div> 
                                    <div className="text-center d-flex flex-column gap-2 justify-content-end ">
                                        {doctor.status !== "BLOCKED" ? <div className="text-center d-flex flex-column gap-2 justify-content-end "><button className="btn btn-success" onClick={()=>handleVerification(doctor)}>Verify Now</button>
                                         <button className="btn btn-danger" onClick={()=>removeUnverifiedDoctors(doctor)}>Remove Doctor</button></div> : <div></div> }
                                        
                                    </div>
                                </div>
                                
                            ))}
                            
                        </div>
                    </div>
                </div>} 

                    </div> 
                    }
                </div>
            </div>
        )
}

export default AllUnverifiedDoctors;