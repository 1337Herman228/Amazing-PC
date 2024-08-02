import ConfigBuyBtn from '@/components/buttons/configurator-buy-btn/ConfigBuyBtn'
import { ConfigProvider, Modal } from 'antd';
import configuratorHook from '../configuratorHook'
import { useState } from 'react';
import './Summation.scss'
import { v4 as uuidv4 } from 'uuid';

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

     const {selectIcon, countFinalPrice} = configuratorHook()

     const toggleModal = (idx, target) => {
       setIsModalOpen((p) => {
         p[idx] = target;
         return [...p];
       });
     };

     const makeProductArray = () => {
          let productArray = []
          for (const key in product) {
               const item = product[key];

               if(item != null && item?.length != 0){
                    // item.title = key
                    productArray.push(item)
               }
     
          }
          return productArray
     }

     const makeCartItemfromProduct = () => {
          const productsArray = []
          const pc = {}
          // Object.defineProperty(pc, 'price', {value: countFinalPrice(product)} , {enumerable: false})
          // Object.defineProperty(pc, 'isPc', {value: true} , {enumerable: false})
          pc.name = 'Конфигурация'
          pc.id = uuidv4();
          pc.price = countFinalPrice(product)
          pc.isPc = true
          pc.isConfiguration = true

          if(product?.case !== null) {
               pc.img = product.case?.img
          } 
          else pc.img = '/components/case/no-case.jpg'

          for(let key in product){
               
               if(product[key] && product[key]?.length != 0){
                    
                    if(product[key]?.category === "Комплектующие" && !Array.isArray(product[key]) 
                         || (Array.isArray(product[key]) && product[key].length != 0 && product[key]?.category === "Комплектующие") ){
                              pc[key] = {...product[key]}
                    }
                    else{

                         if(Array.isArray(product[key])){
                              product[key].forEach(element => {
                                   productsArray.push(
                                        {
                                             ...element,
                                             category:product[key].category,
                                             title:product[key].title
                                        }
                                   )
                              })
                         }
                         else{
                              productsArray.push(
                                   {...product[key]}
                              )
                         }
                    }
               }
          }
          productsArray.push(pc)
          return productsArray
     }
     console.log(makeCartItemfromProduct())
     
     const getCategories = () =>{
          let titles = []
          for (const key in product) {
               const item = product[key];
               if(item != null && item?.length != 0 && !titles.includes(item.category)){
                    titles.push(item.category)
               }
          }
          return titles
     }

     return(
          <>
          <h1 className='summation__title'>Конфигуратор<br/> AMAZING PC UNLIMITED</h1>
               <img
                    className='summation__img'
                    src={product.case?.img || '/components/case/no-case.jpg'}
                    // width={305}
                    height={170}
                    alt=''
                    loading='lazy'
               />
               <div className='summation__price'>
                    Цена {countFinalPrice(product)} BYN
               </div>

               <ConfigBuyBtn product={makeCartItemfromProduct()}/>

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
                              <li key={name} className='configuration-list__item'>
                                   <span className='configuration-list__item-name'>{name}</span>
                                   <span key={index} className='configuration-list__item-info'>{info}</span>
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
                              // centered
                              open={isModalOpen[1]}
                              onOk={() => toggleModal(1, false)}
                              onCancel={() => toggleModal(1, false)}
                              footer={null}
                              width={1200}
                         >
                              <table className='modal-table'>
                              <tbody>
                                   {getCategories().map((item) => {
                                        const _category = item
                                        return(
                                             <>

                                             <tr key={item} className='modal-table__header'>
                                                  <th className='modal-table__header-text' colSpan={3}>{item}</th>
                                             </tr>

                                             {makeProductArray().map((item, index) => {
                                                  if(item.category === _category){
                                                       const name = item.title
                                                       const info = item?.length > 0 ? item.map(item => <>{item.name} ({item?.quantity || 1} шт.)<br/></>) : item.name
                                                       const price = item?.length > 0 ? item.map(item => <>{item.price*(item?.quantity || 1)} BYN<br/></>) : item.price + ' BYN'
                                                       return(
                                                       <>
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
                                                  }
                                             })}
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