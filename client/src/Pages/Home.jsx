import {
  Box,
  Grid,
  Image,
  Text,
  Link as NormalLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import HeroAbout from "./HomeSections/HeroAbout";
import HomeAbout from "./HomeSections/HomeAbout";
import HomeFAQ1 from "./HomeSections/HomeFAQ1";
import HomeFAQ2 from "./HomeSections/HomeFAQ2";
import HomeContact from "./HomeSections/HomeContact";
import { Link as ChakraLink } from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

export default function Home() {
  const contributers = [
    {
      name: "Aman Nambisan",
      linkedInLink: "https://www.linkedin.com/in/amannambisan/",
    },
    {
      name: "Aman Nambisan",
      linkedInLink: "https://www.linkedin.com/in/amannambisan/",
    },
    {
      name: "Aman Nambisan",
      linkedInLink: "https://www.linkedin.com/in/amannambisan/",
    },
    {
      name: "Aman Nambisan",
      linkedInLink: "https://www.linkedin.com/in/amannambisan/",
    },
  ];

  return (
    <>
      <Box
        as="section"
        height={"500px"}
        id="hero"
        bgGradient={`linear(${useColorModeValue(
          "bg.light",
          "bg.dark"
        )} 0%, ${useColorModeValue("primary.light", "primary.dark")} 100%)`}
      >
        <HeroAbout />
      </Box>

      <Box
        as="section"
        id="about"
        height={"500px"}
        bg={useColorModeValue("primary.light", "primary.dark")}
      >
        <HomeAbout />
      </Box>

      <Box
        as="section"
        id="faq"
        height={"1000px"}
        bg={useColorModeValue("secondary.light", "secondary.dark")}
      >
        <Box height={"500px"}>
          <HomeFAQ1 />
        </Box>
        <Box
          as="section"
          height={"500px"}
          bg={useColorModeValue("primary.light", "primary.dark")}
        >
          <HomeFAQ2 />
        </Box>
      </Box>

      <Box
        as="section"
        id="contact"
        height={"500px"}
        bg={useColorModeValue("secondary.light", "secondary.dark")}
      >
        <HomeContact />
      </Box>

      <Grid padding="2rem" templateColumns="repeat(3,1fr)" placeItems="center">
        <Grid>
          <Text fontWeight="bold" fontSize={"lg"}>
            Made by{" "}
            <SocialIcon
              network="linkedin"
              style={{ height: "23px", width: "23px" }}
            />
          </Text>
          {contributers.map((contributer) => (
            <ChakraLink
              variant={"normalLinkWithUnderline"}
              href="https://www.linkedin.com/in/amannambisan/"
              target="_blank"
            >
              {contributer.name}
            </ChakraLink>
          ))}
        </Grid>

        <Grid>
          <Text fontWeight="bold" fontSize={"lg"}>
            Links
          </Text>
          <Box color={useColorModeValue("#413543", "#8D858E")}>
            <Text cursor={"pointer"}>
              <Link to="hero" spy={true} smooth={true} duration={200}>
                Scroll to the top
              </Link>
            </Text>
            <Text>
              <NormalLink
                as={NavLink}
                _hover={{ textDecoration: "none" }}
                to="signup"
              >
                Sign Up
              </NormalLink>
            </Text>
            <Text cursor={"pointer"}>
              <NormalLink
                as={NavLink}
                _hover={{ textDecoration: "none" }}
                to="login"
              >
                Login
              </NormalLink>
            </Text>
          </Box>
        </Grid>

        <Grid>
          <Text cursor={"pointer"}>
            <Link to="hero" spy={true} smooth={true} duration={200}>
              <Image src="/logo.png" height="8rem" />
            </Link>
          </Text>
          <Text fontSize={"lg"} fontWeight="bold">
            JobSeeker &copy; {new Date().getFullYear()}
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
