
import Header from "./common/Header.jsx";
import Footer from "./common/Footer.jsx";

import { Outlet } from "react-router-dom";

import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const RootLayout = () => {
  
  return (
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <div>
        <Header/>
        <div style={{minHeight:"90vh"}}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
    </ClerkProvider>
  )
}

export default RootLayout