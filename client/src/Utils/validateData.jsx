export const ValidateData = async (data) => {
  const dataToBeReturned = { ...data, noErrors: true };
  if ("username" in data) {
    if (data.username === "") {
      dataToBeReturned.username = "Username is required";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.username = "";
    }
  }

  if ("email" in data) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email === "") {
      dataToBeReturned.email = "Email is required";
      dataToBeReturned.noErrors = false;
    } else if (!data.email.match(mailformat)) {
      dataToBeReturned.email = "Please enter a proper email";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.email = "";
    }
  }

  if ("country" in data) {
    console.log('country part')
    if (data.country === "") {
      dataToBeReturned.country = "Please select a country";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.country = "";
    }
  }

  if ("phoneNumber" in data) {
    if ("country" in data && data.country != "") {
      if (data.phoneNumber === "") {
        dataToBeReturned.phoneNumber = "Phone number is required";
        dataToBeReturned.noErrors = false;
      } else {
        let prefix = data.phoneNumberPrefix;
        if (prefix) {
          const api_key = import.meta.env.VITE_PHONENUMBER_API_KEY;
          const url =
            "https://phonevalidation.abstractapi.com/v1/?api_key=" +
            api_key +
            "&phone=" +
            prefix +
            data.phoneNumber;
          const res = await fetch(url);
          const resInJSON = await res.json();
          if (!resInJSON.valid) {
            dataToBeReturned.phoneNumber = `Phone number is invalid for ${data.country}`;
            dataToBeReturned.noErrors = false;
          } else {
            dataToBeReturned.phoneNumber = "";
          }
        }
      }
    }
  }

  if ("subject" in data) {
    if (data.subject === "") {
      dataToBeReturned.subject = "Subject is required";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.subject = "";
    }
  }

  if ("password" in data) {
    if (data.password === "") {
      dataToBeReturned.password = "Password is required";
      dataToBeReturned.noErrors = false;
    } else {
      dataToBeReturned.password = "";
    }
  }

  return dataToBeReturned;
};
