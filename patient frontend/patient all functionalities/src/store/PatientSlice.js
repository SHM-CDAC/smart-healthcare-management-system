import { createSlice } from "@reduxjs/toolkit";

const LoggedInPatientSlice = createSlice({
    name:'LoggedInPatient',
    initialState:{},
    reducers:{
        setLoggedInPatientDetails:(state,action)=>{
            return action.payload;
        },
        clearLoggedInPatientDetails:()=>{
            return {};
        }
    }   
})

export default LoggedInPatientSlice;
export const { setLoggedInPatientDetails, clearLoggedInPatientDetails } = LoggedInPatientSlice.actions;