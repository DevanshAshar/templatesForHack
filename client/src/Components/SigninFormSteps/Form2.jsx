import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

export default function Form2(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (props.data.password !== props.data.confirmPassword) {
      props.setErrors({
        ...props.errors,
        password: "Passwords are not matching",
      });
    } else {
      props.setErrors({ ...props.errors, password: "" });
    }
  }, [props.data.password, props.data.confirmPassword]);

  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb="5%"
      >
        Setup your account
      </Heading>

      <div className="parent">
        <FormControl isRequired isInvalid={props.errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            value={props.data.username}
            onChange={props.setFormData}
            mb={'10px'}
          />
          {props.errors.username == "" ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.username}</FormErrorMessage>
          )}
        </FormControl>
      </div>

      <div className="parent">
        <FormControl
          mt="3%"
          id="password"
          isRequired
          isInvalid={props.errors.password}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup mb={'17px'}>
            <Input
              type={showPassword ? "text" : "password"}
              value={props.data.password}
              onChange={props.setFormData}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <PasswordStrengthBar password={props.data.password} />
        </FormControl>
      </div>

      <div className="parent">
        <FormControl
          mt="3%"
          id="confirmPassword"
          isRequired
          isInvalid={props.errors.password}
        >
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={props.data.confirmPassword}
              onChange={props.setFormData}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {props.errors.password == "" ? (
            <FormHelperText>
              Please dont tell your password to anyone!
            </FormHelperText>
          ) : (
            <FormErrorMessage>{props.errors.password}</FormErrorMessage>
          )}
        </FormControl>
      </div>
    </>
  );
}
