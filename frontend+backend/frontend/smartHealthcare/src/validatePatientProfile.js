const validatePatientUpdationForm =(patientDetails) =>{
    let errmsg = "";

    if(patientDetails.firstName.trim() == "")
        return errmsg="First name is required*";

    if(patientDetails.lastName.trim() == "")
        return errmsg="Last name is required*";

    if(patientDetails.email.trim() == "")
        return errmsg = "Email is required*";

    if(patientDetails.city.trim() == "")
        return errmsg="City is required*";

    if(patientDetails.mobileNo.trim() == "")
        return errmsg="Mobile number is required*";

    if(patientDetails.address.trim() == "")
        return errmsg = "Address is required*";

    if(patientDetails.gender == "")
        return errmsg = "Gender is required*";

    if(patientDetails.dob == "")
        return errmsg = "Date of Birth is required*";

    return errmsg;
}

export default validatePatientUpdationForm;