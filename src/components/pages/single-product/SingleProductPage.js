'use client';

import SingleProductHeader from "@/components/header/single-product-header/SingleProductHeader"
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

import './SPP.scss'
import Link from "next/link";

const header_info = [
     {
          title:'ONE',
          description:'ONE – оптимальный старт в мир современного гейминга.',
          img:'/single-product/one/hyperpc-one-banner.jpg',
          img_mobile:'/single-product/one/hyperpc-one-mobile.jpg',
     },
     {
          title:'LUMEN CORE',
          description:'ONE – оптимальный старт в мир современного гейминга.',
          img:'/single-product/one/hyperpc-one-banner.jpg',
          img_mobile:'/single-product/one/hyperpc-one-mobile.jpg',
     },

]

const products = [
     {
          _id:'0',
          name:'One',
          design:{
               title:'МОЩНОСТЬ И НАДЕЖНОСТЬ',
               description:'Компьютер ONE выполнен без излишеств. Каждый компонент, начиная от корпуса и заканчивая системой охлаждения, создан, чтобы обеспечить максимальную производительность, надежность и долговечность. Идеальное сочетание цены и качества делает компьютеры серии ONE самыми оптимальными игровыми системами HYPERPC. То, что нужно начинающим геймерам.',
               min_price:'5000',
               img:'/single-product/one/hyperpc-one-block-design.jpg',
          }

     },
]

const SingleProductPage = ({product_name}) => {

     const [isLoading, setIsLoading] = useState(true)
     const [headerInfo, setHeaderInfo] = useState(null)
     const [productInfo, setProductInfo] = useState(null)

     useEffect(() => {
          findInfo()
     }, [])

     const findInfo = () => {
          const header = header_info.find((item) => item.title.replace(' ', '-').toLocaleLowerCase() === product_name)
          const product = products.find((item) => item.name.replace(' ', '-').toLocaleLowerCase() === product_name)

          setHeaderInfo(header)
          setProductInfo(product)
          setIsLoading(false)
     }

     const pathname = usePathname()

     return(
          <>
          { isLoading ? 
               <Loading /> : 
               <>
                    <SingleProductHeader header_info={headerInfo}/>

                    <section className="design container section">
                         <img
                              className='design__img'
                              src={productInfo.design.img}
                              alt={productInfo.name + ' design'}
                              loading='lazy'
                         />
                         <div className="design__body">
                              <h2 className="design__body-title">{productInfo.design.title}</h2>
                              <div className="design__body-info">
                                   <div className="design__body-info__description">
                                        <p>{productInfo.design.description}</p>
                                   </div>

                                   <div className="design__body-info-footer">
                                        <div className="design__body-info__price">
                                             Базовая комплектация от {productInfo.design.min_price} BYN
                                        </div>
                                        <Link className="design__body-info__link green-circle-bordered-link" href={pathname + '#buy'}>Комплектация и цены</Link>
                                   </div>
                                   
                              </div>
                         </div>
                    </section>
               </> 
          }
          </>
     )
}
export default SingleProductPage