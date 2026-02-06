import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { bookAppointment } from "../../services/patientService";
import { useNavigate } from "react-router-dom";
import { clearApmtDetails } from "../../store/AppointmentSlice";

const Payment = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const doctor = useSelector((state)=>state.selectedDoctor)
    const appointment = useSelector((state)=>state.selectedAppointment);
    const patient = useSelector((state)=>state.loggedInPatient)
    const [payMethod, setPayMethod] = useState("");
    
    const handlePayment = async(fee)=>{
        if(payMethod.trim() == "")
            toast.warning("Please enter payment details!");
        else
        {
            try{
                const payload = {
                    doctorId:doctor.doctorId,
                    patientId:patient.patientId,
                    status:"BOOKED",
                    paymentMode:payMethod,
                    amount:fee
                }
                const response = await bookAppointment(payload,appointment.id);
                toast.success(response.data);
                dispatch(clearApmtDetails());
                
                navigate("/patient/dashboard")
            }
            catch(error){
                if(error.response)
                {
                    navigate("/patient/dashboard")
                }
                else
                    toast.error("Server is not Reachable!")
            }
        }
    }

    const handleChange =(e)=>{
        setPayMethod(e.target.name);
    }

    return(
        <div className="container">
            <div className="container-fluid">
                <div className="row justify-content-center mt-5 mt-lg-0">
                    <div className="paymentContainer d-lg-flex justify-content-between align-items-center p-3 p-lg-5 gap-5 shadow-lg">
                    <div className="col-12 col-lg-5 d-flex justify-content-center">
                        <div>
                            <h5>Total Amount:</h5>
                            <h3 className="mb-3 mb-lg-0">₹ {doctor.fee}</h3>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                    <div className="paymentContent p-1 p-lg-5 shadow-lg">
                            <h3 className="text-center mb-4">Payment Page</h3>
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            UPI
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <h5>UPI Payment</h5>
                                            <input
                                                type="text"
                                                name="UPI"
                                                placeholder="example@upi"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                             NET-BANKING
                                        </button>
                                    </h2>
                                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <h5>Net Banking</h5>
                                                <select onChange={handleChange} name="NETBANKING">
                                                <option value="">Select Bank</option>
                                                <option value="SBI">SBI</option>
                                                <option value="HDFC">HDFC</option>
                                                <option value="ICICI">ICICI</option>
                                                <option value="BOI">Bank Of India</option>
                                                </select>
                                            </div>
                                        </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            CARD PAYMENT
                                        </button>
                                    </h2>
                                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <h5>Card Payment</h5>
                                            <input
                                                 type="text"
                                                 name="CARD"
                                                 onChange={handleChange}
                                                placeholder="Card Number"/>
                                                <br /><br />
                                             <input
                                                type="text"
                                                name="CARD"
                                                onChange={handleChange}
                                                placeholder="MM/YY"/>
                                                <br /><br />
                                             <input
                                                type="password"
                                                name="CARD"
                                                onChange={handleChange}
                                                 placeholder="CVV"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="payNowBtn px-3 py-2 mt-3 mb-3 mb-lg-0 " onClick={()=>handlePayment(doctor.fee)}>Pay Now</button>
                            </div>
                        
                            
                        </div>
                    </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default Payment;









           
        




















// import { useState } from "react";

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState("CARD");

//   const [cardData, setCardData] = useState({
//     cardNumber: "",
//     expiry: "",
//     cvv: ""
//   });

//   const [bankName, setBankName] = useState("");
//   const [upiId, setUpiId] = useState("");

//   const handlePayNow = () => {
//     let paymentDetails = {};

//     if (paymentMethod === "CARD") {
//       paymentDetails = cardData;
//     }

//     if (paymentMethod === "NET_BANKING") {
//       paymentDetails = { bankName };
//     }

//     if (paymentMethod === "UPI") {
//       paymentDetails = { upiId };
//     }

//     const dummyPaymentPayload = {
//       paymentMethod,
//       amount: 50,
//       status: "SUCCESS",
//       paymentDetails
//     };

//     console.log("Payment Payload:", dummyPaymentPayload);
//     alert("Dummy Payment Successful (check console)");
//   };

//   const renderPaymentUI = () => {
//     switch (paymentMethod) {
//       case "CARD":
//         return (
//           <>
//             <h4>Card Payment</h4>
//             <input
//               type="text"
//               placeholder="Card Number"
//               value={cardData.cardNumber}
//               onChange={(e) =>
//                 setCardData({ ...cardData, cardNumber: e.target.value })
//               }
//             />
//             <br /><br />

//             <input
//               type="text"
//               placeholder="MM/YY"
//               value={cardData.expiry}
//               onChange={(e) =>
//                 setCardData({ ...cardData, expiry: e.target.value })
//               }
//             />
//             <br /><br />

//             <input
//               type="password"
//               placeholder="CVV"
//               value={cardData.cvv}
//               onChange={(e) =>
//                 setCardData({ ...cardData, cvv: e.target.value })
//               }
//             />
//           </>
//         );

//       case "NET_BANKING":
//         return (
//           <>
//             <h4>Net Banking</h4>
//             <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
//               <option value="">Select Bank</option>
//               <option value="SBI">SBI</option>
//               <option value="HDFC">HDFC</option>
//               <option value="ICICI">ICICI</option>
//             </select>
//           </>
//         );

//       case "UPI":
//         return (
//           <>
//             <h4>UPI Payment</h4>
//             <input
//               type="text"
//               placeholder="example@upi"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//             />
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ display: "flex", gap: "40px", padding: "20px" }}>

//       {/* LEFT SIDE */}
//       <div>
//         <h3>Total Amount</h3>
//         <h1>₹50.00</h1>
//       </div>

//       {/* RIGHT SIDE */}
//       <div>
//         <h2>Payment Page</h2>

//         <div>
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => setPaymentMethod("CARD")}
//           >
//             Card
//           </span>
//           {" | "}
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => setPaymentMethod("NET_BANKING")}
//           >
//             Net Banking
//           </span>
//           {" | "}
//           <span
//             style={{ cursor: "pointer" }}
//             onClick={() => setPaymentMethod("UPI")}
//           >
//             UPI
//           </span>
//         </div>

//         <br />

//         {renderPaymentUI()}

//         <br /><br />

//         <button onClick={handlePayNow}>Pay Now</button>
//       </div>

//     </div>
//   );
// };

// export default PaymentPage;
