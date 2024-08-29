import {  useEffect, useState } from 'react'
import './CartPage.scss'
import {changeItemQuantity, deleteCartItem} from '../../../lib/redux/slices/cartSlice'
import { useDispatch } from 'react-redux'
import PcSpecModal from '@/components/modals/pc-spec-modal/PcSpecModal';
import Link from 'next/link';
import DeleteModal from '@/components/modals/delete-modal/DeleteModal';

const CartTableItem = ({item}) => {

     const [isModalOpen, setIsModalOpen] = useState([false, false]);
     const toggleModal = (idx, target) => {
       setIsModalOpen((p) => {
         p[idx] = target;
         return [...p];
       });
     };
     const mapToModalItem = (item) => {
          const obj = {}
          for(let key in item){
               if(typeof item[key] == 'object'){
                    obj[key] = item[key]
               }
          }
          return obj
     }
     // console.log('mapToModalItem',mapToModalItem(item))

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

     const PcInfo = ({name, isConfiguration, id}) => (
          <div className='pc-info'>
               <div className='title-div'>
                    <span className='title-div--pc-name'>{name}</span>
                    {isConfiguration && <span className='title-div--pc-id'>{id}</span>}
               </div>
               <div className='pc-dashboard'>
                    <button className='pc-dashboard__btn main-color-transparent-rect-btn' onClick={() => toggleModal(1, true)}>Cпецификация</button>
                    <Link className='pc-dashboard__btn main-color-transparent-rect-btn' href={`/configurator/${id}`}>Изменить</Link>
               </div>
          </div>
     )
     
     const OtherInfo = ({type, name}) =>(
          <div className='title-div'>
               <span className='title-div--product-type'>{type}</span>
               <span className='title-div--product-name'>{name}</span>
          </div>
     )

     const Quantity = () => {
          return(
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
          )
     }

     return(
          <>
          {/* таблица для отображения у десктопов */}
          <tr className='product-item-row hidden-tablet'> 
               <td className='product-item-row__cell'>
                    <img
                         className='product-item-row__main-image'
                         src={item.img}
                         alt=''
                         width={320}
                         height={220}
                    />
               </td>
               <td className='product-item-row__cell'>
                    {item.isPc===true ? <PcInfo name={item.name} isConfiguration={item?.isConfiguration} id={item.id}/> : <OtherInfo type={item.title} name={item.name}/>}
               </td>
               <td className='product-item-row__cell available'>
                    <span className='available__text'>В наличии</span>
               </td>
               <td className='product-item-row__cell quantity'>
                    <Quantity />
               </td>
               <td className='product-item-row__cell price'>
                    <span>{item.price * item.quantity} BYN</span>
               </td>
               <td className='product-item-row__cell del-btn'>
                    <button onClick={showModal} className='btn-delete'>
                         <img
                              src='/red-x-icon.svg'
                              alt=''
                              width={20}
                              height={20}
                         />
                    </button>
                   <DeleteModal open={open} handleCancel={handleCancel} handleOk={handleOk}/>
               </td>
          </tr>

          {/* таблица для отображения у планшетов и меньше */}
          <tr className='product-item-row visible-tablet'>
               <td className='product-item-row__cell'>
                    <div className='grid-cell'>
                         <div className='grid-cell__main-image'>
                              <img
                                   src={item.img}
                                   alt=''
                                   width={320}
                                   height={220}
                              />
                         </div>
                         <div className='grid-cell__info'>
                              {item.isPc===true ? <PcInfo name={item.name} isConfiguration={item?.isConfiguration} id={item.id}/> : <OtherInfo type={item.title} name={item.name}/>}
                         </div>
                         <div className='grid-cell__del-btn'>
                              <button onClick={showModal} className='btn-delete'>
                                   <img
                                        src='/red-x-icon.svg'
                                        alt=''
                                        width={20}
                                        height={20}
                                   />
                              </button>
                              <DeleteModal />
                         </div>
                         <div className='grid-cell__quantity'>
                              <Quantity />
                         </div>
                         <div className='grid-cell__available available'>
                              <span className='available__text'>В наличии</span>
                         </div>
                         <div className='grid-cell__price price'>
                              <span>{item.price * item.quantity} BYN</span>
                         </div>
                    </div>
               </td>
          </tr>
          {item.isConfiguration && <PcSpecModal product={mapToModalItem(item)} isModalOpen={isModalOpen} toggleModal={toggleModal}/>}
          </>
     )
}
export default CartTableItem