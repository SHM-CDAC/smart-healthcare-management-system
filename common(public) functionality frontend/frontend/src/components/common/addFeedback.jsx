import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUserFeedback } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const AddFeedback=()=>{
    const navigate= useNavigate()
    const [feedbackData,setFeedbackData] = useState({
        message:"",
        role:""
    })
    const doctor = useSelector((state)=>state.loggedInDoctor);
    const patient = useSelector((state)=>state.loggedInPatient);
    const loginState = useSelector((state)=>state.loginState);

    const handleOnChange =(e)=>{
        setFeedbackData({...feedbackData,[e.target.name]:e.target.value});
    }
    const handleFeedbackSubmission = async(e)=>{
        e.preventDefault();
        if(feedbackData.message.trim() === "")
            toast.warning("Please enter the message!")
        else{
            if(loginState.userRole === "PATIENT")
            {
              try{
                const payload ={
                    ...feedbackData,
                    role:"ROLE_PATIENT"
                }
               
                const response = await addUserFeedback(payload,patient.patientId);
                
                toast.success(response.data);
                navigate("/patient/dashboard")
              }   
              catch(error)
              {
                console.log("ERR: ",error)
                if(error.response)
                    toast.error(error.response.data)
                else
                    toast.error("Server is not Reachable!")
              }
            }
            else {
                try{
                    const payload ={
                    ...feedbackData,
                    role:"ROLE_DOCTOR"
                }
                    const response = await addUserFeedback(payload,doctor.doctorId)
                    toast.success(response.data);
                    navigate("/doctor/dashboard");
                }
                catch(error){
                    console.log("ERR: ",error)
                    if(error.response)
                    toast.error(error.response.data)
                    else
                    toast.error("Server is not Reachable!")
                }
            }
        }
    }
    return(
        <div className="container">
            <div className="container-fluid">
                <div className="text-center">
                <h3 className="mb-5 mt-5 mt-lg-0">Feedback Page</h3>
                <h4>We Value your Opinion.</h4>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="feedbackFormContainer d-flex flex-column justify-content-center p-3 p-lg-5">
                            <h5>Kindly take a moment to tell us what you think...</h5>
                            <textarea name="message" id="" placeholder="Enter your feedback message...." value={feedbackData.message} onChange={handleOnChange}></textarea>
                            <button className="feedbackSubmitBtn mt-3" onClick={handleFeedbackSubmission}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFeedback;