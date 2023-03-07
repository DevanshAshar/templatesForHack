import { useColorMode } from "@chakra-ui/react";
import { useToast, Button } from "@chakra-ui/react";

export default function Toast({ title, status }) {
  const toast = useToast();
  toast({
    title,
    status,
    position: "bottom-right",
    isClosable: true,
    autoClose: 300,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return null;
}
