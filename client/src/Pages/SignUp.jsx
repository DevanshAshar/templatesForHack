import React, { useMemo, useState } from "react";
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
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { ValidateData } from "../Utils/ValidateData";
import { useToast } from "@chakra-ui/react";
import Form4 from "../Components/SigninFormSteps/Form4";
import Form5Employee from "../Components/SigninFormSteps/Form5Employee";
import Form5Recruiter from "../Components/SigninFormSteps/Form5Recruiter";

export default function SignIn() {
  const toast = useToast();
  const countries = useMemo(() => {
    return Country.getAllCountries();
  }, []);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [data, setData] = useState({
    firstName: "",
    username: "",
    confirmPassword: "",
    lastName: "",
    email: "",
    password: "",
    country: "India",
    phoneNumber: "",
    socials: "",

    role: "",

    skills: "",
    yearsOfExperience: 0,
    highestLevelOfEducation: "",
    Field: "",
    City: "",
    Pincode: "",

    companyName: "",
    BasedOutOfLocation: "",
    pincode: ""

  });
  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const [errors, setErrors] = useState({
    firstName: "",
    username: "",
    lastName: "",
    email: "",
    password: "",
    country: "India",
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

  const setRole = (role) => {
    setData({ ...data, role: role })
    setStep(step + 1);
    setProgress(progress + 20);
  }

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
    if (step == 1) {
      var err = await ValidateData({
        phoneNumber: data.phoneNumber,
        email: data.email,
        country: data.country,
        phoneNumberPrefix: phoneNumberPrefix,
      });
      setErrors(err);
      console.log(err);
    } else if (step == 2) {
      var err = await ValidateData({
        username: data.username,
        password: data.password,
      });
      setErrors(err);
    } else {
      err = { noErrors: true }
    }

    if (err.noErrors === true) {
      console.log('asdasd11')
      setStep(step + 1);
      setProgress(progress + 20);
    }

  };

  const dealingWithSignInFormSubmission = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/user/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, phoneNumberPrefix, profilePic }),
    });
    const responseInJSON = await resp.json();
    if (resp.status == 200) {
      toast({
        status: "success",
        title: "Account created!",
        description: "Please login to your account now",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } else {
      if (responseInJSON.message == "Username is not unique") {
        setErrors({ ...errors, username: "This username is taken" });
        setStep(2);
      } else if (responseInJSON.message == "Email is not unique") {
        setErrors({
          ...errors,
          email: "An account already exists for this email",
        });
        setStep(1);
      }
    }
  };


  return (
    <Flex
      minH={"92vh"}
      align={"center"}
      justify={"center"}
      alignContent={"space-evenly"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        bg={useColorModeValue("white", "gray.700")}
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
        <Progress
          colorScheme={"green"}
          hasStripe
          value={progress}
          mb="5%"
          size={{ sm: "sm", md: "md" }}
          mx="5%"
          isAnimated
        ></Progress>

        {step === 1 ? (
          <Form1
            errors={errors}
            phoneNumberPrefix={phoneNumberPrefix}
            setPhoneNumberPrefix={setPhoneNumberPrefix}
            setFormData={setFormData}
            countries={countries}
            data={data}
          />
        ) : step === 2 ? (
          <Form2
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            data={data}
          />
        ) : step === 3 ? (
          <Form3
            profilePic={profilePic}
            setLogic={setProfilePicLogic}
            deleteLogic={deleteProfilePicLogic}
            setFormData={setFormData}
            data={data}
            errors={setErrors}
          />
        ) : step == 4 ? (
          <Form4 role={data.role} setRole={setRole} />
        ) :
          data.role == "Recruiter" ?
            (
              <Form5Recruiter setFormData={setFormData}
                data={data}
              />
            ) :
            (< Form5Employee setFormData={setFormData}
              data={data}
            />)


        }

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
                setProgress(progress - 20);
              }}
              hidden={step === 1}
              colorScheme="teal"
              variant="outline"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
          </Tooltip>

          <Spacer />

          {step !== 4 && <Button
            w="7rem"
            hidden={step === 5}
            onClick={nextButtonLogic}
            colorScheme="teal"
            variant="outline"
          >
            Next
          </Button>}


          {step === 5 ? (
            <>
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                type="submit"
                _hover={{ bg: "green.600" }}
              >
                Submit
              </Button>
            </>
          ) : null}
        </Flex>
      </Box>
    </Flex>
  );
}
