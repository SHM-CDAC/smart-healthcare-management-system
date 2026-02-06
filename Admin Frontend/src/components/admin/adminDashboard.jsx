import { useSelector } from "react-redux"
import { Link } from "react-router-dom";    
import { fetchAdmin } from "../../services/adminService";
import { setLoggedInAdminDetails } from "../../store/AdminSlice";
import { useEffect } from "react";
import { login } from "../../store/LoginStateSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const AdminDashboard = () => {
    const loggedInDetails = useSelector((state)=>state.loggedInAdmin);
    console.log("Logged in admin details:", loggedInDetails);
    const dispatch = useDispatch();

     useEffect(()=>{
                const fetchAdminDetails = async()=>{
                            try{
                                console.log("------Fetching Admin Details------")
                                const response = await fetchAdmin();
                                console.log("aaa",response.data);
                                dispatch(setLoggedInAdminDetails(response.data));
                                dispatch(login({value:true,userRole:"ADMIN"}))
                                console.log("------Details Fetched------")
                            }
                            catch(error)
                            {   console.log("ERR: ",error)
                                if(error.response)
                                    toast.error(error.response);
                                else
                                    toast.error("Server is not Reachable!")
                            }
                        }
                        fetchAdminDetails();
        },[])

     return(
        <div className="container">
            <div className="container-fluid">
                <div className="row mb-lg-5 mb-4">
                    <div className="col-12">
                        <h2 className="text-center mt-5 mt-lg-0 DashboardHeading">Welcome Admin, your control center starts here.</h2>
                    </div>
                </div>
                <div className="row justify-content-center gap-4 gap-lg-0">
                    <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
                        <div className="dashboardContainers p-4 ">
                            <h5><img src="/images/appointment.png" alt="" style={{width:"30px", height:"30px",marginRight:"5px"}}/>Quick Actions: </h5>
                            <div className="ms-1 mt-3">
                                <ul style={{listStyle:"none"}} className="d-flex flex-column gap-3 ">
                                    
                                    <li>
                                        <Link className="dashboardLinks" to={"/admin/doctors"}><img src="/images/stethoscope.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>View Registered Doctors<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                    
                                    
                                    <li >
                                        <Link className="dashboardLinks" to={"/admin/patients"}><img src="/images/patientList.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>View Registered Patients<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                        
                                    </li>
                                    <li >
                                        <Link className="dashboardLinks" to={"/admin/doctors/unverified"}><img src="/images/verify.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>Verify Registered Doctors <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                        
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
                         <div className="dashboardContainers p-4">
                            <h5><img src="/images/settings.png" alt="" style={{width:"25px", height:"25px",marginRight:"5px"}}/>Account Settings: </h5>
                            <div className="ms-1 mt-3">
                                <ul style={{listStyle:"none"}} className="d-flex flex-column gap-3">
                                    <li >
                                        <Link className="dashboardLinks" to={"/user/changePassword"}><img src="/images/password.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>Change Password <img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                    <li >
                                        <Link className="dashboardLinks" to={"/admin/update"}><img src="/images/profile.png" alt="" style={{width:"26px", height:"26px"}} className="me-2"/>Update Profile<img src="/images/next.png" alt="" style={{width:"18px", height:"18px",marginLeft:"5px"}}/></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AdminDashboard;