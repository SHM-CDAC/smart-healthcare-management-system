import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMyAccount, fetchDoctor } from "../../services/doctorService";
import { toast } from "react-toastify";
import {
  clearLoggedInDoctorDetails,
  setLoggedInDoctorDetails,
} from "../../store/DoctorSlice";
import { login, logout } from "../../store/LoginStateSlice";


const DoctorDashboard = () => {
  const loggedInDetails = useSelector((state) => state.loggedInDoctor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        console.log("------Fetching Doctor Details------")
        const response = await fetchDoctor();
        console.log(response.data);
        dispatch(setLoggedInDoctorDetails(response.data));
        dispatch(login({ value: true, userRole: "DOCTOR" }));
        console.log("------Details Fetched------")
      } catch (error) {
        if (error.response) toast.error(error.response);
        else toast.error("Server is not Reachable!");
      }
    };
    fetchDoctorDetails();
    
  }, []);

  const deleteDoctorAcc = async () => {
    const res = confirm("Are you sure? you want to delete your Account.");
    if (res) {
      try {
        const response = await deleteMyAccount(loggedInDetails.doctorId);
        localStorage.removeItem("token");
        toast.success(response.data);
        dispatch(clearLoggedInDoctorDetails());
        dispatch(logout({value:false, userRole:"", userName:""}))
        navigate("/home");
      } catch (error) {
        console.log("ERR: ", error);
        if (error.response) toast.error(error.response.data);
        else toast.error("Server is not Reachable!");
      }
    }
  };
  return (
    <div className="container">
      <div className="container-fluid">
        <div className="row mb-lg-5 mb-4">
          <div className="col-12">
            <h2 className="text-center mt-5 mt-lg-0 DashboardHeading">
              Hello Dr. {loggedInDetails.firstName}, here is a quick overview to
              help you manage your Appointments and Profile.
            </h2>
          </div>
        </div>
        <div className="row justify-content-center gap-4 gap-lg-0">
          <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
            <div className="dashboardContainers p-4">
              <h5>
                <img
                  src="/images/appointment.png"
                  alt=""
                  style={{ width: "30px", height: "30px", marginRight: "5px" }}
                />
                Quick Actions:{" "}
              </h5>
              <div className="ms-1 mt-3">
                <ul
                  style={{ listStyle: "none" }}
                  className="d-flex flex-column gap-3"
                >
                  <li>
                    <Link
                      className="dashboardLinks"
                      to={"/doctor/appointment/upcoming"}
                    >
                      <img
                        src="/images/medicalHistory.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      View upcoming appointments{" "}
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="dashboardLinks" to={"/appointment/create"}>
                      <img
                        src="/images/compose.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      Create appointment slot{" "}
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="dashboardLinks" to={"/doctor/slot/vacant"}>
                      <img
                        src="/images/page.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      View created appointment
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dashboardLinks"
                      to={"/doctor/appointment/history"}
                    >
                      <img
                        src="/images/history.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      View completed appointment
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dashboardLinks"
                      to={"/doctor/appointment/cancelled/history"}
                    >
                      <img
                        src="/images/cancellation.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      View cancelled appointments
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>

                  <li>
                    <Link className="dashboardLinks" to={"/doctor/earnings"}>
                      <img
                        src="/images/salary.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      My earnings
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 col-sm-9 col-md-7 px-0 px-lg-3">
            <div className="dashboardContainers p-4">
              <h5>
                <img
                  src="/images/settings.png"
                  alt=""
                  style={{ width: "25px", height: "25px", marginRight: "5px" }}
                />
                Account Settings:{" "}
              </h5>
              <div className="ms-1 mt-3">
                <ul
                  style={{ listStyle: "none" }}
                  className="d-flex flex-column gap-3"
                >
                  <li>
                    <Link
                      className="dashboardLinks"
                      to={"/user/changePassword"}
                    >
                      <img
                        src="/images/password.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      Change Password{" "}
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="dashboardLinks" to={"/doctor/update"}>
                      <img
                        src="/images/profile.png"
                        alt=""
                        style={{ width: "26px", height: "26px" }}
                        className="me-2"
                      />
                      Update Profile{" "}
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link className="dashboardLinks" onClick={deleteDoctorAcc}>
                      <img
                        src="/images/delete.png"
                        alt=""
                        style={{ width: "23px", height: "20px" }}
                        className="me-2"
                      />
                      Delete Account{" "}
                      <img
                        src="/images/next.png"
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          marginLeft: "5px",
                        }}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Link style={{ textDecoration: "none" }} to={"/user/feedback"}>
          <div className="d-flex justify-content-center mt-5 gap-2 align-items-center">
            <img
              src="/images/chat.png"
              alt=""
              style={{ width: "35px", height: "35px" }}
            />
            <h5 className="">Help Us Improve — Share Your Feedback</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
