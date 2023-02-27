// this is a function that dynamically checks which attribute you want to verify that you
// have in youre form then if there is no error in ALL the attributes it sets noErrors as true
// else the error message will be shown in the respective attribute (if an attribute has no error its "")
// hence you can use this to display the error in UI using error element easily

export const validateData = (data) => {
    
    const dataToBeReturned = { ...data, noErrors: true }

    if ("username" in data) {
    
        if (data.username == "") {
            dataToBeReturned.username = "Username is required"
            dataToBeReturned.noErrors = false
        } else {
            dataToBeReturned.username = ""
        }
    }

    if ("email" in data) {
        if (data.email == "") {
            dataToBeReturned.email = "Email is required"
            dataToBeReturned.noErrors = false
        } else if (false) {

        }
        else {
            dataToBeReturned.email = ""
        }
    }
    
    //else if jaha bhi hai logic lagadena on attributes me @varun vishwanath.. jaise password me bhi strenght ka etc 
    
    //phone no me hardcode 10 math dal kyuki alag alag countries ka jzaroori nahi 10 digit hi ho
    //phone no ke liye ye dekh https://www.abstractapi.com/api/phone-validation-api
    
    if ("phoneNumber" in data) {
        var prefix = data.phoneNumberPrefix
        if (data.phoneNumber == "") {
            dataToBeReturned.phoneNumber = "Phone number is required"
            dataToBeReturned.noErrors = false
        } else {
            dataToBeReturned.phoneNumber = ""
        }
    }

    if ("subject" in data) {
        if (data.subject == "") {
            dataToBeReturned.subject = "Subject is required"
            dataToBeReturned.noErrors = false
        } else {
            dataToBeReturned.subject = ""
        }
    }

    if ("password" in data) {
        if (data.password == "") {
            dataToBeReturned.password = "Password is required"
            dataToBeReturned.noErrors = false
        } else if (false) {

        } else {
            dataToBeReturned.password = ""
        }
    }


    return dataToBeReturned
}

