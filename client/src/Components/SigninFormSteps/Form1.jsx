import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  HStack,
  InputLeftAddon,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Select } from "chakra-react-select";
import { groupedCountries } from "../../Assets/Data/Countries";
import { useChakraSelectProps } from "chakra-react-select";

export default function Form1(props) {
  const dealingWithPhoneNumberPrefixOnCountryChange = (e) => {
    const event = {
      target: {
        id: "country",
        value: e,
      },
    };
    props.setFormData(event);
  };

  useEffect(() => {
    props.setPhoneNumberPrefix(props.data.country.code)    
  }, [props.data.country]);

  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb="5%"
      >
        User Details
      </Heading>

      <HStack spacing={8}>
        <div className="parent">
          <FormControl>
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <Input
              id="firstName"
              value={props.data.firstName}
              onChange={props.setFormData}
            />
          </FormControl>
        </div>

        <div className="parent" style={{ paddingLeft: "11%" }}>
          <FormControl>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <Input
              id="lastName"
              value={props.data.lastName}
              onChange={props.setFormData}
            />
          </FormControl>
        </div>
      </HStack>

      <div className="parent">
        <FormControl mt="3%" isRequired isInvalid={props.errors.email}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            id="email"
            type="email"
            value={props.data.email}
            onChange={props.setFormData}
          />
          {props.errors.email === "" ? (
            <FormHelperText>No spam! Unsubscribe at any time</FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.email}</FormErrorMessage>
          )}
        </FormControl>
      </div>

      <div className="parent">
        <FormControl mt="3%" isRequired isInvalid={props.errors.country}>
          <FormLabel htmlFor="country">Country</FormLabel>
          <Select
            id="country"
            options={groupedCountries}
            onChange={(e) => {
              dealingWithPhoneNumberPrefixOnCountryChange(e);
            }}
            value={props.data.country}
            selectedOptionColorScheme="green"
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                w: "40px",
                bg: "#625D63",
                _dark: {
                  bg: "#2D252E",
                },
              }),
              control: (provided, state) => ({
                ...provided,
                borderBottomLeftRadius: state.menuIsOpen ? 0 : "md",
                borderBottomRightRadius: state.menuIsOpen ? 0 : "md",
                transitionDuration: 5,
              }),
              group: (provided) => ({
                ...provided,
                borderBottomWidth: "2px",
                borderBottomColor: "#F0EB8D",
                _last: {
                  borderBottomWidth: 0,
                },
              }),
              groupHeading: (provided) => ({
                ...provided,
                bgColor: "#dbe0e0",
                _dark: { bgColor: "#000000" },
                fontWeight: "bold",
                fontSize: "14px",
                px: "1.4rem",
                textTransform: "uppercase",
              }),
              menu: (provided) => ({
                ...provided,
                my: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderWidth: "2px",
                borderColor: "#2D252E",
                _dark: {
                  borderColor: "#625D63",
                },
                borderBottomRadius: "md",
              }),
              menuList: (provided) => ({
                ...provided,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                bgColor: "#dbe0e0",
                _dark: { bgColor: "#000000" },
              }),
            }}
          ></Select>
          {props.errors.country === "" ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.country}</FormErrorMessage>
          )}
        </FormControl>
      </div>

      <div className="parent">
        <FormControl mt="5%" isRequired isInvalid={props.errors.phoneNumber}>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <InputGroup>
            <InputLeftAddon
              width={"54px"}
              children={props.phoneNumberPrefix}
              bgColor={useColorModeValue("#625D63", "#2D252E")}
              color={"white"}
            />
            <Input
              type="number"
              id="phoneNumber"
              pattern="[0-9]*"
              value={props.data.phoneNumber}
              onChange={props.setFormData}
            />
          </InputGroup>
          {props.errors.phoneNumber === "" ? (
            <FormHelperText>We will not share your number</FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.phoneNumber}</FormErrorMessage>
          )}
        </FormControl>
      </div>
    </>
  );
}
