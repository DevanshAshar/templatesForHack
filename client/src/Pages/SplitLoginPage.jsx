import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Image,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
  GridItem,
  Grid,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function SplitLoginPage() {
  const { setAuth } = useAuth();

  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const dealingWithLoginPageSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/user/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const responseInJSON = await response.json();

    if (response.status === 200) {
      setAuth(responseInJSON.user)
       toast({
         title: "Login Successful!",
         status: "success",
         isClosable: true,
         autoClose: 300,
         position: "bottom-right",
       });
      navigate("/landing")
    } else if (data.email === "" || data.password === "") {
      toast({
        title: "Field(s) cannot be empty!",
        status: "error",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
    } else {
      //show that wrong credentials
      toast({
        title: "Invalid Credentials",
        status: "error",
        isClosable: true,
        autoClose: 300,
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Grid templateColumns="2fr 1fr 1fr">
        <GridItem gridColumn="1 / 3" gridRow={1} maxH={"100vh"}>
          <Image
            alt="Cover image"
            objectFit="cover"
            height="100%"
            width="100%"
            src="https://wallpaperaccess.com/full/2484157.jpg"
          />
        </GridItem>

        <GridItem
          gridColumn="2 / 4"
          gridRow={1}
          placeSelf="center"
          position="relative"
          rounded="lg"
          boxShadow="2xl"
          overflow="hidden"
          zIndex={100}
        >
          {/* try to use transperent box below here*/}
          <Box
            bgColor={useColorModeValue('primary.light','primary.dark')}
            backdropFilter="blur(15px)"
            position="absolute"
            inset="0"
            zIndex={-1}
          ></Box>

          <Grid
            gridAutoRows="auto"
            gap="1.5rem"
            as="form"
            noValidate
            onSubmit={dealingWithLoginPageSubmission}
            p={{ base: 3, sm: "2em" }}
          >
            <GridItem>
              <Box textAlign="centepr">
                <Heading fontSize={"3xl"}>Sign in to your account</Heading>
                <Text fontSize={"lg"} >
                  to enjoy all of our cool{" "}
                  <Link
                    to="/about"
                    as={NavLink}
                    variant={'normalLinkWithUnderline'}
                  >
                    features
                  </Link>
                </Text>
              </Box>
            </GridItem>

            <GridItem display="grid" gap="1rem">
              <FormControl  isRequired className="form-input">
                <FormLabel>Email/Username</FormLabel>
                <Input
                  rounded="md"
                  id="email"
                  onChange={setFormData}
                  type="email"
                  value={data.username}
                />
              </FormControl>

              <FormControl isRequired className="form-input">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={setFormData}
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    id="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </GridItem>

            <GridItem display="grid" placeItems="center start" gap="1rem 20px">
              <Link
                as={NavLink}
                to="/signup"
                fontSize={{ base: "md", sm: "md" }}
              >
                Create new account
              </Link>

              <Link
                as={NavLink}
                to="/forgotpassword"
                state={{ email: data.email, from: 1 }}
                fontSize={{ base: "md", sm: "md" }}
              >
                Forgot password?
              </Link>

              <Button
                bg="green.400"
                color="white"
                _hover={{
                  bg: "green.600",
                }}
                rounded="md"
                type="submit"
                width="100%"
                gridColumn="span 2"
              >
                Sign in
              </Button>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
