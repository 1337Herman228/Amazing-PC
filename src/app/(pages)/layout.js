'use client'

import "../../styles/style.scss";
import './layout.scss';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import StoreProvider from "../StoreProvider";
import useCookie from '@/lib/hooks/cookie.hook';
import { useEffect, useState } from "react";
import LoadingPage from "@/components/loading/LoadingPage";

export default function RootLayout({ children }) {

  const {getCookies} = useCookie();

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getCookies('token'));

  useEffect(() => {

    if(token){
      setLoading(false)
    }
    else{
      location.href = '/sign-in'
    }

  },[])

  return (
    <html lang="en">
       <head>
        <title>Amazing PC</title>
      </head>
      <StoreProvider>
        <body>
        {loading ?
          <LoadingPage /> 
          :
          <>
            <Navbar />
            <main className="main-body">
                {children}
            </main>
            <Footer/>
          </>
          }
        </body>
      </StoreProvider>
    </html>
  );
}
