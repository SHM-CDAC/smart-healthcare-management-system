import { useState } from "react"
import { toast } from "react-toastify"
import { CreateAppoinmentSlot } from "../../services/doctorService"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const SlotCreation =()=>{

    const loggedInUserDetails = useSelector((state)=>state.loggedInDoctor);
    const navigate = useNavigate();
    const[slotDetails,setSlotDetails] = useState({
        startTime:"",
        endTime:"",
        date:"",
        status:"VACANT"
    })
    const handleOnChange =(e)=>{
      console.log("Output: ",e.target.value)
      setSlotDetails({...slotDetails,[e.target.name]:e.target.value});
    }
    const handleSubmission = async()=>{
        if(loggedInUserDetails.status === "VERIFIED"){
             if(slotDetails.startTime === "")
            toast.warning("Please specify start time!") 
            else if(slotDetails.endTime === "")
            toast.warning("Please specify end time!")
            else if(slotDetails.date === "")
            toast.warning("Please specify slot date!")
            else{
            try{
                const response = await CreateAppoinmentSlot(slotDetails,loggedInUserDetails.doctorId);
                toast.success(response.data);
                navigate("/doctor/dashboard")
            }
            catch(err){
                if(err.response)
                    toast.error(err.response.data);

                else
                    toast.error("Server is not Reachable!")
            }
        }
        }
        else if(loggedInUserDetails.status === "UNVERIFIED")
            toast.error("You are not verified yet by the admin.")
        else
            toast.error("Sorry,Your Account is Blocked :(")

       
    }
    return(
        <div className="container">
            <div className="container-fluid">
                <div className="row">
                    <h3 className="text-center mt-5 mt-lg-0 mb-5">Set up time slots for patient consultations.</h3>
                    <div className="col-12 d-flex justify-content-center ">
                    <div className="slotFormContainer p-lg-4 p-3 shadow-lg">
                        <label htmlFor="">Start Time:</label>
                        <input type="time" className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="startTime"/>
                        <label htmlFor="">End Time:</label>
                        <input type="time" className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="endTime"/>
                        <label htmlFor="">Date:</label>
                        <input type="date" className="form-control inputBoxBorder mb-4" onChange={handleOnChange} name="date"/>
                        <button className="createSlotBtn" onClick={handleSubmission}>Create Appointment</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SlotCreation;