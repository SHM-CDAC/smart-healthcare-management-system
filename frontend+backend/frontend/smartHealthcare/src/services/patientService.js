
import axios from "axios";
import baseUrl from "../util";

export const updateMyProfile = async (updatedState,patientId) => {

    const url = baseUrl+`/patient/update/${patientId}`;
    try{
        const response = await axios.put(url,updatedState,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const bookAppointment = async(payload,slotId)=>{
    const url = baseUrl + `/appointment/book/${slotId}`;
    try{
        const response = await axios.post(url,payload,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error)
    {
        throw error;
    }


}

export const fetchPatientUpcomingApmt = async(patientId)=>{
    const url = baseUrl +  `/appointment/upcoming/patient/${patientId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const fetchPatientApmtHistory = async(patientId)=>{
    const url = baseUrl +  `/appointment/history/patient/${patientId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const cancelMyBookedApmt = async(patientId,slotId)=>{
    const url = baseUrl +  `/appointment/cancel/${slotId}/patient/${patientId}`;
    try{
        const response = await axios.patch(url,null,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const fetchPatientCancelledApmtHistory = async(patientId)=>{
    const url = baseUrl + `/appointment/cancelled/patient/${patientId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        console.log(response);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const addReviewForDoctor = async(payload)=>{
    const url = baseUrl +  `/review/create`;
    try{
        const response = await axios.post(url,payload,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const deleteMyAccount = async(patientId)=>{
    const url = baseUrl + `/patient/delete/${patientId}`;
    try{
        const response = await axios.delete(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response;
    }
    catch(error){
        throw error;
    }
}

export const fetchPatient = async()=>{
    const url = baseUrl + `/patient/me`;
    try{
        const response = await axios.get(url,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        return response;
    }
    catch(error){
        throw error;
    }
}