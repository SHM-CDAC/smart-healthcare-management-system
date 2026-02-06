import { createSlice } from "@reduxjs/toolkit";

const LoggedInAdminSlice = createSlice({
    name:'loggedInAdmin',
    initialState:{},
    reducers:{
        setLoggedInAdminDetails:(state,action)=>{
            return action.payload;
        },
        clearLoggedInAdminDetails:()=>{
            return {};
        }
    }   
})

export default LoggedInAdminSlice;  
export const { setLoggedInAdminDetails, clearLoggedInAdminDetails } = LoggedInAdminSlice.actions;   