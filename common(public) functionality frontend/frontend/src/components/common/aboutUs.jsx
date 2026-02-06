import { useRef, useEffect, useState } from "react";
import { getDoctorFeedbacks, getPatientFeedbacks } from "../../services/publicService";

const AboutUs = () => {
  const [patientFeedbacks, setPatientFeedbacks] = useState([]);
  const [doctorFeedbacks, setDoctorFeedbacks] = useState([]);

  useEffect(()=>{
    const fetchPatientFeedbacks = async() =>{
        const response = await getPatientFeedbacks();
        setPatientFeedbacks(response.data);
        
    }
    const fetchDoctorFeedbacks = async ()=>{
      const response = await getDoctorFeedbacks();
      setDoctorFeedbacks(response.data);
      
    }
    fetchPatientFeedbacks();
    fetchDoctorFeedbacks();
  },[]);

  return (
    <div className="container">
      <div className="container-fluid ">
        <div className="text-center py-5 py-lg-4">
          <h1 className="aboutPageHeadline">Our Mission</h1>
          <span>
            Our goal is to provide a simple and transparent appointment booking
            experience. Users can easily book, manage,
            <br /> and track doctor appointments with complete clarity and
            trust.
          </span>
        </div>
        <div className="row my-5 d-flex justify-content-lg-evenly gap-3 gap-lg-0">
          <div className="col-lg-5 col-12 d-flex justify-content-center align-items-center">
            <div className="text-center text-lg-start">
              <h3 className="aboutPageHeadline ">Health is a Habit</h3>
              <span className="">
                Good health is built through everyday choices. With the right
                support and timely care, each day becomes a step toward a
                healthier life. We’re here to make that journey easy and
                stress-free.
              </span>
            </div>
          </div>
          <div className="col-lg-5 col-12 px-0 d-flex justify-content-center align-items-center ">
            <img
              src="./images/patient.png"
              alt=""
              className="patientImg"
              style={{ width: "500px", height: "330px" }}
            />
          </div>
        </div>

        <h1 className="text-center text-lg-start aboutPageHeadline mb-lg-5  mb-4" style={{marginTop:"110px"}}>What patients say about us</h1>
        {/* dynamic data => */}
        <div className="row mb-4">
          <div className="col-12 px-0">
            {/* Patient feedback carousel */}
            <div
              id="patientFeedbackCarousel"
              className="carousel slide "
              data-bs-ride="carousel"
              
            >
              <div className="carousel-inner py-0 px-0 px-lg-5">
                {patientFeedbacks.map((feedback, idx) => (
                  <div
                    key={feedback.name}
                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  >
                    <div className="d-flex justify-content-center">
                      <div className="feedback-card px-0 ">
                        <p className="text-center">{feedback.message}</p>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start ms-lg-5">
                          <img
                            src={`http://localhost:8080`+feedback.photoUrl}
                            alt=""
                            className="userPic me-2"
                          />
                          <div className="d-flex flex-column">
                            <span>{feedback.fullName}</span>
                            <span>
                              {feedback.email} • {feedback.dateAndTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#patientFeedbackCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#patientFeedbackCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-evenly gap-4 gap-lg-0 ">
          <h1 className="text-center my-lg-5 mt-5 aboutPageHeadline">
            Our approach to healthcare
          </h1>
          <div className="col-lg-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                src="./images/group.png"
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              <h3 className="approachIconName">Connect</h3>
              <span className="text-muted approachStmts text-center">
                We understand healthcare goes beyond signs, symptoms, diagnosis,
                and treatment. It’s about the deep connection between doctors
                and patients that leads to continuous care and sustained, better
                outcomes.
              </span>
            </div>
          </div>
          <div className="col-lg-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                src="./images/trust.png"
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              <h3 className="approachIconName">Trust</h3>
              <span className="text-muted approachStmts text-center">
                Our platform is built on trust. We understand the responsibility
                that comes with connecting patients and healthcare
                professionals. Every feature we design is focused on maintaining
                transparency, reliability, and confidence in care.
              </span>
            </div>
          </div>
          <div className="col-lg-3 d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                src="./images/transparency.png"
                alt=""
                style={{ width: "90px", height: "90px" }}
              />
              <h3 className="pb-2 approachIconName">Transparency</h3>
              <span className="text-muted approachStmts text-center">
                We believe in full disclosure. We believe in communicating
                openly and honestly, and holding ourselves to the highest
                ethical standards.
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-center text-lg-start aboutPageHeadline mb-lg-5  mb-3" style={{marginTop:"110px"}}>What Doctors say about us</h1>
        {/* dynamic data => */}
        <div className="row mb-4">
          <div className="col-12 px-0">
            {/* Doctor feedback carousel */}
            <div
              id="patientFeedbackCarousel"
              className="carousel slide "
              data-bs-ride="carousel"
              
            >
              <div className="carousel-inner py-0 px-0 px-lg-5">
                {doctorFeedbacks.map((feedback, idx) => (
                  <div
                    key={feedback.name}
                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                  >
                    <div className="d-flex justify-content-center">
                      <div className="feedback-card px-0 ">
                        <p className="text-center">{feedback.message}</p>
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start ms-lg-5">
                          <img
                            src={`http://localhost:8080`+feedback.photoUrl}
                            alt=""
                            className="userPic me-2"
                          />
                          <div className="d-flex flex-column">
                            <span>Dr. {feedback.fullName}</span>
                            <span>
                              {feedback.email} • {feedback.dateAndTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#patientFeedbackCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#patientFeedbackCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
