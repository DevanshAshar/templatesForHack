import {
  Container,
  Text,
  VStack,
  Box,
  Avatar,
  Icon,
  chakra,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { FaQuoteRight } from "react-icons/fa";

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
        justify="center"
        mt={10}
        mb={10}
        textAlign={"center"}
        lineHeight={"lg"}
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

      <Flex justify="center" mt={7}>
        <chakra.h3 fontSize="5xl" fontWeight="bold" mb={3}>
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
                bg="white"
                _dark={{ bg: "blackAlpha.600" }}
                borderTop="2px solid"
                borderColor="green.400"
                borderBottomLeftRadius="lg"
                borderBottomRightRadius="lg"
                maxW="25rem"
                margin="0 auto"
                boxShadow="lg"
                key={index}
              >
                <Icon as={FaQuoteRight} w={8} h={8} color="green.400" />
                <Text p={5} color="gray.500">
                  {testimonial.content}
                </Text>
                <VStack alignItems="center">
                  <Avatar name="avatar" src={testimonial.image} size="lg" />
                  <Box textAlign="center">
                    <Text fontWeight="bold" fontSize="lg">
                      {testimonial.username}
                    </Text>
                    <Text fontSize="md" color="gray.500">
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
