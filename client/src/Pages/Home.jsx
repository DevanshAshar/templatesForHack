import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';


export default function Home() {
  const [auth, setAuth] = useState(null)
  const navigate = useNavigate();

  const getAuth = async () => {
    if (localStorage.getItem('executed') == 'false') {
      window.location.reload()
      localStorage.setItem('executed', true)
    }
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
    } else {
      console.log('asdasd')
      navigate('/login')
    }
  }

  useEffect(() => {
    getAuth()
  }, [])


  return (
    <>
      HOME!!
    </>
  )
}
