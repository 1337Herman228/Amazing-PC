import {  useEffect, useState } from 'react'
// import './CartPage.scss'
import {changeItemQuantity, deleteCartItem} from '../../../lib/redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { ConfigProvider, Modal } from 'antd';

const bg_color = '#111'
const modalStyles = {
     mask: {
          backdropFilter: 'blur(4px)',
     },
     content: {
          color: 'white',
          backgroundColor: bg_color,
          borderRadius: '5px',
     },
};

const PcInfo = ({name, isConfiguration, id}) => (
     <td className='product-item-row__cell'>
          <div className='pc-info'>
               <div className='title-div'>
                    <span className='title-div--pc-name'>{name}</span>
                    {isConfiguration && <span className='title-div--pc-id'>{id}</span>}
               </div>
               
               <div>
                    <button>Спецификация</button>
                    <button>Изменить</button>
               </div>
          </div>
     </td>
)

const OtherInfo = ({type, name}) =>(
     <td className='product-item-row__cell --info'>
          <div className='title-div'>
               <span className='title-div--product-type'>{type}</span>
               <span className='title-div--product-name'>{name}</span>
          </div>
     </td>
)

const CartTableItem = ({item}) => {

     // console.log(item)

     const [quantity, setQuantity] = useState(item?.quantity || 1)
     const [open, setOpen] = useState(false);

     const dispatch = useDispatch()

     useEffect(()=>{
          dispatch(changeItemQuantity({id:item.id, quantity}))
     },[quantity])

     const onChangeQuantity = (e) =>{
          if (+e.target.value <= 0) setQuantity(1)
          else if(+e.target.value >= 100) setQuantity(99)
          else setQuantity(+e.target.value)
     }

     const showModal = () => {
          setOpen(true);
     };
     const handleOk = () => {
          onDeleteCartItem()
          setOpen(false);
     };
     const handleCancel = () => {
          setOpen(false);
     };

     const onDeleteCartItem = () => {
          dispatch(deleteCartItem(item.id))
     }

     return(
          <tr className='product-item-row'>
               <td className='product-item-row__cell'>
                    <img
                         className='product-item-row__main-image'
                         src={item.img}
                         alt=''
                         width={320}
                         height={220}
                    />
               </td>
               {item.isPc===true ? <PcInfo name={item.name} isConfiguration={item?.isConfiguration} id={item.id}/> : <OtherInfo type={item.title} name={item.name}/>}
               <td className='product-item-row__cell available'>
                    <span className='available__text'>В наличии</span>
               </td>
               <td className='product-item-row__cell --quantity'>
                    <div className='quantity'>
                         <button onClick={quantity === 1 ? null : () => setQuantity(quantity - 1)} className={`quantity__btn-change-count ${quantity === 1 ? 'disabled' : ''}`}>
                              <svg width="16" height="16" viewBox="0 0 20 20"><rect width="18" height="1" x="1" y="9"></rect></svg>
                         </button>
                         <input 
                              onChange={(e)=> onChangeQuantity(e)} 
                              className='quantity__input'
                              value={quantity} 
                              min={1} 
                              max={99} 
                              type='number'
                              name={item.name + ' quantity'}
                         />
                         <button onClick={quantity === 99 ? null :() => setQuantity(quantity + 1)} className={`quantity__btn-change-count ${quantity === 99 ? 'disabled' : ''}`}>
                              <svg width="16" height="16" viewBox="0 0 20 20"><rect width="1" height="17" x="9" y="1"></rect><rect width="17" height="1" x="1" y="9"></rect></svg>
                         </button>
                    </div>
               </td>
               <td className='product-item-row__cell --price'>
                    <span>5000 BYN</span>
               </td>
               <td className='product-item-row__cell --del-btn'>
                    <button onClick={showModal} className='btn-delete'>
                         <img
                              src='/red-x-icon.svg'
                              alt=''
                              width={20}
                              height={20}
                         />
                    </button>
                    <ConfigProvider
                         modal={{
                              styles: modalStyles,
                         }}
                    >
                    <Modal
                         open={open}
                         closeIcon={false}
                         width={550}
                         footer={(_) => (
                              <>
                                   <button className='delete-modal-btn mr main-color-transparent-rect-btn' onClick={handleCancel}>Отмена</button>
                                   <button className='delete-modal-btn main-color-filled-rect-btn' onClick={handleOk}>Да</button>
                              </>
                         )}
                         >
                              <div className='delete-modal-title'>
                                   <p>Удалить товар из корзины?</p>
                              </div>
                    </Modal>
                    </ConfigProvider>
               </td>
          </tr>
     )
}
export default CartTableItem