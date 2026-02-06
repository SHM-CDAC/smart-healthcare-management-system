import { useState ,useEffect} from "react";
import { useSelector } from "react-redux";
import { fetchMyReviews } from "../../services/doctorService";
import { toast } from "react-toastify";
import { addReviewForDoctor } from "../../services/patientService";
import { useNavigate } from "react-router-dom";


const DoctorReviews = ()=>{
    const navigate = useNavigate();
    const loginState = useSelector((state)=>state.loginState);
    const doctor = useSelector((state)=>state.selectedDoctor);
    const patient = useSelector((state)=>state.loggedInPatient);
    const [story,setStory] = useState("");
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
            
            const fetchReviews =async()=>{
                try{
                const response = await fetchMyReviews(doctor.doctorId);
                setReviews(response.data);
                console.log("reviewsss: ",response.data);
            }
            catch(error){
                if(error.response)
                    toast.error(error.response.data)
                else
                    toast.error("Server is not Reachable!")
            }
            }
            fetchReviews();
        },[])

    const handleOnChange = (e)=>{
        setStory(e.target.value);
    }

    const handleSubmit = async()=>{
        if(loginState.value == false)
            toast.warning("Please log in first.");
        else if(loginState.userRole == "DOCTOR")
            toast.warning("Doctors cannot give review.");
        else if(loginState.userRole == "ADMIN")
            toast.warning("Admin cannot give review.")
        else{
        if(story.trim() == "")
            toast.warning("Please enter your experience.");
        else{
            try{
                const payload = {
                    doctorId: doctor.doctorId,
                    patientId: patient.patientId,
                    story:story
                }
                const response = await addReviewForDoctor(payload);
                toast.success(response.data);
                navigate("/patient/dashboard");
            }
            catch(error)
            {
                if(error.response)
                    toast.error(error.response.data);
                else
                    toast.error("Server is not Reachable!");
            }
        }
    }
    }
    
    return(
        <div className="container">
            <div className="container-fluid">
                {reviews.length === 0 ? <div><h5 className="text-danger mt-5 mt-lg-0 text-lg-start text-center">This doctor hasn’t received any reviews yet. Be the first to leave one!</h5>
                <h5 className="text-center mt-5">Write your Experience with Dr. {doctor.fullName}</h5>
                    <div className="d-flex justify-content-center">
                        <div className="ReviewMsgContainer p-4 shadow-lg">
                            <p className="mb-0">Write your story: </p>
                            <textarea name="story" id="" onChange={handleOnChange} value={story} className="form-control reviewStory"></textarea>
                            <div className="mt-3 d-flex justify-content-center">
                            <button onClick={handleSubmit} className="reviewBtn ">Submit</button>
                            </div>
                        </div>
                    </div>
                    </div>:
                <div className="row">
                    <h4 className="text-success mt-5 mt-lg-0 text-lg-start text-center">All patient reviews for Dr. {doctor.fullName}</h4>
                    <div className="col-12 mt-5 d-flex flex-wrap gap-1 gap-md-3 gap-lg-3 justify-content-center">
                        {reviews.map((review)=>(
                            <div className="d-flex gap-2 shadow-lg p-3 mb-3">
                                <div>
                                    <img src={`http://localhost:8080${review.photoUrl}`} alt="" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                                </div>
                                <div>
                                    <h5 className="mb-1" style={{color:"#28CFFE"}}>{review.patientName}</h5>
                                    <p className="mb-1 text-muted">{review.dateAndTime}</p> 
                                    <p><b>{review.story}</b></p>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                    <hr />
                    <h5 className="text-center mt-5">Write your Experience with Dr. {doctor.fullName}</h5>
                    <div className="d-flex justify-content-center">
                        <div className="ReviewMsgContainer p-2 p-lg-4 shadow-lg">
                            <p className="mb-0">Write your story: </p>
                            <textarea name="story" id="" onChange={handleOnChange} value={story} className="form-control reviewStory"></textarea>
                            <div className="mt-3 d-flex justify-content-center">
                            <button onClick={handleSubmit} className="reviewBtn ">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default DoctorReviews;