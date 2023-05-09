import {
    Container,
    FormLabel,
    FormControl,
    Input,
    Button,
    VStack,
} from '@chakra-ui/react';

export default function Form1(props) {


    const sendOTP = async () => {
        var email = props.data.email
        const resp = await fetch("http://localhost:5000/user/forgotPass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        if (resp.status === 200) {
            props.setStep(2)
        } else {

        }
    }

    return (
        <VStack w={'100%'} spacing={6}>

            <Container w={'100%'}>
                <div className='parent'>
                    <FormControl id="email" isRequired noValidate>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" value={props.data.email} onChange={props.setFormData} placeholder="Your email" rounded="md" />
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

