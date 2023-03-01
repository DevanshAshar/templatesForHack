import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from "../Components/Navbar"

export default function RootLayout() {
    const [auth, setAuth] = useState(null)

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
        } else {
            setAuth(null)
        }
    }

    useLayoutEffect(() => {
        console.log(`repaint`);
        getAuth()
    }, [])


    return (
        <main>
            <Navbar Auth={auth} />
            <Outlet Auth={auth} />
            <Footer />
        </main>
    )
}
