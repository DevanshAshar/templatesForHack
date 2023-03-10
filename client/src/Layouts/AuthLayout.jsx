import { useEffect } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';

export default function AuthLayout() {

  const [auth, setAuth] = useOutletContext()
  const navigate = useNavigate();

  const getAuth = async () => {
    const resp = await fetch("http://localhost:5000/user/getAuth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })

    const respInJSON = await resp.json()
    if (resp.status == 200) {
      setAuth(respInJSON)
      console.log(respInJSON.role)
      if (respInJSON.role == "Employee") {
        navigate("employee")
      } else if (respInJSON.role == "Recruiter") {
        navigate("recruiter")
      } else {
        navigate("admin")
      }
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    getAuth()
  }, [])

  return (
    <Outlet context={[auth, setAuth]} />
  )
}
