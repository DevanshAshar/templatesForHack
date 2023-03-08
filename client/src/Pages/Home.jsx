import { useOutletContext } from 'react-router-dom';

export default function Home() {
  const [auth, setAuth] = useOutletContext()

  console.log(auth)

  return (
    <>
      HOME!!
    </>
  )
}
