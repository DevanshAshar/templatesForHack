// this is a function that dynamically checks which attribute you want to verify that you
// have in youre form then if there is no error in ALL the attributes it sets noErrors as true
// else the error message will be shown in the respective attribute (if an attribute has no error its "")
// hence you can use this to display the error in UI using error element easily

export const ValidateData = async (data) => {
    console.log(data)
  const dataToBeReturned = { ...data, noErrors: true };
  if ("username" in data) {
    if (data.username == "") {
      dataToBeReturned.username = "Username is required";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.username = "";
    }
  }

  if ("email" in data) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email == "") {
      dataToBeReturned.email = "Email is required";
      dataToBeReturned.noErrors = false;
    } else if (!data.email.match(mailformat)) {
      dataToBeReturned.email = "Please enter a proper email";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.email = "";
    }
  }

  if ("phoneNumber" in data) {
      if (data.phoneNumber == "") {
          dataToBeReturned.phoneNumber = "Phone number is required";
          dataToBeReturned.noErrors = false;
        } else {
        var prefix = data.phoneNumberPrefix;
        const api_key = process.env.REACT_APP_PHONENUMBER_API_KEY;
        const url =
          "https://phonevalidation.abstractapi.com/v1/?api_key=" +
          api_key +
          "&phone=" +
          prefix +
          data.phoneNumber;
        const res = await fetch(url);
        const resInJSON = await res.json();
        console.log(resInJSON)
      if (!resInJSON.valid) {
        dataToBeReturned.phoneNumber = `Phone number is invalid for ${data.country}`;
        dataToBeReturned.noErrors = false;
      } else {
        dataToBeReturned.phoneNumber = "";
      }
    }
  }

  if ("subject" in data) {
    if (data.subject == "") {
      dataToBeReturned.subject = "Subject is required";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.subject = "";
    }
  }

  if ("password" in data) {
    if (data.password == "") {
      dataToBeReturned.password = "Password is required";
      dataToBeReturned.noErrors = false;
    } else if (false) {
      
    } else {
      dataToBeReturned.password = "";
    }
  }
  console.log(dataToBeReturned);
  return dataToBeReturned;
};
