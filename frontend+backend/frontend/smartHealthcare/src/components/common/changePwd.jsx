import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../services/userService";
import { useNavigate } from "react-router";
const ChangePwd = () =>{

    const navigate = useNavigate();
    let navigateTo;
    const whoIsLoggedIn = useSelector((state) => state.loginState);
    const admin = useSelector((state)=>state.loggedInAdmin);
    const patient = useSelector((state)=>state.loggedInPatient);
    const doctor = useSelector((state)=>state.loggedInDoctor);
    let currLoggedInUser ;
    if(whoIsLoggedIn.userRole === "ADMIN"){
        currLoggedInUser = admin;
        currLoggedInUser = {...currLoggedInUser,userId:currLoggedInUser.id}
        navigateTo ="/admin/dashboard";
    }
        
    else if(whoIsLoggedIn.userRole === "PATIENT"){
        currLoggedInUser = patient;
        navigateTo = "/patient/dashboard";
    }
        
    else{
         currLoggedInUser = doctor;
         navigateTo = "/doctor/dashboard"
    }
       

    const[updatedPwd, setUpdatedPwd] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const handleOnChange =  (e) =>{
        setUpdatedPwd({...updatedPwd, [e.target.name]: e.target.value});
    }

    const handleSubmission =async ()=>{
        if(updatedPwd.oldPassword.trim() === "")
            toast.error("Please enter current password");
        else if(updatedPwd.newPassword.trim() === "")
            toast.error("Please enter new password");
        else if(updatedPwd.confirmNewPassword.trim() === "")
            toast.error("Please confirm new password");
        else if(updatedPwd.newPassword !== updatedPwd.confirmNewPassword)
            toast.error("New password and confirm new password do not match");
        else{
            try{
                const response = await changePassword(currLoggedInUser.userId,updatedPwd.oldPassword,updatedPwd.newPassword);
                toast.success(response.data);
                navigate(navigateTo);
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
        <div className="container">
            <div className="container-fluid">
               <h3 className="text-center mt-5 mt-lg-0 mb-5">Change Your Password here.</h3>
               <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <div className="changePasswordFormContainer p-lg-4 shadow-lg p-3">
                        <label htmlFor="">Current Password:</label>
                        <input type="text" placeholder="Enter your Current Password..." className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="oldPassword"/>
                        <label htmlFor="">New Password:</label>
                        <input type="password" placeholder="Enter your New Password..." className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="newPassword"/>
                        <label htmlFor="">Confirm New Password:</label>
                        <input type="password" placeholder="Confirm your New Password..." className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="confirmNewPassword"/>
                        <button className="changePasswordBtn" onClick={handleSubmission}>Submit</button>
                    </div>
                </div>
               </div>
            </div>
        </div>
    )
}

export default ChangePwd;