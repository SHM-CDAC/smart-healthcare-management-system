import { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

const ContactUs = () => {

   const nameRef = useRef("");
    const emailRef = useRef("");
    const msgRef = useRef("");

  const onSubmit = async (e) => {
      e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", "c313cdf6-31b2-425d-8315-258c02bcaf33");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      toast.success("Message delivered successfully!",{
         position: "top-right",
        autoClose: 2000,}
       );
      nameRef.current.value = "";
      emailRef.current.value = "";
      msgRef.current.value = "";
    }
    else{
        toast.error("Failed to deliver",{
         position: "top-right",
        autoClose: 2000,}
       );
    }
  }

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="row ">
            <div className="col-12 d-flex justify-content-center  mt-5 mt-lg-4">
              <div className="contactPageHeadline text-center">
                <h2 className="">Contact Us</h2>
                <span >Have Questions about our website, services or anything else? Let us know and we'll get back to you.</span>
              </div>
            </div>
            <div className="col-12 px-0 px-lg-3">
              <div className="px-sm-3 px-0 d-flex justify-content-center" >
                    <div className={`p-sm-4 p-3 contactFormContainer mt-5`} style={{borderRadius:"8px"}}>
                        <div className="mb-3">
                             <span>Leave a message here:</span>
                        </div>
                        <div className="">
                            <form onSubmit={onSubmit}>
                            <div className="form-floating mb-3 contactFormInput">
                                <input type="text" className={`form-control  `} id="floatingInput" name="name" ref={nameRef} placeholder="" required />
                                <label htmlFor="floatingInput">Your name</label>
                            </div>
                            <div className="form-floating mb-3 contactFormInput">
                                <input type="email" className={`form-control`} id="floatingInput" placeholder="name@example.com" name="email" ref={emailRef} required/>
                                <label htmlFor="floatingInput" >Your email</label>
                            </div>
                            <div className="form-floating mb-2 contactFormInput">
                                <textarea className={`form-control `} placeholder="Leave a comment here" id="floatingTextarea2" name="message" ref={msgRef} style={{height: "150px"}} required></textarea>
                                <label htmlFor="floatingTextarea2">Enter your message...</label>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className={`py-1 contactFormBtn`}>Send</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ToastContainer toastStyle={{ marginTop: "80px" }} />
    </div>
  );
};

export default ContactUs;
