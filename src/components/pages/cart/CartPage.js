'use client'

import { useSelector } from 'react-redux'
import './CartPage.scss'
import { useEffect, useState } from 'react'
import CartTableItem from './CartTableItem'


const CartPage = () => {

     const [cartProducts, setCartProducts] = useState([])

     const cartItems = useSelector(state => state.cart)
     useEffect(()=>{
          setCartProducts(cartItems.items)
     },[cartItems])

     useEffect(() => {
          changeBodyColor()
          return () => removeBodyColor()
     }, []);
     const changeBodyColor = () => {
          document.querySelector('body').style.backgroundColor = "#111111"
     }
     const removeBodyColor = () => {
          document.querySelector('body').style.backgroundColor = "#191a1b"
     }

     // console.log(cartProducts)
     // console.log('Рендер CartPage')

     return (
          <section className='cart container section'>
               <h1 className='cart__main-title'>Корзина</h1>
               {cartProducts.length === 0 ? <div className='cart-is-empty'>Ваша корзина пуста</div> 
               : 
               <table className='cart__products-table'>
                    <thead className='cart__products-table-header hidden-tablet'>
                         <tr className='table-row-header'>
                              <th className='table-row-header__cell text-align-left' colSpan='2' >Товар</th>
                              <th className='table-row-header__cell text-align-center'>Наличие</th>
                              <th className='table-row-header__cell text-align-center'>Количество</th>
                              <th className='table-row-header__cell text-align-center'>Цена</th>
                              <th className='table-row-header__cell'></th>
                         </tr>
                    </thead>
                    <tbody>
                         {cartProducts.map((item, i) => 
                              <CartTableItem key={i} item={item} />
                         )}
                    </tbody>
               </table>
               }
          </section>
     )
}

export default CartPage