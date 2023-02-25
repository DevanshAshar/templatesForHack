import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    VStack,
    Text,
    Container,
    InputGroup,
    InputRightElement,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function SplitLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const setFormData = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
        console.log(data);
    }

    return (
        <Stack minH="92vh" direction={{ base: 'column', md: 'row' }} paddingBottom="20px"
        >

            <Flex flex={2} >
                <Image alt="Cover image" objectFit="cover" src="https://bit.ly/2k1H1t6" />
            </Flex>

            <Flex p={8} flex={1} align="center" justify="center">

                <Stack spacing={4}>
                    <Stack align="center">
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link href='about' color={'blue.400'}>features</Link> 😎
                        </Text>
                    </Stack>

                    <VStack
                        as="form"
                        spacing={8}
                        noValidate
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        h="max-content !important"
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded="lg"
                        boxShadow="2xl"
                        p={{ base: 5, sm: 10 }}
                    >
                        <VStack spacing={4} w="113%">

                            <Container w={'100%'}>
                                <div className="parent">
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email / Username</FormLabel>
                                        <Input rounded="md" onChange={setFormData} type="email" value={data.username} />
                                    </FormControl>
                                </div>
                            </Container>

                            <Container w={'100%'}>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input onChange={setFormData} type={showPassword ? 'text' : 'password'} value={data.password} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Container>

                        </VStack>
                        <VStack w="100%" >
                            <Stack direction="row" justify="space-between" w="100%" mb={'10px'}>
                                <Checkbox colorScheme="green" size="md">
                                    Remember me
                                </Checkbox>
                                <Link as={NavLink} to='/forgotpassword' state={{ email: data.email,from:1 }} fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg="green.400"
                                color="white"
                                _hover={{
                                    bg: 'green.600'
                                }}
                                rounded="md"
                                w="100%"
                            >
                                Sign in
                            </Button>
                        </VStack>
                    </VStack>
                </Stack>
            </Flex>
        </Stack>

    );
}