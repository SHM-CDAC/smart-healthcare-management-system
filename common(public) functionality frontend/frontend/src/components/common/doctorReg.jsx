import { useRef, useState } from "react";
import { Link, useHref, useNavigate } from "react-router-dom";
import validateRegForm from "../../validateDocReg";
import { saveDoctorDetails } from "../../services/userService";
import { toast } from "react-toastify";


const DoctorRegistration = () => {
  const navigate = useNavigate();
  const errmsg = useRef("");
  const [photo, setPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const [doctorRegDetails, setDoctorRegDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPwd: "",
    city: "",
    mobileNo: "",
    dob: "",
    gender: "",
    degree: "",
    specialization: "",
    experience: "",
    fee: "",
    clinicName: "",
    clinicAddr: "",
  });

  const handleOnChange = (e) => {
    errmsg.current.innerText = "";
    setDoctorRegDetails({
      ...doctorRegDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    const result = validateRegForm(doctorRegDetails);
    if (!certificate)
      errmsg.current.innerText =
        "Please Upload your certificate for Verification!";
    else if (result == "") {
      formdata.append(
        "doctorRegDto",
        new Blob(
          [
            JSON.stringify({
              firstName: doctorRegDetails.firstName,
              lastName: doctorRegDetails.lastName,
              email: doctorRegDetails.email,
              password: doctorRegDetails.password,
              city: doctorRegDetails.city,
              mobileNo: doctorRegDetails.mobileNo,
              dob: doctorRegDetails.dob,
              gender: doctorRegDetails.gender,
              degree: doctorRegDetails.degree,
              specialization: doctorRegDetails.specialization,
              experience: doctorRegDetails.experience,
              fee: doctorRegDetails.fee,
              clinicName: doctorRegDetails.clinicName,
              clinicAddress: doctorRegDetails.clinicAddr,
            }),
          ],
          { type: "application/json" },
        ),
      );

      if (photo) {
        formdata.append("photo", photo);
      }

      formdata.append("certificate", certificate);
      try{
        const response = await saveDoctorDetails(formdata);
        toast.success("Registration Done Successful!!!");
        navigate("/login");
      }
      catch(error){
        if(error.response)
        toast.error(error.response.data);

        else
             toast.error("Server is not reachable!");
           
        
       
      }
      
    } else errmsg.current.innerText = result;
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 px-0 px-lg-3 d-flex flex-column justify-content-center align-items-center">
            <h4 className="text-center mt-5 mt-lg-0 regFormHeading">
              Doctor Registration Form
            </h4>
            <div className="regFormContainer shadow-lg p-2 p-sm-3 p-lg-5 ">
              <div className="d-flex justify-content-between mb-4">
                <h5 style={{ color: "#28CFFE" }}>Join Us</h5>
                <span>
                  Are you a patient?
                  <br className="linebreaker" />{" "}
                  <Link to={"/patientReg"}>register here</Link>
                </span>
              </div>

              <form action="" onSubmit={handleRegistration}>
                <h5>Personal Info:</h5>
                <div className="d-flex flex-wrap flex-lg-nowrap gap-lg-5 gap-3 justify-content-center mb-4 mt-4">
                  <div className="regFormContentDiv">
                    <label htmlFor="">First Name: </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter first name..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Last Name: </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter last name..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-lg-5 gap-3 mb-4">
                  <div className="regFormContentDiv">
                    <label htmlFor="">Email: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Password: </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Confirm Password: </label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPwd"
                      placeholder="Confirm your password..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center mb-4 gap-lg-5 gap-3">
                  <div className="regFormContentDiv">
                    <label htmlFor="">City: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="Enter your city..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Mobile Number: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNo"
                      placeholder="Enter your number..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Date of Birth: </label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap justify-content-evenly mb-5 gap-lg-5 gap-3">
                  <div>
                    <span>Gender: </span>
                    <div className="d-flex gap-4 gap-lg-5">
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="male"
                          value="MALE"
                          style={{ width: "15px" }}
                          onChange={handleOnChange}
                        />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="female"
                          value="FEMALE"
                          style={{ width: "15px" }}
                          onChange={handleOnChange}
                        />
                        <label htmlFor="female">Female</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          name="gender"
                          id="other"
                          value="OTHER"
                          style={{ width: "15px" }}
                          onChange={handleOnChange}
                        />
                        <label htmlFor="other">Other</label>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "230px" }}>
                    <label htmlFor="">Upload your ProfilePic: </label>
                    <input
                      type="file"
                      className=""
                      name="photo"
                      style={{ width: "230px" }}
                      onChange={(e) => {
                        setPhoto(e.target.files[0]);
                      }}
                    />
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                      image size must be less than 10MB
                    </span>
                  </div>
                </div>
                <h5>Professional Info:</h5>
                <div className="d-flex justify-content-center flex-wrap flex-lg-nowrap gap-lg-5 gap-3 mb-4 mt-4">
                  <div className="regFormContentDiv">
                    <label htmlFor="">Degree of Qualification: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Degree..."
                      name="degree"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Specialization: </label>
                    <select
                      id="speciality"
                      name="specialization"
                      className="form-select"
                      onChange={handleOnChange}
                    >
                      <option value="">Select Speciality...</option>
                      <option value="General Physician">
                        General Physician
                      </option>
                      <option value="Family Medicine">Family Medicine</option>
                      <option value="Internal Medicine">
                        Internal Medicine
                      </option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Endocrinologist">Endocrinologist</option>
                      <option value="Gastroenterologist">
                        Gastroenterologist
                      </option>
                      <option value="Pulmonologist">Pulmonologist</option>
                      <option value="Nephrologist">Nephrologist</option>
                      <option value="Rheumatologist">Rheumatologist</option>
                      <option value="Oncologist">Oncologist</option>
                      <option value="General Surgeon">General Surgeon</option>
                      <option value="Orthopedic Surgeon">
                        Orthopedic Surgeon
                      </option>
                      <option value="Neurosurgeon">Neurosurgeon</option>
                      <option value="Plastic Surgeon">Plastic Surgeon</option>
                      <option value="Vascular Surgeon">Vascular Surgeon</option>
                      <option value="Gynecologist / Obstetrician">
                        Gynecologist / Obstetrician
                      </option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Pediatric Surgeon">
                        Pediatric Surgeon
                      </option>
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
                      <option value="Homeopathy Doctor">
                        Homeopathy Doctor
                      </option>
                    </select>
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Experience in Years: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="experience"
                      placeholder="Enter your experience..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center flex-wrap flex-lg-nowrap gap-4 gap-lg-5 mb-4">
                  <div className="regFormContentDiv">
                    <label htmlFor="">Consultation Fees: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fee"
                      placeholder="Enter your fees..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div style={{ width: "230px" }}>
                    <label htmlFor="">Upload your certificate: </label>
                    <input
                      type="file"
                      className=""
                      name="certificate"
                      style={{ width: "230px" }}
                      onChange={(e) => {
                        setCertificate(e.target.files[0]);
                      }}
                    />
                    <span className="text-danger" style={{ fontSize: "14px" }}>
                      file or image size must be less than 10MB
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-wrap flex-lg-nowrap mb-5 justify-content-center gap-4 gap-lg-5">
                  <div className="regFormContentDiv">
                    <label htmlFor="">Clinic Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="clinicName"
                      placeholder="Enter clinic name..."
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="regFormContentDiv">
                    <label htmlFor="">Clinic Address: </label>
                    <textarea
                      name="clinicAddr"
                      id=""
                      className="form-control"
                      placeholder="Enter clinic address..."
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center ">
                  <button className="">
                    Register
                  </button>
                </div>
              </form>
              <h5
                ref={errmsg}
                style={{ color: "red" }}
                className="text-center mt-3"
              ></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
