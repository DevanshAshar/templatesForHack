import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Form2(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({ password: "", confirmPassword: ""})

    useEffect(() => {
        if (props.data.password !== props.data.confirmPassword) {
            setErrors({ ...errors, password: "Passwords are not matching" })
        } else {
            setErrors({ ...errors, password: "" })
        }
    }, [props.data.password, props.data.confirmPassword])


    return (
        <>
            <Heading textAlign={'center'} fontSize={{ sm: '2xl', md: '4xl', lg: '5xl', xl: '5xl' }} mb="5%">
                Setup your account
            </Heading>

            <div className="parent">
                <FormControl isRequired isInvalid={errors.username}>
                    <FormLabel htmlFor="username" >
                        Username
                    </FormLabel>
                    <Input id="username" value={props.data.username} onChange={props.setFormData} />
                    {errors.username!== "" && (
                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                    )}
                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="3%" id="password" isRequired isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} value={props.data.password} onChange={props.setFormData} />
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
                    {errors.password == "" ? (
                        <FormHelperText>
                            Please dont tell your password to anyone!
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}

                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="3%" id="confirmPassword" isRequired isInvalid={errors.password}>
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
                    {errors.password == "" ? (
                        <FormHelperText>
                            Please dont tell your password to anyone!
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}

                </FormControl>
            </div>
        </>
    )
}
