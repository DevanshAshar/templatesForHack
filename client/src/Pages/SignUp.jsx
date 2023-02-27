import React, { useMemo, useState } from 'react';
import {
    Progress,
    Box,
    Button,
    Flex,
    Spacer,
    useColorModeValue,
    Tooltip,
} from '@chakra-ui/react';
import Form3 from "../Components/SigninFormSteps/Form3"
import Form1 from "../Components/SigninFormSteps/Form1"
import Form2 from "../Components/SigninFormSteps/Form2"
import { Country } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { validateData } from '../Utils/validateData';

export default function SignIn() {
    const countries = useMemo(() => {
        return Country.getAllCountries()
    }, [])
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(33.33);
    const [data, setData] = useState({ firstName: "", username: "", confirmPassword: "", lastName: "", email: "", password: "", country: "India", phoneNumber: "", profilePic: "" })
    const [errors, setErrors] = useState({ firstName: "", username: "", lastName: "", email: "", password: "", country: "India", phoneNumber: "", profilePic: "" })
    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("")

    const nextButtonLogic = () => {
        if (step == 1) {
            var err = validateData({ phoneNumber: data.phoneNumber, email: data.email, phoneNumberPrefix: phoneNumberPrefix })
            setErrors(err)
        } else if (step == 2) {
            var err = validateData({ username: data.username, password: data.password, })
            setErrors(err)
        } else {

        }

        if (err.noErrors == true && data.password == data.confirmPassword) {
            setStep(step + 1)
            setProgress(progress + 33.33)
        }

    }

    const dealingWithSignInFormSubmission = async (e) => {
        e.preventDefault()
        const resp = await fetch("http://localhost:5000/user/newUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data, phoneNumberPrefix })
        })
        const responseInJSON = await resp.json()
        if (resp.status == 200) {
            navigate("/abc")
        } else {
            if (responseInJSON.message == "Username is not unique") {
                setErrors({ ...errors, username: "This username is taken"})
                setStep(2)
            } else if (responseInJSON.message == "Email is not unique") {
                setErrors({ ...errors, email: "An account already exists for this email" })
                setStep(1)
            }
        }
    }

    const setFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
    }

    return (
        <Flex
            minH={'92vh'}
            align={'center'}
            justify={'center'}
            alignContent={'space-evenly'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderWidth="1px"
                rounded="lg"
                width={{ sm: 'sm', md: 'md', xl: 'xl', lg: "lg" }}
                shadow="2xl"
                p={6}
                onSubmit={dealingWithSignInFormSubmission}
                method="POST"
                noValidate
                as="form">
                <Progress
                    colorScheme={'green'}
                    hasStripe
                    value={progress}
                    mb="5%"
                    size={{ sm: 'sm', md: 'md' }}
                    mx="5%"
                    isAnimated>
                </Progress>

                {step === 1 ? <Form1 errors={errors} phoneNumberPrefix={phoneNumberPrefix} setPhoneNumberPrefix={setPhoneNumberPrefix} setFormData={setFormData} countries={countries} data={data} />
                    : step === 2 ? <Form2 setFormData={setFormData} errors={errors} setErrors={setErrors} data={data} />
                        : <Form3 setFormData={setFormData} errors={setErrors} data={data} />}

                <Flex w="100%" mt={'20px'}>

                    <Tooltip placement='bottom' label='You wont loose your progress' hasArrow arrowSize={9} openDelay={350}>
                        <Button
                            onClick={() => {
                                setStep(step - 1);
                                setProgress(progress - 33.33);
                            }}
                            hidden={step === 1}
                            colorScheme="teal"
                            variant="outline"
                            w="7rem"
                            mr="5%">
                            Back
                        </Button>
                    </Tooltip>

                    <Spacer />

                    <Button
                        w="7rem"
                        hidden={step === 3}
                        onClick={nextButtonLogic}
                        colorScheme="teal"
                        variant="outline">
                        Next
                    </Button>
                    {step === 3 ? (
                        <Button
                            w="7rem"
                            colorScheme="green"
                            variant="solid"
                            type='submit'
                            _hover={{ bg: "green.600" }}
                        >
                            Submit
                        </Button>
                    ) : null}
                </Flex>
            </Box>
        </Flex>
    );
}