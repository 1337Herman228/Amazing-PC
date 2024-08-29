'use client'

import "../../styles/style.scss";
import '../(pages)/layout.scss';
import AdminNavbar from "../../components/navbar/admin-navbar/AdminNavbar";
import StoreProvider from "../StoreProvider";
import useCookie from '@/lib/hooks/cookie.hook';
import { useEffect, useState } from "react";
import LoadingPage from '../../components/loading/LoadingPage'
import { ConfigProvider } from "antd";

export default function RootLayout({ children }) {

  const {getCookies} = useCookie();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(getCookies('role'));
  const [token, setToken] = useState(getCookies('token'));

  useEffect(() => {

    if(token){
      if(role !== 'admin'){
        location.href = '/sign-in'
      }
      else{
        setLoading(false)
      }
    }
    else{
       location.href = '/sign-in'
    }

  },[])

  return (
    <html lang="en">
      <head>
        <title>Admin</title>
      </head>
      <StoreProvider>
        <body>
        <ConfigProvider
            theme={{
                components: {
                Notification: {
                    colorBgElevated:'var(--tm-color-card-black)',
                    colorText: 'white',
                    colorTextHeading: 'white',
                    colorIcon: 'white',
                    colorIconHover: 'gray',
                },
                },
            }}
            >
          {loading ?
          <LoadingPage /> 
          :
          <>
            <AdminNavbar />
            <main className="main-body">
                {children}
            </main>
          </>
          }
        </ConfigProvider>
        </body>
      </StoreProvider>
    </html>
  );
}
