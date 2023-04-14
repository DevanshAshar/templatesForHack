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
import HeroAbout from "./HomeSections/HeroAbout"
import HomeAbout from "./HomeSections/HomeAbout";
import HomeFAQ1 from "./HomeSections/HomeFAQ1";
import HomeFAQ2 from "./HomeSections/HomeFAQ2";
import HomeContact from "./HomeSections/HomeContact";

export default function Home() {
  return (
    <>
      <Box as="section" height={"500px"} id="hero">
        <HeroAbout />
      </Box>

      <Box
        as="section"
        id="about"
        height={"600px"}
        bg={useColorModeValue("#a0a0a0", "#241f1f")}
      >
        <HomeAbout />
      </Box>

      <Box
        as="section"
        id="faq"
        height={"1000px"}
        bg={useColorModeValue("#6c873c", "#1d2410")}
      >
        <Box height={"500px"}>
          <HomeFAQ1 />
          </Box>
        <Box
          as="section"
          height={"500px"}
          bg={useColorModeValue("#a0a0a0", "#241f1f")}
        >
          <HomeFAQ2 />
        </Box>
      </Box>

      <Box
        as="section"
        id="contact"
        height={"500px"}
        bg={useColorModeValue("#6c873c", "#1d2410")}
      >
        <HomeContact />
      </Box>

      <Grid
        bg={useColorModeValue("#dbe0e0", "#000000")}
        padding="2rem"
        templateColumns="repeat(3,1fr)"
        placeItems="center"
      >
        <Box>
          <Text fontWeight="bold">Made by,</Text>
          <Grid>
            <Text>Aman Nambisan</Text>
            <Text>Devansh Ashar</Text>
            <Text>Hemant Singh</Text>
            <Text>Varun Vishwanath</Text>
          </Grid>
        </Box>

        <Box>
          <Text fontWeight="bold">Links</Text>
          <Grid color="#af99ff">
            <Text cursor={"pointer"}>
              <Link
                to="hero"
                spy={true}
                smooth={true}
                offset={-100}
                duration={300}
              >
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
          </Grid>
        </Box>

        <Box>
          <Text cursor={"pointer"}>
            <Link to="hero">
              <Image src="/logo.png" height="8rem" />
            </Link>
          </Text>
          <Text as="h3" fontWeight="bold">
            JobSeeker &copy; {new Date().getFullYear()}
          </Text>
        </Box>
      </Grid>
    </>
  );
}
