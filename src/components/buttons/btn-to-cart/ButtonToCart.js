import Link from 'next/link';
import './ButtonToCart.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItem } from '@/lib/redux/slices/cartSlice';

const ButtonToCart = ({is_btn_pressed = false, product}) =>{

     const [isBtnPressed, setIsBtnPressed] = useState(is_btn_pressed);

     const dispatch = useDispatch()

     const handleAddToCart = () => {
          dispatch(addCartItem(product))
     }

     const onClickToCartButton = () => {
          setIsBtnPressed(true);
          !isBtnPressed ? handleAddToCart() : null
     }

     return(
          <>
          {isBtnPressed ? 
          <Link href={'/cart'}>
               <button onClick={onClickToCartButton} className={`configuration-card__buy-button checkout-button`}>
                    Оформить
               </button>
          </Link>
          :
          <button onClick={onClickToCartButton} className='configuration-card__buy-button buy-button'>
               В корзину
          </button>
          }
          </>
          
     )
}

export default ButtonToCart