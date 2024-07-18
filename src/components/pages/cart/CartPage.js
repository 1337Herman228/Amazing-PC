'use client'

import { useSelector } from 'react-redux'
import './CartPage.scss'
import { useEffect, useState } from 'react'

const CartPage = () => {

     const [cartProducts, setCartProducts] = useState([])

     const cartItems = useSelector(state => state.cart)
     useEffect(()=>{
          setCartProducts(cartItems.items)
     },[cartItems])

     console.log(cartProducts)
     console.log('Рендер CartPage')

     return (
          <>
          <section className='cart container section'>
               <h1 className='cart__main-title'>Корзина</h1>
               <table className='cart__products-table'>
                    <thead className='cart__products-table-header'>
                         <tr className='table-row-header'>
                              <th className='table-row-header__cell text-align-left' colSpan='2' >Товар</th>
                              <th className='table-row-header__cell text-align-left'>Наличие</th>
                              <th className='table-row-header__cell text-align-left'>Количество</th>
                              <th className='table-row-header__cell text-align-left'>Цена</th>
                              <th className='table-row-header__cell'></th>
                         </tr>
                    </thead>
                    <tbody>
                         {cartProducts.map((item, i) => 
                         <tr key={i} className='product-item-row'>
                              <td className='product-item-row__cell'>
                                   <img
                                        src={item.img}
                                        alt=''
                                        width={200}
                                        height={200}
                                   />
                              </td>
                              <td className='product-item-row__cell'>
                                   <h2>Компьютер</h2>
                                   <span>{item.name}</span>
                                   <div>
                                        <button>Спецификация</button>
                                        <button>Изменить</button>
                                   </div>
                              </td>
                              <td className='product-item-row__cell'>
                                   <span>В наличии</span>
                              </td>
                              <td className='product-item-row__cell'>
                                   <button>-</button>
                                   <input type='number' />
                                   <button>+</button>
                              </td>
                              <td className='product-item-row__cell'>
                                   <span>5000 BYN</span>
                              </td>
                              <td className='product-item-row__cell'>
                                   <button>
                                        <img
                                             src='/garbage-backet.svg'
                                             alt=''
                                             width={20}
                                             height={20}
                                        />
                                   </button>
                              </td>
                         </tr>
                         )}
                    </tbody>
               </table>
          </section>
          </>
     )
}

export default CartPage