import ConfigBuyBtn from '@/components/buttons/configurator-buy-btn/ConfigBuyBtn'
import { ConfigProvider, Modal } from 'antd';
import configuratorHook from '../configuratorHook'
import Link from 'next/link'
import { useState } from 'react';
import './Summation.scss'

const bg_color = '#111'
const modalStyles = {
     mask: {
          backdropFilter: 'blur(0px)',
     },
     content: {
          color: 'white',
          backgroundColor: bg_color,
     },
   };

const Summation = ({product}) => {

     const [isModalOpen, setIsModalOpen] = useState([false, false]);

     const {selectIcon} = configuratorHook()

     const toggleModal = (idx, target) => {
       setIsModalOpen((p) => {
         p[idx] = target;
         return [...p];
       });
     };

     const countFinalPrice = () =>{
          let price = 0;

          for (const key in product) {

               const item = product[key];

               if(item != null && item?.length != 0){
                    
                    if(item?.length > 0){
                         item.forEach(element => {
                              let quantity = element?.quantity ?? 1
                              price += Number(element?.price) * quantity
                         });
                    }
                    else{
                         price += Number(item?.price)
                    }
               }
               
          }
          return price
     }

     const makeProductArray = () => {
          let productArray = []
          for (const key in product) {
               const item = product[key];

               if(item != null && item?.length != 0){
                    item.title = key
                    productArray.push(item)
               }
     
          }
          return productArray
     }

     return(
          <>
          <h1 className='summation__title'>Конфигуратор<br/> AMAZING PC UNLIMITED</h1>
               <img
                    className='summation__img'
                    src={product['Корпус']?.img || '/components/case/no-case.jpg'}
                    // width={305}
                    height={170}
                    alt=''
                    loading='lazy'
               />
               <div className='summation__price'>
                    Цена {countFinalPrice()} BYN
               </div>
               <ConfigBuyBtn/>
               <div className='summation__control-btns'>
                    <button className='summation__control-btns-save summation__control-btns--btn' >
                         <img
                              className='summation__control-btns-icon'
                              src='/configurator-svg/save.svg'
                              width={20}
                              height={20}
                              alt='Save'
                              loading='lazy'
                         />
                         <span className='summation__control-btns-text'>Сохранить</span>
                    </button>
                    <button className='summation__control-btns-reset summation__control-btns--btn' >
                         <img
                              className='summation__control-btns-icon'
                              src='/configurator-svg/reset.svg'
                              width={20}
                              height={20}
                              alt='Reset'
                              loading='lazy'
                         />
                         <span className='summation__control-btns-text'>Сбросить</span>
                    </button>
                    <button className='summation__control-btns-load summation__control-btns--btn' >
                         <img
                              className='summation__control-btns-icon'
                              src='/configurator-svg/load.svg'
                              width={20}
                              height={20}
                              alt='Load'
                              loading='lazy'
                         />
                         <span className='summation__control-btns-text'>Загрузить</span>
                    </button>
                    <button className='summation__control-btns-close summation__control-btns--btn' >
                         <img
                              className='summation__control-btns-icon'
                              src='/configurator-svg/close.svg'
                              width={20}
                              height={20}
                              alt='Close'
                              loading='lazy'
                         />
                         <span className='summation__control-btns-text'>Закрыть</span>
                    </button>
               </div>
               <div className='summation__configuration'>
                    <span className='summation__configuration-title'>Конфигурация</span>

                    <ul className='configuration-list'>
                         {makeProductArray().map((item, index) => {
                              const name = item.title
                              const info = item?.length > 0 ? item.map(item => <>{item.name} ({item?.quantity || 1} шт.)<br/></>) : item.name
                              return(
                              <li key={index} className='configuration-list__item'>
                                   <span className='configuration-list__item-name'>{name}</span>
                                   <span className='configuration-list__item-info'>{info}</span>
                              </li>
                              )
                         })}
                    </ul>
                    <button onClick={() => toggleModal(1, true)} className='summation__configuration-all-spec'>Полная спецификация</button>
                    <ConfigProvider
                         theme={{
                              token: {
                                   colorIcon: 'white',
                                   colorIconHover: '#c0ff01',
                              },
                         }}
                         modal={{
                              styles: modalStyles,
                         }}
                    >
                         <Modal
                              centered
                              open={isModalOpen[1]}
                              onOk={() => toggleModal(1, false)}
                              onCancel={() => toggleModal(1, false)}
                              footer={null}
                              width={1200}
                         >
                              <table className='modal-table'>
                              <tbody>
                                   <tr className='modal-table__header'>
                                        <th className='modal-table__header-text' colSpan={3}>Комплектующие</th>
                                   </tr>
                                   
                                   {makeProductArray().map((item, index) => {
                                        const name = item.title
                                        const info = item?.length > 0 ? item.map(item => <>{item.name} ({item?.quantity || 1} шт.)<br/></>) : item.name
                                        const price = item?.length > 0 ? item.map(item => <>{item.price*(item?.quantity || 1)} BYN<br/></>) : item.price + ' BYN'
                                        return(
                                             <>
                                             {/* <tr className='modal-table__header'>
                                                  <th className='modal-table__header-text' colSpan={3}>Комплектующие</th>
                                             </tr> */}
                                             <tr key={index} className='modal-table__row'>
                                                  <td className='modal-table__row-name'>
                                                       <img
                                                            className='modal-table__row-name-icon'
                                                            src={selectIcon(name)}
                                                            width={20}
                                                            height={20}
                                                            alt=''
                                                            loading='lazy'
                                                       /> 
                                                       <span className='modal-table__row-name-text'>{name}</span>
                                                  </td>
                                                  <td className='modal-table__row-info'>{info}</td>
                                                  <td className='modal-table__row-price'>{price}</td>
                                             </tr>
                                             </>
                                        )
                                   })}
                         
                              </tbody>
                              </table>
                         </Modal>
                    </ConfigProvider>
               </div>
          </>
     )
}

export default Summation