import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  MenuDivider,
  useDisclosure,
  Center,
  Text,
  Spacer,
  VStack,
  Link as NormalLink,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import useAuth from "../Hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/logo.webp";
import { AdvancedImage } from "@cloudinary/react";
import CloudinaryImageTransformations from "./Cloudinary/CloudinaryImageTransformations";

const routing = (children) => {
  if (children === "About us") {
    return "about";
  } else if (children === "Contact us") {
    return "contact";
  } else if (children === "Sign In") {
    return "login";
  } else if (children === "Sign Up") {
    return "signup";
  } else if (children === "FAQ") {
    return "faq";
  }
};

export default function Navbar() {
  const Nav = ({ children }) => {
    if (location.pathname !== "/") {
      return (
        <Text
          px={2}
          rounded={"md"}
          py={1}
          fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
          cursor={"pointer"}
        >
          <NormalLink to={routing(children)} as={NavLink} variant={"navbar"}>
            {children}
          </NormalLink>
        </Text>
      );
    } else {
      return (
        <Text
          px={2}
          rounded={"md"}
          py={1}
          fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
          cursor={"pointer"}
        >
          <Link
            to={routing(children)}
            spy={true}
            smooth={true}
            offset={-30}
            duration={600}
          >
            {children}
          </Link>
        </Text>
      );
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const checkingForNullObjectForAuthObject = () => {
    //returns true when the auth is {} that is not logged in or else it returns false
    return Object.keys(auth).length === 0;
  };

  var Links = [];
  if (location.pathname === "/") {
    Links = ["About us", "FAQ", "Contact us"];
  } else if (checkingForNullObjectForAuthObject()) {
    Links = ["About us"];
  } else {
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const dealingWithLogout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (res.status === 200) {
      setAuth({});
      navigate("/");
    }
  };

  return (
    <>
      <Box
        px={4}
        position="sticky"
        top="0"
        zIndex={1000}
        css={{ backdropFilter: "blur(5px)" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Text
            fontSize={{ sm: "xl", md: "3xl", lg: "4xl", xl: "5xl" }}
            fontFamily={"Montserrat"}
            cursor={"pointer"}
          >
            {location.pathname === "/" ? (
              <Link to="hero" as={NavLink} offset={-64} smooth>
                <Image src={logo} height="4rem" margin="1rem 0" />
              </Link>
            ) : (
              <NormalLink to="/" as={NavLink} variant={"navbar"}>
                <Image src={logo} height="4rem" margin="1rem 0" />
              </NormalLink>
            )}
          </Text>
          <Spacer />

          <IconButton
            mr={{ sm: "1.3rem" }}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack
            alignItems={"center"}
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <Nav key={link}>{link}</Nav>
            ))}
            {checkingForNullObjectForAuthObject() && (
              <>
                <NormalLink
                  px={2}
                  as={NavLink}
                  rounded={"md"}
                  py={1}
                  _hover={{ textDecoration: "none" }}
                  fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
                  to="login"
                >
                  Sign In
                </NormalLink>
                <NormalLink
                  px={2}
                  as={NavLink}
                  rounded={"md"}
                  py={1}
                  _hover={{ textDecoration: "none" }}
                  fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
                  to="signup"
                >
                  Sign Up
                </NormalLink>
              </>
            )}
            <IconButton
              _hover={{
                backgroundColor: `${useColorModeValue(
                  "primary.light",
                  "primary.dark"
                )}`,
              }}
              icon={
                colorMode === "light" ? (
                  <MoonIcon
                    color={"#C0C0C0"}
                    filter={"drop-shadow(0px 11px 5px #C0C0C0)"}
                  />
                ) : (
                  <SunIcon
                    color={"#FFE57C"}
                    filter={"drop-shadow(0px 10px 7px #FFE87C)"}
                  />
                )
              }
              onClick={toggleColorMode}
              variant="ghost"
            />
          </HStack>
          {auth.username && (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  outlineColor="gray.700"
                  _dark={{ outlineColor: "gray.300" }}
                  marginLeft="40px"
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      auth.profilePicPublic_id
                        ? ""
                        : "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                    }
                  >
                    <AdvancedImage
                      cldImg={CloudinaryImageTransformations(
                        auth.profilePicPublic_id,
                        "profilePic",
                        80,
                        80
                      )}
                    />
                  </Avatar>
                </MenuButton>
                <MenuList
                  border={"none"}
                  alignItems={"center"}
                  outlineColor="gray.600"
                >
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        auth.profilePicPublic_id
                          ? ""
                          : "https://cdn-icons-png.flaticon.com/512/4908/4908415.png"
                      }
                    >
                      <AdvancedImage
                        cldImg={CloudinaryImageTransformations(
                          auth.profilePicPublic_id,
                          "profilePic",
                          130,
                          130
                        )}
                      />
                    </Avatar>
                  </Center>
                  <br />
                  <Center>
                    <p>{auth.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={dealingWithLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <VStack as={"nav"} spacing={4} textAlign={"center"}>
              {Links.map((link) => (
                <Nav key={link}>{link}</Nav>
              ))}
              <NormalLink
                to="login"
                px={2}
                rounded={"md"}
                as={NavLink}
                py={1}
                fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
                cursor={"pointer"}
                _hover={{ textDecoration: "none" }}
              >
                Sign In
              </NormalLink>
              <NormalLink
                px={2}
                rounded={"md"}
                py={1}
                as={NavLink}
                fontSize={{ md: "md", lg: "lg", xl: "2xl" }}
                cursor={"pointer"}
                _hover={{ textDecoration: "none" }}
                to="signup"
              >
                Sign Up
              </NormalLink>
            </VStack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
