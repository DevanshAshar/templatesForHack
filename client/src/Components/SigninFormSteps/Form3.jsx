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
  useColorModeValue,
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
              rounded="md"
              bgColor={useColorModeValue("#625D63", "#2D252E")}
              color={useColorModeValue("white", "white")}
            >
              http://
            </InputLeftAddon>
            <Input
              rounded="md"
              value={props.data.socials}
              onChange={props.setFormData}
              id="socials"
            />
          </InputGroup>
        </FormControl>

        <Stack>
          <Text> Add profile picture</Text>
          <FilePondComponent
            profilePic={props.profilePic}
            deleteLogic={props.deleteLogic}
            acceptedFileType={["image/*"]}
            setLogic={props.setLogic}
            allowMultiple={false}
          />
        </Stack>
      </SimpleGrid>
    </>
  );
}
