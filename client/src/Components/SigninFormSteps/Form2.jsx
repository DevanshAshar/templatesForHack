import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Form2(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Heading textAlign={'center'} fontSize={{ sm: '2xl', md: '4xl', lg: '5xl', xl: '5xl' }} mb="5%">
                Setup your account
            </Heading>

            <div className="parent">
                <FormControl>
                    <FormLabel htmlFor="username" >
                        Username
                    </FormLabel>
                    <Input id="username" value={props.data.username} onChange={props.setFormData} />
                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="3%" id="password" isRequired >
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
                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="3%" id="confirmPassword" isRequired >
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
        </>
    )
}
