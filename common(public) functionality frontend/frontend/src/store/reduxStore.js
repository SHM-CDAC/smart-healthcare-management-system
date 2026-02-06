import { configureStore } from "@reduxjs/toolkit";
import LoggedInAdminSlice from "./AdminSlice";
import LoggedInDoctorSlice from "./DoctorSlice";
import LoggedInPatientSlice from "./PatientSlice";
import LoginStateSlice from "./LoginStateSlice";
import DoctorListSlice from "./DoctorListSlice";
import SelectedDoctorSlice from "./SelectedDoctorSlice";
import AppointmentSlice from "./AppointmentSlice";


const reduxStore = configureStore({
    reducer:{
        loggedInAdmin: LoggedInAdminSlice.reducer,
        loggedInDoctor: LoggedInDoctorSlice.reducer,
        loggedInPatient: LoggedInPatientSlice.reducer,
        loginState: LoginStateSlice.reducer,
        doctorList: DoctorListSlice.reducer,
        selectedDoctor: SelectedDoctorSlice.reducer,
        selectedAppointment: AppointmentSlice.reducer
    }
})

export default reduxStore;