'use client';

import Link from "next/link";
import './Navbar.scss'

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from "react";

export default function Users() {

    const openModal = () => {
        const dialog = document.getElementById('mobileOverlay');
        dialog.showModal();
    }

    const pathname = usePathname()
    useEffect(() => {
        markCurrentLink(pathname);
    }, [pathname])
    
    const markCurrentLink = (currentUrl) => {
        
        const links = document.querySelectorAll('.link-to-check');

        for(var i=0;i<links.length;i++) {
            links[i].classList.remove('current-link');
            const url = 'http://localhost:3000' + currentUrl
            
            if(url.includes(links[i].href)){
                links[i].classList.add('current-link');
            }
        }
    }

    return (
        <>
        <header className="header">
            <div className="header__inner container">

                <Link className="header__logo logo link-to-check" href="/">
                {/* <img 
                    className="logo__img" 
                    src="/logo.svg"
                    alt="Amazing PC" 
                    width={60} 
                    height={60} 
                    loading="lazy"
                /> */}
                <span className="logo__text uppercase-text">Amazing PC</span>
                </Link>

                <nav className="header__menu hidden-mobile">
                    <ul className="header__menu-list">
                        <li className="header__menu-item">
                            <Link className="header__menu-link link-to-check uppercase-text" href="/gaming-pc">Игровые ПК</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link className="header__menu-link link-to-check uppercase-text" href="/notebook">Ноутбуки</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link className="header__menu-link link-to-check uppercase-text" href="/workstation">Рабочие станции</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link className="header__menu-link link-to-check uppercase-text" href="/configurator">Конфигуратор</Link>
                        </li>
                        <li className="header__menu-item">
                            <Link className="header__menu-link link-to-check uppercase-text" href="/assistance">Услуги</Link>
                        </li>
                    </ul>
                </nav>

                <nav className="header__side-button-menu">
                    <ul className="header__side-button-menu-list">
                        <li className="header__side-button-menu-item">
                            <button className="header__side-button-menu-btn">
                                <img 
                                    className="search__icon-img" 
                                    src="/search-icon.svg"
                                    alt="Search" 
                                    width={16} 
                                    height={16} 
                                    loading="lazy"
                                />
                            </button>
                        </li>
                        <li className="header__side-button-menu-item">
                            <button className="header__side-button-menu-btn">
                                <img 
                                    className="compare__icon-img" 
                                    src="/compare-icon.svg"
                                    alt="Compare" 
                                    width={16} 
                                    height={16} 
                                    loading="lazy"
                                />
                            </button>
                        </li>
                        <li className="header__side-button-menu-item">
                            <button className="header__side-button-menu-btn">
                                <img 
                                    className="cart__icon-img" 
                                    src="/cart-icon.svg"
                                    alt="Cart" 
                                    width={16} 
                                    height={16} 
                                    loading="lazy"
                                />
                            </button>
                        </li>
                        <li className="header__side-button-menu-item">

                        <button
                            onClick={openModal}
                            className="button__burger-menu burger-button visible-mobile">
                                <span className="visually-hidden">
                                    Open navigation menu
                                </span>
                        </button>
                        </li>
                    </ul>
                  
                </nav>
            </div>
    </header>

    <dialog className="mobile-overlay visible-mobile" id="mobileOverlay">
        <form className="mobile-overlay__close-button-wrapper" method="dialog">
            <button type="submit" className="mobile-overlay__close-button cross-button">
                <span className="visually-hidden">Close navigation menu</span>
            </button>
        </form>
        <div className="mobile-overlay__body">
            <ul className="mobile-overlay__list">
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/gaming-pc">Игровые ПК</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/notebook">Ноутбуки</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/workstation">Рабочие станции</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/configurator">Конфигуратор</Link>
                </li>
                <li className="mobile-overlay__item">
                    <Link className="mobile-overlay__link uppercase-text" href="/assistance">Услуги</Link>
                </li>
            </ul>
        </div>
    </dialog>
    </>
    );
}