import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/common/home.jsx";
import ContactUs from "./components/common/contactUs.jsx";
import AboutUs from "./components/common/aboutUs.jsx";
import Login from "./components/common/login.jsx";
import PatientRegistration from "./components/common/patientReg.jsx";
import DoctorRegistration from "./components/common/doctorReg.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore.js";
import PatientDetails from "./components/patient/PatientDashboard.jsx";
import DoctorDashboard from "./components/doctor/doctorDashboard.jsx";
import AdminDashboard from "./components/admin/adminDashboard.jsx";
import UpdatePatientProfile from "./components/patient/UpdatePatientProfile.jsx";
import ChangePwd from "./components/common/changePwd.jsx";
import SlotCreation from "./components/doctor/SlotCreation.jsx";
import UpdateDoctorProfile from "./components/doctor/UpdateDoctorProfile.jsx";
import AddFeedback from "./components/common/addFeedback.jsx";
import DoctorList from "./components/common/doctorList.jsx";
import DoctorApmtDetails from "./components/doctor/doctorApmtDetails.jsx";
import Payment from "./components/patient/Payment.jsx";
import PatientUpcomingApmts from "./components/patient/PatientUpcomingApmts.jsx";
import PatientApmtHistory from "./components/patient/PatientApmtHistory.jsx";
import PatientCancelledApmts from "./components/patient/PatientCancelledApmts.jsx";
import DoctorReviews from "./components/common/doctorReviews.jsx";
import DoctorUpcomingApmts from "./components/doctor/DoctorUpcomingApmts.jsx";
import DoctorApmtHistory from "./components/doctor/DoctorApmtHistory.jsx";
import DoctorCancelledApmts from "./components/doctor/DoctorCancelledApmts.jsx";
import DoctorUnbookedApmts from "./components/doctor/DoctorUnbookedApmts.jsx";
import DoctorEarnings from "./components/doctor/DoctorEarnings.jsx";
import UpdateAdminProfile from "./components/admin/UpdateAdminProfile.jsx";
import AllRegisteredDoctors from "./components/admin/AllRegisteredDoctors.jsx";
import AllRegisteredPatients from "./components/admin/AllRegisteredPatients.jsx";
import AllUnverifiedDoctors from "./components/admin/AllUnverifiedDoctors.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/doctorReg",
        element: <DoctorRegistration />,
      },
      {
        path: "/patientReg",
        element: <PatientRegistration />,
      },
      {
        path: "/patient/dashboard",
        element: <PatientDetails />,
      },
      {
        path: "/doctor/dashboard",
        element: <DoctorDashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/patient/update",
        element: <UpdatePatientProfile />,
      },
      {
        path: "/user/changePassword",
        element: <ChangePwd />,
      },
      {
        path: "/appointment/create",
        element: <SlotCreation />,
      },
      {
        path: "/doctor/update",
        element: <UpdateDoctorProfile />,
      },
      {
        path: "/user/feedback",
        element: <AddFeedback />,
      },
      {
        path: "/doctor/list",
        element: <DoctorList />,
      },
      {
        path: "/doctor/appointments",
        element: <DoctorApmtDetails />,
      },
      {
        path: "/patient/payment",
        element: <Payment />,
      },
      {
        path: "/patient/appointment/upcoming",
        element: <PatientUpcomingApmts />,
      },
      {
        path: "/patient/appointment/history",
        element: <PatientApmtHistory />,
      },
      {
        path: "/patient/appointment/cancelled/history",
        element: <PatientCancelledApmts />,
      },
      {
        path: "/doctor/reviews",
        element: <DoctorReviews />,
      },
      {
        path: "/doctor/appointment/upcoming",
        element: <DoctorUpcomingApmts />,
      },
      {
        path: "/doctor/appointment/history",
        element: <DoctorApmtHistory />,
      },
      {
        path: "/doctor/appointment/cancelled/history",
        element: <DoctorCancelledApmts />,
      },
      {
        path: "/doctor/slot/vacant",
        element: <DoctorUnbookedApmts />,
      },
      {
        path: "/doctor/earnings",
        element: <DoctorEarnings />,
      },
      {
        path: "/admin/update",
        element: <UpdateAdminProfile />,
      },
      {
        path:"/admin/doctors",
        element:<AllRegisteredDoctors/>
      },
      {
        path:"/admin/patients",
        element:<AllRegisteredPatients/>
      },
      {
        path:"/admin/doctors/unverified",
        element:<AllUnverifiedDoctors/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
