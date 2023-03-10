import {
    Container,
    FormLabel,
    FormControl,
    Input,
    Button,
    VStack,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

export default function Form3(props) {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const resetPassword = async () => {
        var { password, email } = props.data
        const resp = await fetch("http://localhost:5000/user/newPass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if (resp.status == 200) {
            toast({
                status: "success",
                title: "Password changed!",
                description: "Please login to your account now",
                duration: 3000,
                isClosable: true,
            });
            navigate("/")
        } else {

        }
    }

    return (
        <VStack w={'100%'} spacing={5}>

            <Container>
                <div className="parent">
                    <FormControl id="password" isRequired >
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} value={props.data.Password} onChange={props.setFormData} />
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </div>
            </Container>

            <Container>
                <div className="parent">
                    <FormControl id="confirmPassword" isRequired >
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <Input type={showConfirmPassword ? 'text' : 'password'} value={props.data.confirmPassword} onChange={props.setFormData} />
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }>
                                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </div>
            </Container>

            <Button
                colorScheme="teal"
                variant="outline"
                rounded="md"
                w={'50%'}
                onClick={resetPassword}
            >
                Reset Password
            </Button>

        </VStack>
    )

}
