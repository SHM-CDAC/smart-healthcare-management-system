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

    if(regDetails.address.trim() == "")
        return errmsg = "Address is required*";

    if(regDetails.gender == "")
        return errmsg = "Gender is required*";

    if(regDetails.dob == "")
        return errmsg = "Date of Birth is required*";

    if(regDetails.password != regDetails.confirmPwd)
        return errmsg = "Password does not match with confirm password!";

    return errmsg;
}

export default validateRegForm;