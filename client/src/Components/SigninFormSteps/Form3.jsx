import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    Container,
    Text,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';


export default function Form3(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            <Heading textAlign={'center'} fontSize={{ sm: '2xl', md: '4xl', lg: '5xl', xl: '5xl' }} mb="5%">
                Social Handles
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl >
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Website
                    </FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon
                            bg="gray.50"
                            _dark={{
                                bg: 'gray.800',
                            }}
                            color="gray.500"
                            rounded="md">
                            http://
                        </InputLeftAddon>
                        <Input
                            type="tel"
                            placeholder="www.example.com"
                            focusBorderColor="brand.400"
                            rounded="md"
                        />
                    </InputGroup>
                </FormControl>

                <Container className='container' w={'100'} textAlign='center' border={'dashed 2px'}>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Text>Drag 'n' drop image</Text>
                    </div>
                    <Text>Images selected: {files}</Text>

                </Container>

                <FormControl id="email" mt={1}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        About
                    </FormLabel>
                    <Textarea
                        placeholder="you@example.com"
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                    <FormHelperText>
                        Brief description for your profile. URLs are hyperlinked.
                    </FormHelperText>
                </FormControl>
            </SimpleGrid>
        </>
    );
};
