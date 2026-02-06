import axios from "axios"
import baseUrl from "../util"

export const updateAdminProfile = async(email)=>{
    const url = baseUrl + "/admin/update"
    try{
        const response = await axios.patch(url,
        email,
            {
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

export const fetchRegisteredDoctorList = async()=>{
    const url = baseUrl + "/admin/doctors"
    try{
        const response = await axios.get(url,{
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

export const fetchRegisteredPatient = async()=>{
    const url = baseUrl + "/admin/patients"
    try{
        const response = await axios.get(url,{
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

export const fetchAllUnverifiedDoctors = async()=>{
    const url = baseUrl + "/admin/doctors/unverified"
    try{
        const response = await axios.get(url,{
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

export const blockDoctorAcc = async(doctorId)=>{
    const url = baseUrl + `/admin/doctor/${doctorId}/block`;
    try{
        const response = await axios.patch(url,null,{
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

export const blockPatientAcc = async(patientId)=>{
    const url = baseUrl + `/admin/patient/${patientId}/block`;
    try{
        const response = await axios.patch(url,null,{
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

export const verifyDoctor = async(doctorId)=>{
    const url = baseUrl + `/admin/doctor/verify/${doctorId}`;
    try{
        const response = await axios.post(url,null,{
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

export const fetchAdmin = async()=>{
    const url = baseUrl + `/admin/me`;
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
