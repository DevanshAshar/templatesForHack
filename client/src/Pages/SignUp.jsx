import React, { useState } from "react";
import {
  Progress,
  Box,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import Form3 from "../Components/SigninFormSteps/Form3";
import Form1 from "../Components/SigninFormSteps/Form1";
import Form2 from "../Components/SigninFormSteps/Form2";
import { ValidateData } from "../Utils/validateData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function SignIn() {
  let steps = 3;
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    firstName: "",
    username: "",
    confirmPassword: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
    socials: "",
  });

  console.log(step)

  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const [errors, setErrors] = useState({
    firstName: "",
    username: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    phoneNumber: "",
  });
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const setProfilePicLogic = (url) => {
    setProfilePic(url.secure_url);
  };

  const deleteProfilePicLogic = () => {
    setProfilePic("");
  };


  //  for multiple we will use array
  // const setProfilePicLogic = (url) => {
  //     profilePic.push(url)
  //     console.log(profilePic)
  // }
  // const deleteProfilePicLogic = (token) => {
  //     profilePic = profilePic.filter((pic) => {
  //         return pic.delete_token != token
  //     })
  //     console.log(profilePic)
  // }

  const nextButtonLogic = async () => {
    let err = { noErrors: true };
    if (step === 1 && data.country !== "") {
      err = await ValidateData({
        phoneNumber: data.phoneNumber,
        email: data.email,
        country: data.country,
        phoneNumberPrefix: phoneNumberPrefix,
      });
      setErrors(err);
    } else if (step === 2 && data.password === data.confirmPassword) {
      err = await ValidateData({
        username: data.username,
        password: data.password,
      });
      setErrors(err);
    }
    if (err.noErrors === true) {
      setStep(step + 1);
      setProgress(progress + 100 / steps);
    }
  };

  const dealingWithSignInFormSubmission = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, phoneNumberPrefix, profilePic }),
    });
    const responseInJSON = await resp.json();
    if (resp.status === 200) {
      toast({
        status: "success",
        title: "Account created!",
        description: "Please login to your account now",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } else {
      if (responseInJSON.message === "Username is not unique") {
        setErrors({ ...errors, username: "This username is taken" });
        setStep(2);
      } else if (responseInJSON.message === "Email is not unique") {
        setErrors({
          ...errors,
          email: "An account already exists for this email",
        });
        setStep(1);
      }
    }
  };

  return (
    <Flex align={"center"} justify={"center"} alignContent={"space-evenly"} >
      <Box
        bg={useColorModeValue("#a0a0a0", "#241f1f")}
        borderWidth="1px"
        rounded="lg"
        width={{ sm: "sm", md: "md", xl: "xl", lg: "lg" }}
        shadow="2xl"
        p={6}
        onSubmit={dealingWithSignInFormSubmission}
        method="POST"
        noValidate
        as="form"
      >
        {progress !== 1 && (
          <Progress
            colorScheme={"green"}
            hasStripe
            value={progress}
            mb="5%"
            size={{ sm: "sm", md: "md" }}
            mx="5%"
            isAnimated
          ></Progress>
        )}

        {step === 1 ? (
          <Form1
            errors={errors}
            phoneNumberPrefix={phoneNumberPrefix}
            setPhoneNumberPrefix={setPhoneNumberPrefix}
            setFormData={setFormData}
            data={data}
          />
        ) : step === 2 ? (
          <Form2
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            data={data}
          />
        ) : (
          <Form3
            profilePic={profilePic}
            setLogic={setProfilePicLogic}
            deleteLogic={deleteProfilePicLogic}
            setFormData={setFormData}
            data={data}
            errors={setErrors}
          />
        )}

        <Flex w="100%" mt={"20px"}>
          <Tooltip
            placement="bottom"
            label="You wont lose your progress"
            hasArrow
            arrowSize={9}
            openDelay={350}
          >
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 100 / steps);
              }}
              hidden={step === 1}
              variant="negative"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
          </Tooltip>

          <Spacer />

          {step !== steps && (
            <Button
              w="7rem"
              hidden={step === 5}
              onClick={nextButtonLogic}
              colorScheme="teal"
              variant="submit"
            >
              Next
            </Button>
          )}

          {step === steps && (
            <Button
              w="7rem"
              hidden={step === 5}
              onClick={dealingWithSignInFormSubmission}
              colorScheme="teal"
              variant="submit"
            >
              Submit
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
