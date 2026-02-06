import axios from "axios";
import baseUrl from "../util"

export const saveDoctorDetails = async(formdata)=>{
    const url = baseUrl + "/user/doctor/register";
    try{
        const response = await axios.post(url,formdata);
        return response;
    }
    catch(error){
        throw error;
    }
    
}

export const savePatientDetails = async(formdata)=>{
    const url = baseUrl + "/user/patient/register";
    try{
    const response = await axios.post(url,formdata);
    return response;
    }
    catch(error){
        throw error;
    }
    
}

export const changePassword = async (userId, oldPassword, newPassword)=>{
    const url = baseUrl + "/user/changePwd";
    try{
        const response = await axios.patch(url, {userId, oldPassword, newPassword},{
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

export const addUserFeedback = async(data,id)=>{
    const url = baseUrl + `/feedback/add/${id}`;
    try{
        const response = await axios.post(url,data,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }   );
        return response;
    }
    catch(error){
        throw error;
    }
}