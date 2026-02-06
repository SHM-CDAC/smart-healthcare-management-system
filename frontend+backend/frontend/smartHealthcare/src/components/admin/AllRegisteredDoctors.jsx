import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { blockDoctorAcc, fetchRegisteredDoctorList } from "../../services/adminService";
const AllRegisteredDoctors = ()=>{
    const [registeredDoctors,setRegisteredDoctors] = useState([]);
    
    useEffect(()=>{
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
    },[])

    const removeRegisteredDoctor =async(doctor)=>{
        const res = confirm("Are you sure? you want to remove Doctor.");
        if(res){
            try{
                const response =await blockDoctorAcc(doctor.doctorId);
                toast.success(response.data);
                const remainingDoctors = registeredDoctors.filter((d)=>d.doctorId != doctor.doctorId);
                setRegisteredDoctors(remainingDoctors);
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
                {registeredDoctors.length == 0 ? <div className="text-center mt-lg-0 mt-5"><h5 className="mb-4">No doctors are currently registered on the platform.</h5>
                <img src="/images/sorry.png" alt="" style={{width:"150px",height:"150px"}}/></div> : 
                <div>
                    <div className="mb-5 mt-5 mt-lg-0">
                        <h3 className="text-success text-center">All doctors registered on the platform.</h3>
                        <h3 className="text-success text-center">Total number of doctors: {registeredDoctors.length}</h3>
                    </div>
                    <div className="row ">
                        <div className="col-12 d-flex flex-wrap justify-content-center">
                            {registeredDoctors.map((doctor)=>(
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
                                        <div className="mb-3">
                                        <p className="mb-0">Status: {doctor.active ? <span className="text-success">ACTIVE</span> : <span className="text-danger">IN-ACTIVE</span> } • {doctor.status == "VERIFIED" ? <span className="text-success">{doctor.status}</span> : <span className="text-danger">{doctor.status}</span> }</p>
                                    </div>
                                    
                                    </div> 
                                    
                                    <div className="text-center">
                                        {doctor.status !== "BLOCKED" ? <div><button className="btn btn-danger" onClick={()=>removeRegisteredDoctor(doctor)}>Remove Doctor</button></div> : <div className="text-danger">REMOVED</div> }
                                        
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

export default AllRegisteredDoctors;