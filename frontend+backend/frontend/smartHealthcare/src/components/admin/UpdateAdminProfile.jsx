import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdminProfile } from "../../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setLoggedInAdminDetails } from "../../store/AdminSlice";

const UpdateAdminProfile = ()=>{
    const dispatch = useDispatch();
    const admin = useSelector((state)=>state.loggedInAdmin);
    const navigate = useNavigate();
    const [adminDetails,setAdminDetails] = useState({
        email:admin.email
    })

    const handleInputChange =(e)=>{
        setAdminDetails({email:e.target.value});
    }

    const handleUpdation = async()=>{
         try{
                const payload = {
                    email:adminDetails.email
                }
                const response = await updateAdminProfile(payload);
                toast.success("Email updated successfully!");
                dispatch(setLoggedInAdminDetails(response.data));
                navigate("/admin/dashboard");
        }
        catch(error)
        {
            if(error.response)
                toast.error(error.response.data);
            else
                toast.error("Server is not Reachable!");
        }
    }

    return(
        <div className="container">
            <div className="container-fluid">
                <h2 className="text-center mt-5 mt-lg-0 mb-5">Admin Profile Page</h2>
                <div className="row justify-content-center my-5">
                   <div className="col-lg-4 px-0 px-sm-3 px-md-5 px-lg-3">
                        <div className="mb-4">
                            <label htmlFor="">Email: </label>
                            <input type="text" className="form-control inputBoxBorder" name="email" placeholder="Update your email..." value={adminDetails.email} onChange={handleInputChange}/>
                        </div>
                   </div>
                   <div className="d-flex justify-content-center ">
                        <button className="updateProfileBtn" onClick={handleUpdation}>Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAdminProfile;