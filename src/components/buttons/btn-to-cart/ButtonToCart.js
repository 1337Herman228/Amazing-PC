import Link from 'next/link';
import './ButtonToCart.scss';
import { useState } from 'react';

const ButtonToCart = ({is_btn_pressed = false}) =>{

     const [isBtnPressed, setIsBtnPressed] = useState(is_btn_pressed);

     const onClickToCartButton = () => {
          setIsBtnPressed(true);
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