import { useState } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Flex,
  Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" })
  const navigate = useNavigate();

  const setFormData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value })
  }

  const dealingWithLoginSubmit = (e) => {
    e.preventDefault()


  }

  return (
    <Flex
      minH={'92vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Center>

        <Stack spacing={4}>

          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link href='about' color={'blue.400'}>features</Link> 😎
            </Text>
          </Stack>

          <VStack
            as="form"
            noValidate
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            onSubmit={dealingWithLoginSubmit}
            boxShadow="2xl"
            p={{ base: 5, sm: 10 }}
            spacing={8}
          >
            <VStack spacing={4} w="113%">

              <Container w={'100%'}>
                <div className="parent">
                  <FormControl id="email" isRequired>
                    <FormLabel>Email / Username</FormLabel>
                    <Input rounded="md" type="email" value={data.username} onChange={setFormData} />
                  </FormControl>
                </div>
              </Container>

              <Container w={'100%'}>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} onChange={setFormData} value={data.password} />
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

            <VStack w="100%">

              <Stack direction="row" justify="space-between" w="100%" mb={'10px'}>
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }} as={NavLink} to='/forgotpassword' state={{ email: data.email,from:1 }}>Forgot password?</Link>
              </Stack>

              <Button
                bg="green.300"
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
      </Center>
    </Flex>
  );
};

