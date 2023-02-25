import {
    Heading,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    FormHelperText,
    HStack,
    Select,
    InputLeftAddon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';


export default function Form1(props) {

    const countries = props.countries
    
    useEffect(() => {
        console.log('tp');
        setPhoneNumberPrefix(countries.find((country) => country.name == props.data.country).phonecode.charAt(0) == '+' ? countries.find((country) => country.name == props.data.country).phonecode : '+' + countries.find((country) => country.name == props.data.country).phonecode)
    }, [props.data.country])

    const [phoneNumberPrefix, setPhoneNumberPrefix] = useState(props.data.phoneNumber.split(" ")[0])

    const dealingWithPhoneNumberPrefix = (e) => {
        props.setFormData(e)
        props.data.phoneNumber = phoneNumberPrefix + " " + props.data.phoneNumber.split(" ")[1]
    }

    return (
        <>
            <Heading textAlign={'center'} fontSize={{ sm: '2xl', md: '4xl', lg: '5xl', xl: '5xl' }} mb="5%">
                User Details
            </Heading>

            <HStack spacing={8}>
                <div className="parent">
                    <FormControl>
                        <FormLabel htmlFor="firstName" >
                            First name
                        </FormLabel>
                        <Input id="firstName" value={props.data.firstName} onChange={props.setFormData} />
                    </FormControl>
                </div>

                <div className="parent">
                    <FormControl>
                        <FormLabel htmlFor="lastName" >
                            Last name
                        </FormLabel>
                        <Input id="lastName" value={props.data.lastName} onChange={props.setFormData} />
                    </FormControl>
                </div>
            </HStack>


            <div className="parent">
                <FormControl mt="3%" isRequired>
                    <FormLabel htmlFor="email" >
                        Email address
                    </FormLabel>
                    <Input id="email" type="email" value={props.data.email} onChange={props.setFormData} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="3%" isRequired>
                    <FormLabel
                        htmlFor="country"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Country
                    </FormLabel>

                    <Select
                        id="country"
                        variant={'filled'}
                        name="country"
                        autoComplete="country"
                        shadow="sm"
                        size="md"
                        w="full"
                        onChange={dealingWithPhoneNumberPrefix}
                        value={props.data.country}
                        rounded="md">
                        <option key={-1} value="" disabled style={{ fontWeight: "bold.600" }}>Select your option</option>
                        {countries.map((country, index) => {
                            return (
                                <option value={country.name} key={index}>
                                    {country.name}
                                </option>)
                        })}
                    </Select>
                </FormControl>
            </div>

            <div className="parent">
                <FormControl mt="5%" isRequired>
                    <FormLabel
                        htmlFor="country"
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                        value={phoneNumberPrefix + " " + props.data.phoneNumber}
                        onChange={props.setFormData}
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Phone Number
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={phoneNumberPrefix} />
                        <Input type='number' value={props.data.phoneNumber} onChange={props.setFormData} />
                    </InputGroup>
                </FormControl>
            </div>

        </>
    )
}
