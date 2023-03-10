import {
    FormLabel,
    FormControl,
    Button,
    VStack,
    Flex,
    HStack,
    PinInput,
    PinInputField,
    Spacer,
} from '@chakra-ui/react';

export default function Form2(props) {

    const setPin = (e) => {
        props.setData({ ...props.data, otp: e })
    }

    const dealingWithOTPFormSubmission = async () => {
        var { otp, email } = props.data
        console.log(otp)
        const resp = await fetch("http://localhost:5000/user/verifyOtp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ otp, email })
        })
        if (resp.status == 200) {
            props.setStep(3)
        } else {
        }
    }


    const sendOTP = async () => {
        var email = props.data.email
        const resp = await fetch("http://localhost:5000/user/forgotPass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        if (resp.status == 200) {
            props.setStep(2)
        } else {

        }
    }

    return (
        <VStack w={'100%'} spacing={7} >
            <div className='parent'>
                <FormControl id="otp" isRequired>
                    <FormLabel ml={'36px'}>Enter 4 digit OTP</FormLabel>
                    <HStack>
                        <PinInput variant={'filled'} size={{ sm: 'md', lg: 'lg' }} type='number' onChange={setPin} >
                            <PinInputField id="otp"/>
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
                    w={"40%"}
                    onClick={sendOTP}
                >
                    Resend OTP
                </Button>
                <Spacer />
                <Button
                    colorScheme="teal"
                    variant="outline"
                    rounded="md"
                    w={"40%"}
                    onClick={dealingWithOTPFormSubmission}
                >
                    Submit OTP
                </Button>
            </Flex>
        </VStack>


    )
}
