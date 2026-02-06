import axios from "axios";
import baseUrl from "../util"

export const CreateAppoinmentSlot = async(apmtDetails,doctorId)=>{

    const url = baseUrl + `/slot/create/${doctorId}`;
    try{
        const response = await axios.post(url,apmtDetails,{
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

export const updateProfile = async (updatedDoctor,doctorId)=>{
    const url = baseUrl +  `/doctor/update/${doctorId}`;
    try{
        const response = await axios.post(url,updatedDoctor,{
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

export const fetchDoctorApmts = async(doctorId)=>{
    const url = baseUrl + `/slot/available/${doctorId}`;
    try{
        const response = await axios.get(url);
        return response;
    }
    catch(error){
        throw error;
    }
}

export const fetchMyReviews = async(doctorId)=>{

    const url = baseUrl +`/review/doctor/${doctorId}`;
    try{
        const response =await axios.get(url);
        return response;

    }
    catch(error){
        throw error;
    }
}

export const fetchDoctorUpcomingApmts = async(doctorId)=>{
    const url = baseUrl + `/appointment/upcoming/doctor/${doctorId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response
    }
    catch(error){
        throw error;
    }
}

export const fetchDoctorApmtHistory = async(doctorId)=>{
    const url = baseUrl + `/appointment/history/doctor/${doctorId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response
    }
    catch(error){
        throw error;
    }
}

export const fetchDoctorCancelledApmts = async(doctorId)=>{
    const url = baseUrl + `/appointment/cancelled/doctor/${doctorId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response
    }
    catch(error){
        throw error;
    }
}

export const fetchUnbookedApmtsForDoctor = async(doctorId)=>{
    const url = baseUrl + `/slot/available/${doctorId}`;
    try{
        const response = await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response
    }
    catch(error){
        throw error;
    }
}

export const cancelDoctorUnbookedSlot = async(slotId)=>{
    const url = baseUrl + `/slot/cancel/${slotId}`;
    try{
        const response = await axios.patch(url,null,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
        return response
    }
    catch(error){
        throw error;
    }
}


export const getMyEarnings = async(doctorId)=>{
    const url = baseUrl + `/appointment/earning/${doctorId}`;
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

export const getAllTypesOfApmts = async(doctorId)=>{
    const url = baseUrl + `/appointment/all/doctor/${doctorId}`;
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

export const deleteMyAccount = async(doctorId)=>{
    const url = baseUrl + `/doctor/delete/${doctorId}`;
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

export const fetchDoctor = async()=>{
    const url = baseUrl + `/doctor/me`;
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