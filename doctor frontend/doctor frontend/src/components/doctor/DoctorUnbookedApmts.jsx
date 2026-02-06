import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { cancelDoctorUnbookedSlot, fetchUnbookedApmtsForDoctor } from "../../services/doctorService";

const DoctorUnbookedApmts = ()=>{

    const [slots,setSlots] = useState([]);
    const doctor = useSelector((state)=>state.loggedInDoctor);

    useEffect(()=>{
        const fetchVacantApmts = async()=>{
            try{
                const response = await fetchUnbookedApmtsForDoctor(doctor.doctorId);
                console.log(response.data);
                setSlots(response.data);
            }
            catch(error)
            {
                if(error.response)
                    toast.error(error.response);
                else
                    toast.error("Server is not Reachable!")
            }
        }
        fetchVacantApmts();
    },[])

    const handleCancellation = (slot)=>{
         const res = confirm("Are you sure? you want to cancel slot.")
        if(res){
            try{
                const response = cancelDoctorUnbookedSlot(slot.id);
                toast.success(response.data);
                const remainingSlots = slots.filter((s) => s.id != slot.id);
                setSlots(remainingSlots);
            }
            catch(error){
                if(error.response)
                    toast.error(error.response.data);
                else
                    toast.error("Server is not Reachable!")
            }
        }
    }

    return (
        <div className="container">
            <div className="container-fluid">
                {slots.length === 0 ? <h5 className="text-success mt-5 mt-lg-0 text-lg-center text-center">You don't have any unbooked appointments.</h5> : 
                <div className="row">
                    <h4 className="text-success mt-5 mt-lg-0 text-lg-center text-center">All Appointment slots that are not yet booked.</h4>
                    <div className="col-12 mt-5 d-flex flex-wrap gap-1 gap-md-3 gap-lg-3 justify-content-center">
                        {slots.map((slot)=>(
                            <div className="d-flex gap-2 shadow-lg p-3 mb-3">
                                <div>
                                    <p className="mb-1">Date: <b>{slot.date}</b></p> 
                                    <div className="d-flex gap-4 mb-1">
                                        <p className="mb-0">Start Time: <b>{slot.startTime.slice(0,5)}</b></p>
                                        <p className="mb-0">End Time: <b>{slot.endTime.slice(0,5)}</b></p>
                                    </div>
                                    <p>Status: <b className="text-success">VACANT</b></p>
                                    <div className="d-flex justify-content-center">
                                        <button className="slotCancelBtn" onClick={()=>handleCancellation(slot)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default DoctorUnbookedApmts;