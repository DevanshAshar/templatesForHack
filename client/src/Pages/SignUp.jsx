import React, { useEffect, useState } from "react";
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
  let steps = 1;
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(3);
  const [
    isPictureOnlySelectedAndNotUploaded,
    setIsPictureOnlySelectedAndNotUploaded,
  ] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    username: "",
    confirmPassword: "",
    lastName: "",
    email: "",
    password: "",
    country: {
      label: "",
      value: "",
      code: "",
    },
    //chakra react select needs value to be the whole object(look at countries data and not just label of the object)
    phoneNumber: "",
    socials: "",
  });

  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };


  const [errors, setErrors] = useState({
    firstName: "",
    username: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    phoneNumber: "",
  });
  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("");
  const [profilePic, setProfilePic] = useState({
    public_id: "",
    signature: "",
    version: "",
  });
  
  // const publicIdLogic =()=>{
  //   return ''
  // }

  const setProfilePicLogic = (cloudinaryObject) => {
    setProfilePic({
      ...profilePic,
      public_id: cloudinaryObject.public_id,
      signature: cloudinaryObject.signature,
      version: cloudinaryObject.version,
    });
  };


  const deleteMultipleLogic = (delete_token) =>{

  }

  const deleteProfilePicLogic = () => {
    setProfilePic({
      public_id: "",
      signature: "",
      version: "",
    });
  };

  //  for multiple we will use array
  // const settingPublicIdOfFiles = (cloudinaryObject) => {
  //   if (
  //     publicIdOfFiles.length === 1 &&
  //     publicIdOfFiles[0].public_id === "" &&
  //     publicIdOfFiles[0].version === "" &&
  //     publicIdOfFiles[0].signature === ""
  //   ) {
  //     setPublicIdOfFiles([
  //       {
  //         public_id: cloudinaryObject.public_id,
  //         signature: cloudinaryObject.signature,
  //         version: cloudinaryObject.version,
  //         delete_token:cloudinaryObject.delete_token
  //       },
  //     ]);
  //   } else {
  //     setPublicIdOfFiles([
  //       ...publicIdOfFiles,
  //       {
  //         public_id: cloudinaryObject.public_id,
  //         signature: cloudinaryObject.signature,
  //         version: cloudinaryObject.version,
  //         delete_token:cloudinaryObject.delete_token
  //       },
  //     ]);
  //   }
  // };
  // const deletePublicIdOfFiles = (token) => {
  //   setPublicIdOfFiles(
  //     publicIdOfFiles.filter((currentFile) => {
  //       return currentFile.delete_token !== token;
  //     })
  //   );
  // };



  const nextButtonLogic = async () => {
    let err = { noErrors: true };
    if (step === 1) {
      err = await ValidateData({
        phoneNumber: data.phoneNumber,
        email: data.email,
        country: data.country.label,
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

    if (isPictureOnlySelectedAndNotUploaded) {
      toast({
        status: "warning",
        title: "Image not uploaded!",
        description: "Please click on the upload button to upload",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const resp = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/user/newUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data,country:data.country.label, phoneNumberPrefix, ...profilePic }),
        }
      );
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
        } else if (
          responseInJSON.message === "cloudinary signature is invalid"
        ) {
          toast({
            status: "error",
            title: "Please try again!",
            description: "There was some issue with uplaoding the image",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            status: "error",
            title: "Please try again!",
            description: "There was some issue with the server",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Flex align={"center"} justify={"center"} alignContent={"space-evenly"}>
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
            setIsPictureOnlySelectedAndNotUploaded={
              setIsPictureOnlySelectedAndNotUploaded
            }
            files={files}
            setFiles={setFiles}
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
