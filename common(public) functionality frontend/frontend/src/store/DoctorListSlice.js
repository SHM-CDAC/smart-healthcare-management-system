import { createSlice } from '@reduxjs/toolkit'; 

const DoctorListSlice = createSlice({
    name:"doctorList",
    initialState:[],
    reducers:{
        addDoctorData :(state,action)=>{
            return action.payload;
        },
        clearDoctorData :()=>{
            return [];
        }
    }
})

export const {addDoctorData,clearDoctorData} = DoctorListSlice.actions;
export default DoctorListSlice;