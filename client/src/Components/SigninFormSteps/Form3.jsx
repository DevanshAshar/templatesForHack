import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Text,
  Stack,
} from "@chakra-ui/react";
import { FilePondComponent } from "../FilePondComponent";

export default function Form3(props) {
  return (
    <>
      <Heading
        textAlign={"center"}
        fontSize={{ sm: "2xl", md: "4xl", lg: "5xl", xl: "5xl" }}
        mb="5%"
      >
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Social media
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              value={props.data.socials}
              onChange={props.setFormData}
              id="socials"
              placeholder="www.linkedin.com"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

                <Stack>
                    <Text> Add profile picture</Text>
                    <FilePondComponent profilePic={props.profilePic} deleteLogic={props.deleteLogic} acceptedFileType={["image/*"]} setLogic={props.setLogic} allowMultiple={false} />
                </Stack>

            </SimpleGrid>
        </>
    );
};
