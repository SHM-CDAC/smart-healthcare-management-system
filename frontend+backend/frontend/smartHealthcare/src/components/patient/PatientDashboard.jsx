import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteMyAccount, fetchPatient } from "../../services/patientService";
import { clearLoggedInPatientDetails, setLoggedInPatientDetails } from "../../store/PatientSlice";
import { useEffect } from "react";
import { login, logout } from "../../store/LoginStateSlice";

const PatientDetails =()=>{

    const loggedInDetails = useSelector((state)=>state.loggedInPatient);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
            const fetchPatientDetails = async()=>{
                        try{
                            console.log("------Fetching Patient Details------")
                            const response = await fetchPatient();
                            console.log("RESP: ",response.data);
                            dispatch(setLoggedInPatientDetails(response.data));
                            dispatch(login({value:true,userRole:"PATIENT"}))
                            console.log("------Details Fetched------")
                        }
                        catch(error)
                        {
                            console.log("---ERR: ",error)
                            if(error.response)
                                toast.error(error.response.data);
                            else
                                toast.error("Server is not Reachable!")
                        }
                    }
                    fetchPatientDetails();
        },[])

     const deletePatientAcc = async()=>{
            const res = confirm("Are you sure? you want to delete your Account.");
                if(res){
                     try{
                        const response = await deleteMyAccount(loggedInDetails.patientId);
                        localStorage.removeItem("token");
                        toast.success(response.data);
                        dispatch(clearLoggedInPatientDetails());
                        dispatch(logout({value:false, userRole:"", userName:""}))
                        navigate("/home");
                    }
                    catch(error){
                        console.log("ERR: ",error)
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
                <div className="row mb-lg-5 mb-4">
                    <div className="col-12">
                        <h2 className="text-center mt-5 mt-lg-0 DashboardHeading">Hi {loggedInDetails.firstName}, your Health Journey Starts here.</h2>
                    </div>
                </div>
                <div className="row justify-content-center gap-4 gap-lg-0">
                    <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
                        <div className="dashboardContainers p-4 shadow-lg">
                            <h5><img src="/images/appointment.png" alt="" style={{width:"30px", height:"30px",marginRight:"5px"}}/>Quick Actions: </h5>
                            <div className="ms-1 mt-3">
                                <ul style={{listStyle:"none"}} className="d-flex flex-column gap-3">
                                    
                                    <li>
                                        <Link className="dashboardLinks" to={"/home"}><img src="/images/appointment-book.png" alt="" style={{width:"25px", height:"25px"}} className="me-2"/>Book a new Appointment <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                    
                                    
                                    <li >
                                        <Link className="dashboardLinks" to={"/patient/update"}><img src="/images/profile.png" alt="" style={{width:"25px", height:"25px"}} className="me-2"/>Update Profile <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                        
                                    </li>
                                    <li >
                                        <Link className="dashboardLinks" to={"/patient/appointment/upcoming"}><img src="/images/calendar.png" alt="" style={{width:"23px", height:"25px"}} className="me-2"/>My Upcoming Appointments<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                        
                                    </li>   
                                    <li >
                                        <Link className="dashboardLinks" to={"/patient/appointment/history"}><img src="/images/history.png" alt="" style={{width:"25px", height:"25px"}} className="me-2"/>View Appointment History<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                    <li >
                                        <Link className="dashboardLinks" to={"/patient/appointment/cancelled/history"}><img src="/images/cancellation.png" alt="" style={{width:"25px", height:"25px"}} className="me-2"/>Cancelled Appointment History<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
                         <div className="dashboardContainers p-4 shadow-lg">
                            <h5><img src="/images/settings.png" alt="" style={{width:"25px", height:"25px",marginRight:"5px"}}/>Account Settings: </h5>
                            <div className="ms-1 mt-3">
                                <ul style={{listStyle:"none"}} className="d-flex flex-column gap-3">
                                    <li >
                                        <Link className="dashboardLinks" to={"/user/changePassword"}><img src="/images/password.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>Change Password <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                       
                                    </li>
                                    <li >
                                        <Link className="dashboardLinks" onClick={deletePatientAcc}><img src="/images/delete.png" alt="" style={{width:"23px", height:"20px"}} className="me-2"/>Delete Account <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Link style={{textDecoration:"none"}} to={"/user/feedback"}>
                <div className="d-flex justify-content-center mt-5 gap-2 align-items-center">
                    <img src="/images/chat.png" alt="" style={{width:"35px", height:"35px"}} />
                <h5 className="">Help Us Improve — Share Your Feedback</h5>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default PatientDetails;