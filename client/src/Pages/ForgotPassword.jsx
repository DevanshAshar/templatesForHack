import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Container,
    Box,
    Stack,
    Heading,
    VStack,
    Text,
    useColorModeValue,
    Flex,
} from '@chakra-ui/react';
import Form1 from '../Components/ForgotPasswordForm/Form1';
import Form2 from '../Components/ForgotPasswordForm/Form2';
import Form3 from '../Components/ForgotPasswordForm/Form3';

export default function ForgotPassword() {
    const location = useLocation()
    const [data, setData] = useState({ email: location.state.email, otp: 0, password: "", confirmPassword: "" })
    const [step, setStep] = useState(location.state.from)

    //when rediricting from accounts page to reset page just make sure to redirect them with email and step in state  

    const setFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
        console.log(data);
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
                            <Heading fontSize={{ sm: '3xl', lg: '4xl' }}>{step == 3 ? "Enter new password" : step == 1 ? "Verify your email address" : "We have sent the code to email"}</Heading>
                            <Text fontSize={{ sm: 'md', md: 'lg', lg: 'xl' }} color='red'>{(step > 1) && "Do NOT refresh "}</Text>
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
                                pos="relative"
                                spacing={9}
                                noValidate
                                p={6}
                                bg={useColorModeValue('white', 'gray.700')}
                                rounded="lg"
                                boxShadow="lg"
                            >
                                {step == 1 ?
                                    <Form1 setStep={setStep} setFormData={setFormData} data={data} /> :
                                    step == 2 ?
                                        <Form2 setStep={setStep} setFormData={setFormData}  setData={setData} data={data} /> :
                                        <Form3 setStep={setStep} setFormData={setFormData} data={data}/>
                                }
                            </VStack>
                        </Box>

                    </Stack>
                </Container>
            </Flex>
        </>
    )
}
