import React from 'react'
import Navbar from '../Navs/Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout