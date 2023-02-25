
export const validateData = (data) => {
console.log(data);
    const dataToBeReturned = {...data, noErrors:true}
    if ("username" in data) {
        if (data.username == "") {
            dataToBeReturned.username = "Username is required"
            dataToBeReturned.noErrors=false
        }
    }

    if(("email" in data)){
        if(data.email == ""){
            dataToBeReturned.email="Email is required"
            dataToBeReturned.noErrors=false
        }
    }

    if("phoneNumber" in data){
        if(data.phoneNumber == ""){
            dataToBeReturned.phoneNumber="Phone number is required"
            dataToBeReturned.noErrors=false
        }
    }

    if("subject" in data){
        if(data.subject==""){
            dataToBeReturned.subject="Subject is required"
            dataToBeReturned.noErrors=false
        }
    }    

    return dataToBeReturned
}

