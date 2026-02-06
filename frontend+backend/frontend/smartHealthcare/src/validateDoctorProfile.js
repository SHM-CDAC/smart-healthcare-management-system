
const validateDoctorUpdationForm =(doctorDetails) =>{
    let errmsg = "";

    if(doctorDetails.firstName.trim() == "")
        return errmsg="First name is required*";

    if(doctorDetails.lastName.trim() == "")
        return errmsg="Last name is required*";

    if(doctorDetails.email.trim() == "")
        return errmsg = "Email is required*";

    if(doctorDetails.city.trim() == "")
        return errmsg="City is required*";

    if(doctorDetails.mobileNo.trim() == "")
        return errmsg="Mobile number is required*";

    if(doctorDetails.clinicAddress.trim() == "")
        return errmsg = "Clinic Address is required*";

    if(doctorDetails.gender == "")
        return errmsg = "Gender is required*";

    if(doctorDetails.dob == "")
        return errmsg = "Date of Birth is required*";

    if(doctorDetails.specialization.trim() == "")   
        return errmsg = "Specialization is required*" ;

    if(doctorDetails.clinicName.trim() == "")
        return errmsg = "Clinic Name is required*";

    if(doctorDetails.degree.trim() == "")
        return errmsg = "Degree is required*";

    if(doctorDetails.experience.trim() == "" || doctorDetails.experience.trim() <= 0 )
        return errmsg = "Experience must be a positive number*";

    if(doctorDetails.fee.trim() == "" || doctorDetails.fee.trim() <0)
        return errmsg = "Fee must be a positive number*";

    return errmsg;
}

export default validateDoctorUpdationForm;