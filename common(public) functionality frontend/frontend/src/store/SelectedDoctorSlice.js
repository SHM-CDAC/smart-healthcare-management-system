import { createSlice } from "@reduxjs/toolkit";

const SelectedDoctorSlice = createSlice({
    name:"selectedDoctorDetails",
    initialState:{},
    reducers:{
        setSelectedDoctorDetails:(state,action)=>{
            return action.payload;
        },
        clearSelectedDoctorDetails:()=>{
            return {}
        }
    }
})

export default SelectedDoctorSlice;
export const {setSelectedDoctorDetails,clearSelectedDoctorDetails} = SelectedDoctorSlice.actions;