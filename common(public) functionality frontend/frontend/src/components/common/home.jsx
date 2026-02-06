import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { findDoctor } from "../../services/publicService";
import { useDispatch, useSelector } from "react-redux";
import { addDoctorData } from "../../store/DoctorListSlice";


const Home = () => {
  const [doctorSearchData,setDoctorSearchData] = useState({
    city:"",
    specialization:""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange =(e)=>{
    setDoctorSearchData({...doctorSearchData,[e.target.name]:e.target.value})
  }

  const handleSearchClick = async()=>{
    
    if(doctorSearchData.city.trim() == "")
      toast.warning("Please enter city!")
    else if(doctorSearchData.specialization == "")
      toast.warning("Please enter speciality!")
    else{
      try{
          const payload ={
            city:doctorSearchData.city.trim(),
            specialization:doctorSearchData.specialization
          }
          const response = await findDoctor(payload);
          dispatch(addDoctorData(response.data))
          navigate("/doctor/list")
          console.log("DocList: ",response.data);
      }
      catch(error){
        if(error.response)
          toast.error(error.response.data)
        else
          toast.error("Server is not reachable!")
      }
    }
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegistration = () => {
    navigate("/patientReg");
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="row">
          <h5 className="text-center mt-5 ">
            Looking for the right doctor? Search by city and specialty in
            seconds.
          </h5>
          <div className="col-12 searchBar mb-5 mt-2 d-flex justify-content-center align-items-center gap-3">
            <div className="searchBox d-flex">
              <input
                type="text"
                name="city"
                placeholder="Enter your city..."
                className="form-control"
                value={doctorSearchData.city}
                onChange={handleChange}
              />
              <select id="speciality" name="specialization" className="form-select" onChange={handleChange}>
                <option value="">Select Speciality...</option>
                <option value="General Physician">General Physician</option>
                <option value="Family Medicine">Family Medicine</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Endocrinologist">Endocrinologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Nephrologist">Nephrologist</option>
                <option value="Rheumatologist">Rheumatologist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="General Surgeon">General Surgeon</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Neurosurgeon">Neurosurgeon</option>
                <option value="Plastic Surgeon">Plastic Surgeon</option>
                <option value="Vascular Surgeon">Vascular Surgeon</option>
                <option value="Gynecologist / Obstetrician">
                  Gynecologist / Obstetrician
                </option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Pediatric Surgeon">Pediatric Surgeon</option>
                <option value="ENT Specialist">ENT Specialist</option>
                <option value="Ophthalmologist">Ophthalmologist</option>
                <option value="Dentist">Dentist</option>
                <option value="Oral & Maxillofacial Surgeon">
                  Oral & Maxillofacial Surgeon
                </option>
                <option value="Psychiatrist">Psychiatrist</option>
                <option value="Psychologist">Psychologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cosmetologist">Cosmetologist</option>
                <option value="Radiologist">Radiologist</option>
                <option value="Pathologist">Pathologist</option>
                <option value="Anesthesiologist">Anesthesiologist</option>
                <option value="Physiotherapist">Physiotherapist</option>
                <option value="Dietitian / Nutritionist">
                  Dietitian / Nutritionist
                </option>
                <option value="Ayurveda Practitioner">
                  Ayurveda Practitioner
                </option>
                <option value="Homeopathy Doctor">Homeopathy Doctor</option>
              </select>
            </div>
            <div>
              <button className="homePageSearchbtn" onClick={handleSearchClick}>Search</button>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="homePageBanner d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
            <div className="col-lg-5 col-12">
              <div className="ms-3">
                <span>Book Appointment With Trusted Doctors</span>
                <div className="d-flex justify-content-lg-center align-items-center gap-1 mt-3">
                  <img
                    src="/images/appointment.png"
                    alt=""
                    style={{ width: "32px", height: "32px" }}
                    className="me-2"
                  />
                  <p className="m-0">
                    Find verified specialists, check availability,book
                    instantly.
                  </p>
                </div>
                <div className="mt-3">
                  <button className="" onClick={handleLoginClick}>
                    Book Appointment <FaArrowRightLong className="ms-2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-12 d-flex justify-content-center">
              <img
                src="/images/3Doctors.png"
                alt="doctors"
                className="multi-Doctorsimg"
              />
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="d-flex justify-content-center align-items-center flex-column gap-3 homepageHeadline">
            <span>Quality Healthcare Made Simple</span>
            <span>
              We help patients connect with trusted doctors, book appointments
              effortlessly, and manage healthcare digitally — all in one place.
            </span>
          </div>
        </div>
        <div className="row mt-5 d-flex justify-content-center align-items-center">
          <div className="homePageBanner2 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-lg-5 gap-sm-3 gap-md-0 gap-xl-3 pt-3 pt-sm-0">
            <div className="col-12 col-sm-5 col-lg-4 order-2 order-sm-1">
              <img
                src="./images/1Doctor.png"
                alt=""
                className="img-fluid"
                style={{ width: "300px", height: "400px" }}
              />
            </div>
            <div className="col-12 col-sm-7 col-lg-8 order-1 order-sm-2">
              <div>
                <h3>
                  Register once and start booking appointments with trusted
                  doctors
                </h3>
                <button className="mt-2" onClick={handleRegistration}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
