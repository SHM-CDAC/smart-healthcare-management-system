const validateRegForm =(regDetails) =>{
    let errmsg = "";

    if(regDetails.firstName.trim() == "")
        return errmsg="First name is required*";

    if(regDetails.lastName.trim() == "")
        return errmsg="Last name is required*";

    if(regDetails.email.trim() == "")
        return errmsg = "Email is required*";

    if(regDetails.password.trim() == "")
        return errmsg = "Password is required*";

    if(regDetails.confirmPwd.trim() == "")
        return errmsg = "Confirm Password is required*";

    if(regDetails.city.trim() == "")
        return errmsg="City is required*";

    if(regDetails.mobileNo.trim() == "")
        return errmsg="Mobile number is required*";

    if(regDetails.degree.trim() == "")
        return errmsg = "Degree is required*";

    if(regDetails.specialization.trim() == "")
        return errmsg = "Specialization is required*";

    if(regDetails.experience.trim() == "")
        return errmsg = "Experience is required*";

     if(regDetails.fee.trim() == "")
        return errmsg = "Consultation fees is required*";

    if(regDetails.clinicName.trim() == "")
        return errmsg = "Clinic name is required*";

    if(regDetails.clinicAddr.trim() == "")
        return errmsg = "Clinic Address is required*";

    if(regDetails.gender == "")
        return errmsg = "Gender is required*";

    if(regDetails.dob == "")
        return errmsg = "Date of Birth is required*";

    if(regDetails.password != regDetails.confirmPwd)
        return errmsg = "Password does not match with confirm password!";

    return errmsg;
}

export default validateRegForm;