import { Spinner } from '@chakra-ui/react'
import {useColorModeValue} from "@chakra-ui/react"

export default function CustomSpinner() {
  return (
    <Spinner 
    size='xl'
    thickness='4px'
    speed='0.75'
    color={useColorModeValue('#dbe0e0','#000000')}
    />
)
}
