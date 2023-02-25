import { useColorMode } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react"

export default function Toast() {
    const toast = useToast();

    const optionsForToast = {
        position: "bottom-right",
        autoClose: 300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    }
    console.log(optionsForToast)

    return (
        toast({
            title:"hii"
        })
    )
}
