import { Button, useToast } from "@chakra-ui/react"
import Toast from "../Components/Toast"

export default function Abc() {
  const toast = useToast()

  const ToastDisplay = () =>{
    return (
      <Toast></Toast>
    )
  }

  return (
    <>
    <Button onClick={()=>{ToastDisplay()}}>
      show toast
    </Button>
    </>
  )
}
