import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Container,
    Box,
    FormLabel,
    FormControl,
    Input,
    Stack,
    Button,
    Heading,
    VStack,
    Text,
    useColorModeValue,
    Flex,
    HStack,
    PinInput,
    PinInputField,
    InputRightElement,
    InputGroup,
    Spacer,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function ForgotPassword() {
    const location = useLocation()
    const navigate = useNavigate();
    const [data, setData] = useState({ email: location.state.email, otp: 0, password: "", confirmPassword: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(location.state.from)

    //when rediricting from accounts page to reset page just make sure to redirect them with email and step in state  

    const dealingWithOTPFormSubmission = () => {
        const resp = fetch("loginWithOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (resp.status == 200) {
            setStep(3)
            //navigate
        } else {
            //toast
        }
    }

    const resetPassword = async ()=>{
        const resp=fetch("resetPassword",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(resp.status==200){

        }else{

        }
    }

    const sendOTP = async () => {
        const resp = fetch("sendmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data.email)
        })

        if (resp.status == 200) {
            setStep(2)
        } else {

        }
    }

    const setPin = (e) => {
        setData({ ...data, otp: e })
    }

    const setFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
        console.log(data);
    }

    const Step1Form = () => {
        return (
            <VStack w={'100%'} spacing={6}>
                <Container w={'100%'}>
                    <div className='parent'>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={data.email} onChange={setFormData} placeholder="Your email" rounded="md" />
                        </FormControl>
                    </div>
                </Container>

                <Button
                    colorScheme="teal"
                    variant="outline"
                    rounded="md"
                    w={"40%"}
                    onClick={sendOTP}
                >
                    Confirm
                </Button>

            </VStack>
        )
    }

    const Step2Form = () => {
        return (
            <VStack w={'100%'} spacing={7} >
                <div className='parent'>
                    <FormControl id="otp" isRequired>
                    <FormLabel ml={'36px'}>Enter 4 digit OTP</FormLabel>
                        <HStack>
                            <PinInput variant={'filled'} size={{ sm: 'md', lg: 'lg' }} type='number' onChange={setPin} onComplete={dealingWithOTPFormSubmission}>
                                <PinInputField id='otp' />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                    </FormControl>
                </div>

                <Flex w={'100%'}>
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        rounded="md"
                        w={'40%'}
                        onClick={()=>{setStep(step-1)}}                    >
                        Back
                    </Button>
                    <Spacer />
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        rounded="md"
                        w={"40%"}
                        onClick={sendOTP}
                    >
                        Resend OTP
                    </Button>
                </Flex>
            </VStack>

        )
    }

    const Step3Form = () => {
        return (
            <VStack w={'100%'} spacing={5}>

                <Container>
                    <div className="parent">
                        <FormControl  id="password" isRequired >
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={data.confirmPassword} onChange={setFormData} />
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
                                <Input type={showConfirmPassword ? 'text' : 'password'} value={data.confirmPassword} onChange={setFormData} />
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



    return (
        <>
            <Flex
                minH={'92vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>

                <Container maxW="5xl">
                    <Stack spacing={4} maxW={{ sm: '30rem', md: "32rem", lg: "35rem" }} margin="0 auto">

                        <Stack align="center" spacing={4} mb='1%'>
                            <Heading fontSize={{ sm: '3xl', lg: '4xl' }}>{step == 3 ? "Enter new password" : step==1?"Verify your email address":"We have sent the code to email"}</Heading>
                            <Text fontSize={{ sm: 'md', md: 'lg', lg: 'xl' }} color='red'>{(step>1) && "Do NOT refresh "}</Text>
                        </Stack>

                        <Box pos="relative">
                            <Box
                                pos="absolute"
                                top="-8px"
                                right="-9px"
                                bottom="-8px"
                                left="-7px"
                                rounded="lg"
                                bgGradient="linear(to-l, #1C4532,#38A169)"
                                transform="rotate(-2deg)"
                            ></Box>

                            <VStack
                                as="form"
                                pos="relative"
                                spacing={9}
                                noValidate
                                onSubmit={dealingWithOTPFormSubmission}
                                p={6}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded="lg"
                                boxShadow="lg"
                            >
                                {step == 1 ?
                                    <Step1Form /> :
                                    step == 2 ?
                                        <Step2Form /> :
                                        <Step3Form />
                                }
                            </VStack>

                        </Box>

                    </Stack>
                </Container>
            </Flex>
        </>
    )
}
