import { createSlice } from '@reduxjs/toolkit';

const LoginStateSlice = createSlice({
    name:'isLoggedIn',
    initialState: {
        value:false,
        userRole:"",
        userName:""
    },
    reducers:{
        login: (state,action) => {
            return action.payload;
        },
        logout:(state,action)=>{
            return action.payload;
        }
    }
})

export default LoginStateSlice;
export const{login, logout} = LoginStateSlice.actions;
