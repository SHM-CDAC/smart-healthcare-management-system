import axios from "axios";
import baseUrl from "../util"

export const getPatientFeedbacks = async () =>{
    const url = baseUrl +"/api/public/patient/feedbacks";
    const response = await axios.get(url);
    return response;           
}

export const getDoctorFeedbacks = async()=>{
    const url = baseUrl + "/api/public/doctor/feedbacks";
    const response = await axios.get(url);
    return response;
}

export const authenticateUser = async(data)=>{
    const url = baseUrl + "/user/login";
    try{
        const response = await axios.post(url,data);
        if(response.status !== 200){
            throw new Error("Something went wrong during authentication");
        }
        return response;
    }
    catch(error){
        throw error;
    }
   
}

export const findDoctor = async(doctorData)=>{
    const url = baseUrl + `/api/public/doctors`;
    try{
        const response = await axios.post(url,doctorData);
        return response;
    }
    catch(error)
    {
        throw error;
    }
}





