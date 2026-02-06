import { createSlice } from "@reduxjs/toolkit";

const AppointmentSlice = createSlice({
    name:"appointmentDetails",
    initialState:{},
    reducers:{
    addApmtDetails: (state,action)=>{
        return action.payload;
    },
    clearApmtDetails:(state,action)=>{
        return {}
    }
}
})

export default AppointmentSlice;
export const {addApmtDetails,clearApmtDetails} = AppointmentSlice.actions;
