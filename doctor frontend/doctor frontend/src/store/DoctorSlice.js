import { createSlice } from '@reduxjs/toolkit'; 
const LoggedInDoctorSlice = createSlice({
    name:'loggedInDoctor',
    initialState:{},
    reducers:{
        setLoggedInDoctorDetails:(state,action)=>{
            return action.payload;
        },
        clearLoggedInDoctorDetails:(state)=>{
            return {};
        }
    }
})

export default LoggedInDoctorSlice;
export const { setLoggedInDoctorDetails, clearLoggedInDoctorDetails } = LoggedInDoctorSlice.actions;