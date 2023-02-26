export const validateData = (data) => {
    console.log(data);
    
    const dataToBeReturned = {...data, noErrors:true}
    if ("username" in data) {
        if (data.username == "") {
            dataToBeReturned.username = "Username is required"
            dataToBeReturned.noErrors=false
        }else{
            dataToBeReturned.username=""
        }
    }

    if("email" in data){
        if(data.email == ""){
            dataToBeReturned.email="Email is required"
            dataToBeReturned.noErrors=false
        }else if(false){
            //else if karke logic lagadena @varun vishwanath.. password me bhi strenght ka 
            //phone no me hardcode 10 math dal kyuki alag alag countries ka jzaroori nahi 10 digit hi ho
            //phone no ke liye ye dekh https://www.abstractapi.com/api/phone-validation-api
        }
        else{
            dataToBeReturned.email=""
        }
    }

    if("phoneNumber" in data){
        var prefix = data.phoneNumber.split(' ')[0]
        if(data.phoneNumber.split(' ')[1] == ""||data.phoneNumber==""){
            dataToBeReturned.phoneNumber="Phone number is required"
            dataToBeReturned.noErrors=false
        }else{
            dataToBeReturned.phoneNumber=""
        }
    }

    if("subject" in data){
        if(data.subject==""){
            dataToBeReturned.subject="Subject is required"
            dataToBeReturned.noErrors=false
        }else{
            dataToBeReturned.subject=""
        }
    }    

    return dataToBeReturned
}

