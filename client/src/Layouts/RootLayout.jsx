import { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from "../Components/Navbar"

export default function RootLayout() {
    const [auth, setAuth] = useState(null)

    return (
        <main>
            <Navbar Auth={auth} setAuth={setAuth} />
            <Outlet context={[auth, setAuth]} />
            <Footer />
        </main>
    )
}
