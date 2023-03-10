import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Center,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';



const Nav = ({ children }) => (
  <Link
    px={2}
    py={1}
    fontSize={{ md: 'md', lg: "lg", xl: '2xl' }}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      fontWeight: 'bold',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    as={NavLink}
    _activeLink={{

      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={children == "About us" ? "about" :
      children == "Contact us" ?
        "contact" :
        "signup"}
  >
    {children}
  </Link>
);



export default function Navbar(props) {
  var Links=[]
  if (!props.Auth) {
    Links.push("About us")
    Links.push("Contact us")
    Links.push("Sign Up")
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const dealingWithLogout = async() => {
    const res = await fetch("http://localhost:5000/user/logout",{
      method:"GET",
      credentials:"include"
    })
    window.location.reload(true)
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

          <Box mr="30px" fontSize={{ sm: 'xl', md: '3xl', lg: "4xl", xl: '5xl' }}
            as={NavLink} _hover={{ textDecoration: "none" }} to="/" fontFamily={'Montserrat'}
          >Logo</Box>
          <Spacer></Spacer>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Nav key={link}>{link}</Nav>
              ))}
            </HStack>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </HStack>

          {props?.Auth && <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                outlineColor="gray.700"
                _dark={{ outlineColor: "gray.300" }}
                marginLeft="40px"
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={props.Auth.profilePic || 'https://cdn-icons-png.flaticon.com/512/4908/4908415.png'}
                />
              </MenuButton>
              <MenuList
                border={'none'}
                alignItems={'center'}
                outlineColor="gray.600"
              >
                <br />
                <Center >
                  <Avatar
                    size={'2xl'}
                    src={props.Auth.profilePic || 'https://cdn-icons-png.flaticon.com/512/4908/4908415.png'}
                  />
                </Center>
                <br />
                <Center>
                  <p>{props?.Auth?.username}</p>
                </Center>
                <br />
                <MenuDivider />

                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={dealingWithLogout}>Logout</MenuItem>

              </MenuList>
            </Menu>
          </Flex>
          }

        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Nav key={link}>{link}</Nav>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}