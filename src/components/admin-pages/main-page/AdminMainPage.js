'use client'

import { useEffect } from 'react';
import './AdminMainPage.scss'
import useCookie from '@/lib/hooks/cookie.hook';

export default function AdminMainPage() {

    const {createCookie, getCookies} = useCookie();
    if(getCookies('role') != 'admin'){
        location.href = '/sign-in'
    }

    // useEffect(() => {

    //     if(getCookies('role') != 'admin'){
    //         location.href = '/sign-in'
    //     }
  
    // }, [])

    return (
        <main className='container'>
            <section className='admin-main-page section'>
                <h1 className='admin-main-page__title'>Admin Main Page</h1>
                <div className='admin-main-page__text'>
                    <p>Добро пожаловать !</p>
                </div>
            </section>
        </main>
    );
};
