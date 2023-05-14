import {
  Container,
  Text,
  VStack,
  Box,
  Avatar,
  Icon,
  chakra,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { FaQuoteRight } from "react-icons/fa";
import NumbersAnimation from "../Components/NumbersAnimation";

const statData = [
  {
    id: 1,
    label: "Registered plus users",
    number: "1730",
    suffixForNumber: "",
    decimal: 0,
    increaseInNumber: "20.25",
  },
  {
    id: 2,
    label: "Prediction accuracy",
    number: "98.5",
    decimal: 2,
    suffixForNumber: "%",
    increaseInNumber: "10.25",
  },
  {
    id: 3,
    label: "Listings created",
    number: "11",
    decimal: 0,
    suffixForNumber: "",
    increaseInNumber: "40.35",
  },
];

const testimonials = [
  {
    username: "Ben Parker",
    position: "CEO",
    company: "Foodtesla",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80",
    content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
      rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
      risus at semper`,
  },
];

export default function AboutUs() {
  return (
    <>
      <VStack
        mt={"3.2rem"}
        mb={10}
        textAlign={"center"}
        lineHeight={"30px"}
        fontSize={"lg"}
      >
        <Text>
          This website was made by x engineering undergraduates with the vision
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A veniam
          beatae excepturi accusantium dicta fugiat! Ipsa, repellat numquam hic
          illum nulla qui. Numquam aliquam cumque iusto quos exercitationem
          maxime soluta laboriosam perspiciatis ut impedit ducimus hic, repellat
          labore blanditiis beatae itaque minus cum provident enim? Aut
          voluptate aperiam architecto praesentium. of
        </Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta quod
          corporis architecto molestiae dolorum sunt nihil error, facere
          assumenda voluptas consequatur modi. Quis aliquid eligendi ipsa modi
          quas iure, vero quisquam fugiat exercitationem ea tempora illum,
          cupiditate omnis magni recusandae. Optio itaque quas, vitae unde sit
          perspiciatis debitis maxime voluptas! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Odit, aliquid.
        </Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta quod
          corporis architecto molestiae dolorum sunt nihil error, facere
        </Text>
      </VStack>

      <VStack textAlign={"center"} mb={20}>
        <Text
          mt={"3.2rem"}
          lineHeight={"20px"}
          fontWeight={"bold"}
          textDecoration={`{useColorModeValue('#F0EB8D','#e5dc36')} wavy underline`}
          fontSize={"4xl"}
        >
          Trusted by the community
        </Text>
        <Text
          mb={10}
          paddingLeft={"20rem"}
          fontSize={"lg"}
          color={useColorModeValue("#666666", "#B2B2B2")}
        >
          and for the right reasons✨
        </Text>

        <Container maxW="5xl">
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={"7%"}
            mt={12}
            mb={4}
          >
            {statData.map((data) => (
              <Box
                key={data.id}
                boxShadow="#F0EB8D 0px 2px 8px 0px"
                _dark={{ boxShadow: "#e5dc36 0px 2px 8px 6px" }}
                py={5}
                rounded="md"
                borderWidth={2}
              >
                <Stat>
                  <StatLabel fontSize={"xl"}>{data.label}</StatLabel>
                  <NumbersAnimation
                    Component={StatNumber}
                    end={data.number}
                    suffix={data.suffixForNumber}
                    decimal={data.decimal}
                  >
                    {data.number}
                  </NumbersAnimation>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {data.increaseInNumber + "%"}
                  </StatHelpText>
                </Stat>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </VStack>

      <Flex justify="center" mt={9}>
        <chakra.h3 fontSize="5xl" fontWeight="bold" mb={2.8}>
          Testimonials
        </chakra.h3>
      </Flex>

      <SimpleGrid columns={2} minChildWidth="465px">
        {testimonials.map((testimonial, index) => {
          return (
            <Container maxW="5xl" p={{ base: 5, md: 10 }} key={index}>
              <VStack
                spacing={3}
                p={{ base: 4, sm: 8 }}
                bg="#8D858E"
                _dark={{ bg: "#625D63" }}
                borderTop="2px solid"
                _hover={{
                  boxShadow: ` #005900 0px 10px 20px,#005900 0px 6px 6px`,
                }}
                borderColor="#008000"
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
                maxW="25rem"
                color="black"
                margin="0 auto"
                boxShadow="lg"
                key={index}
              >
                <Icon as={FaQuoteRight} w={8} h={8} color="#008000" />
                <Text p={5}>{testimonial.content}</Text>
                <VStack alignItems="center">
                  <Avatar name="avatar" src={testimonial.image} size="lg" />
                  <Box textAlign="center">
                    <Text fontWeight="bold" fontSize="xl">
                      {testimonial.username}
                    </Text>
                    <Text fontSize="md">
                      {testimonial.position} at {testimonial.company}
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </Container>
          );
        })}
      </SimpleGrid>
    </>
  );
}
