'use client'

import Link from 'next/link'
import './CartWindow.scss'
import { memo, useCallback, useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'

const CartWindow = ({isCartWindowOpen, setIsCartWindowOpen}) => {

     const [cartItems, setCartItems] = useState([])

     const cart_items = useSelector(state => state.cart)

     useEffect(()=>{
          document.addEventListener('click', addClickOutOfWindowListener);
          return () => {
               document.removeEventListener('click', addClickOutOfWindowListener);
          };
     },[isCartWindowOpen])

     const addClickOutOfWindowListener = useCallback((event) => {
          if(isCartWindowOpen){
               const block = document.querySelector('._cart-window');
               if (!block?.contains(event.target)) {
                    setIsCartWindowOpen(false)
               }     
          }
     },[isCartWindowOpen])

     useEffect(() => {
          setCartItems(cart_items.items)
     }, [cart_items])

     console.log(cartItems)

     return(
          <div className={`_cart-window ${isCartWindowOpen ? 'open' : ''}`}>
               <div className='close-btn-container'>
                    <button className='close-btn' >
                         <img
                              className='close-btn--icon' 
                              src='/configurator-svg/close.svg'
                              alt='close'
                              width={20}
                              height={20}
                              onClick={() => setIsCartWindowOpen(false)}
                         />
                    </button>
               </div>
               <div className='_cart-window__inner'>
                    <ul className='cart-list'>
                         {cartItems.length > 0 ? cartItems.map((item,i) => (
                              <Link key={i} href={'#'} className='cart-list__item'>
                                   <img
                                        className='cart-list__item-img' 
                                        src={item.img}
                                        alt=''
                                        width={100}
                                        height={100}
                                   />
                                   <span className='cart-list__item-name'>
                                        {item.name}
                                   </span>
                              </Link>
                         ))
                         :<span className='cart-list__empty-text'>В корзине пока ничего нет...</span>
                         }
                    </ul>
                    <Link className='to-cart-link green-filled-link' href='/cart'>Перейти в корзину</Link>
                    <Link className='_cart-window__inner-link' href='#'>Мои конфигурации</Link>
                    <Link className='_cart-window__inner-link' href='#'>Мои заказы</Link>
                    <Link className='_cart-window__inner-link' href='#'>Войти</Link>
               </div>
               
          </div>
     )
}

export default CartWindow