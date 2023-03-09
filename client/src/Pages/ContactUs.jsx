import { Fragment, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { ValidateData } from "../Utils/ValidateData";

const contactOptions = [
  {
    label: "BASE ADDRESS",
    value: "Mumbai, India",
    icon: GoLocation,
  },
  {
    label: "CONTACT NUMBER",
    value: "+91 981-928-1311",
    icon: BsPhone,
  },
  {
    label: "EMAIL ADDRESS",
    value: "info@example.com",
    icon: HiOutlineMail,
  },
];

export default function ContactUs() {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState(data);

  const dealingWithFormSubmission = async (e) => {
    e.preventDefault();
    var err = ValidateData(data);
    setErrors(err);

    if (err.noErrors == true) {
      console.log("yooo");

      // const resp= await fetch("/contactData",{
      //   method:"POST",
      //   headers:{
      //     "Content-Type": "application/json"
      //   },
      //   body:JSON.stringify(data)
      // })

      // if(resp.status==200){
      //   //display success toast
      // }else{
      //   //display error toast
      // }
    }
  };

  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
      <Stack spacing={10}>
        <Flex align="center" justify="center" direction="column">
          <Heading fontSize="4xl" mb={2}>
            Contact Us
          </Heading>
          <Text fontSize="md" textAlign="center">
            Please reach out to us without hesitation!
          </Text>
        </Flex>
        <Stack
          spacing={{ base: 6, md: 0 }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          {contactOptions.map((option, index) => (
            <Fragment key={index}>
              <Stack
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center"
                px={3}
              >
                <Icon as={option.icon} w={10} h={10} color="green.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value}
                </Text>
              </Stack>
              {contactOptions.length - 1 !== index && (
                <Flex d={{ base: "none", md: "flex" }}>
                  <Divider orientation="vertical" />
                </Flex>
              )}
            </Fragment>
          ))}
        </Stack>
        <VStack
          noValidate
          as="form"
          method="POST"
          onSubmit={dealingWithFormSubmission}
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={5} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl className="parent" id="name">
                <FormLabel>Name </FormLabel>
                <Input
                  type="text"
                  placeholder="Aman Nambisan"
                  rounded="md"
                  onChange={setFormData}
                />
              </FormControl>

              <FormControl
                isInvalid={errors.email}
                className="parent"
                id="email"
                isRequired
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="try.user99@gmail.com
"
                  rounded="md"
                  onChange={setFormData}
                />
                {errors.email == "" ? (
                  <FormHelperText>
                    We promise to not spam your inbox!
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <FormControl
              className="parent"
              isInvalid={errors.subject}
              id="subject"
              isRequired
            >
              <FormLabel>Subject</FormLabel>
              <Input
                type="text"
                onChange={setFormData}
                placeholder="Are you available for freelance work?"
                rounded="md"
              />
              {errors.subject == "" && (
                <FormErrorMessage>{errors.subject}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl className="parent" id="message">
              <FormLabel>Message</FormLabel>
              <Textarea
                onChange={setFormData}
                size="lg"
                placeholder="Enter your message"
                rounded="md"
              />
            </FormControl>
          </VStack>

          <VStack w="100%">
            <Button
              bg="#318e5d"
              color="white"
              _hover={{
                bg: "green.700",
              }}
              rounded="md"
              w={{ base: "100%", md: "max-content" }}
              type="submit"
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
}
