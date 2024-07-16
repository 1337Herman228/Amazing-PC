'use client';

import SingleProductHeader from "@/components/header/single-product-header/SingleProductHeader"
import Loading from "@/components/loading/Loading";
import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'

import './SPP.scss'
import Link from "next/link";
import Slider from "@/components/slider/Slider";
import { Image } from 'antd';
import Tag from "@/components/tags/Tag";
import ConfigurationCard from "./ConfigurationCard";
import SecondNavbar from "@/components/navbar/SecondNavbar";

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
     {
          title:'Play 17',
          description:'ONE – оптимальный старт в мир современного гейминга.',
          img:'/single-product/play-17/hyperpc-play-17-idn-intro.jpg',
          img_mobile:'/single-product/play-17/hyperpc-play-17-idn-intro-mobile.jpg',
     },

]

const products = [
     {
          _id:'0',
          name:'One',
          category:'pc',
          design:{
               title:'МОЩНОСТЬ И НАДЕЖНОСТЬ',
               description:'Компьютер ONE выполнен без излишеств. Каждый компонент, начиная от корпуса и заканчивая системой охлаждения, создан, чтобы обеспечить максимальную производительность, надежность и долговечность. Идеальное сочетание цены и качества делает компьютеры серии ONE самыми оптимальными игровыми системами HYPERPC. То, что нужно начинающим геймерам.',
               min_price:'5000',
               img:'/single-product/one/hyperpc-one-block-design.jpg',
          },
          preview:{
               main_img:'/single-product/one/hyperpc-one-block-gallery.jpg',
               title:'ГАРМОНИЯ СТИЛЯ',
               description:'ONE - это компьютер с элегантным черным корпусом, дополненным яркими A-RGB вентиляторами и изящными прямыми линиями, идеально вписывающимися в любой интерьер. Высококачественная сталь обеспечивает прочную фиксацию комплектующих, а стильная сетчатая передняя панель и прозрачное смотровое окно подчеркивают эксклюзивность и уникальность дизайна.',
               slider_images:[
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
               ]
          },
          performance:{
               img:'/single-product/one/hyperpc-one-block-performance.jpg',
               img_2:'/single-product/one/hyperpc-one-block-memory.jpg',
               title:'ПЕРЕДОВАЯ МОЩНОСТЬ',
               description:'Компьютеры ONE построены на базе передовых компьютерных комплектующих: процессоров Intel Core 12-го и 14-го поколения, а также видеокарт NVIDIA с поддержкой последних графических технологий, таких как трассировка лучей, генерация кадров и сглаживание DLSS. Эти комплектующие гарантируют высокую производительность не только в играх, но и в сложных профессиональных программах. Неважно, чем вы будете заниматься, графическим дизайном, архитектурным проектированием или 3D моделированием. Компьютеры ONE станут надежной платформой для решения ваших творческих задач.',
          },
          configurations:[
               {
                    _id:'0',
                    configuration_id:'0',
                    configuration_name:'One Start',
                    configuration_description:'Игровая платформа, построенная на базе процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5000',
                    link_to_configurator:'/one-start/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR4, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    ssd:'500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'550W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'1',
                    configuration_name:'One Max',
                    configuration_description:'Геймерская система с процессором Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокартой Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5900',
                    link_to_configurator:'/one-max/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR5, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]',
                    ssd:'1TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'550W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'2',
                    configuration_name:'One Ultra',
                    configuration_description:'Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].',
                    configuration_price:'6800',
                    link_to_configurator:'/one-ultra/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR5, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]',
                    ssd:'1TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'650W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               
               
          ]

     },
     {
          _id:'1',
          name:'Lumen core',
          category:'pc',
          design:{
               title:'МОЩНОСТЬ И НАДЕЖНОСТЬ',
               description:'Компьютер ONE выполнен без излишеств. Каждый компонент, начиная от корпуса и заканчивая системой охлаждения, создан, чтобы обеспечить максимальную производительность, надежность и долговечность. Идеальное сочетание цены и качества делает компьютеры серии ONE самыми оптимальными игровыми системами HYPERPC. То, что нужно начинающим геймерам.',
               min_price:'5000',
               img:'/single-product/one/hyperpc-one-block-design.jpg',
          },
          preview:{
               main_img:'/single-product/one/hyperpc-one-block-gallery.jpg',
               title:'ГАРМОНИЯ СТИЛЯ',
               description:'ONE - это компьютер с элегантным черным корпусом, дополненным яркими A-RGB вентиляторами и изящными прямыми линиями, идеально вписывающимися в любой интерьер. Высококачественная сталь обеспечивает прочную фиксацию комплектующих, а стильная сетчатая передняя панель и прозрачное смотровое окно подчеркивают эксклюзивность и уникальность дизайна.',
               slider_images:[
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
                    '/single-product/one/hyperpc-one-block-design.jpg',
                    '/single-product/one/hyperpc-one-1.jpg',
               ]
          },
          performance:{
               img:'/single-product/one/hyperpc-one-block-performance.jpg',
               img_2:'/single-product/one/hyperpc-one-block-memory.jpg',
               title:'ПЕРЕДОВАЯ МОЩНОСТЬ',
               description:'Компьютеры ONE построены на базе передовых компьютерных комплектующих: процессоров Intel Core 12-го и 14-го поколения, а также видеокарт NVIDIA с поддержкой последних графических технологий, таких как трассировка лучей, генерация кадров и сглаживание DLSS. Эти комплектующие гарантируют высокую производительность не только в играх, но и в сложных профессиональных программах. Неважно, чем вы будете заниматься, графическим дизайном, архитектурным проектированием или 3D моделированием. Компьютеры ONE станут надежной платформой для решения ваших творческих задач.',
          },
          configurations:[
               {
                    _id:'0',
                    configuration_id:'0',
                    configuration_name:'One Start',
                    configuration_description:'Игровая платформа, построенная на базе процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5000',
                    link_to_configurator:'/one-start/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR4, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    ssd:'500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'550W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'1',
                    configuration_name:'One Max',
                    configuration_description:'Геймерская система с процессором Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокартой Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5900',
                    link_to_configurator:'/one-max/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR5, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]',
                    ssd:'1TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'550W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'2',
                    configuration_name:'One Ultra',
                    configuration_description:'Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].',
                    configuration_price:'6800',
                    link_to_configurator:'/one-ultra/config',
                    img:'/gaming-pc/one.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    mb:'MSI PRO B760M-A [DDR5, Wi-Fi]',
                    cpu_fan:'DeepCool AG400 BK ARGB',
                    ram:'32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]',
                    ssd:'1TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    pow_sup:'650W DeepCool PK550D [80+ Bronze]',
                    case:'DeepCool CC360 ARGB',
                    os:'Microsoft Windows 11 Home OEM',
               },
               
               
          ]

     },
     {
          _id:'2',
          name:'play 17',
          category:'notebook',
          design:{
               title:'МОЩНОСТЬ И НАДЕЖНОСТЬ',
               description:'Компьютер ONE выполнен без излишеств. Каждый компонент, начиная от корпуса и заканчивая системой охлаждения, создан, чтобы обеспечить максимальную производительность, надежность и долговечность. Идеальное сочетание цены и качества делает компьютеры серии ONE самыми оптимальными игровыми системами HYPERPC. То, что нужно начинающим геймерам.',
               min_price:'5000',
               img:'/single-product/play-17/hyperpc-play-17-design.jpg',
          },
          preview:{
               main_img:'/single-product/play-17/hyperpc-play-17-preview-1.jpg',
               title:'ГАРМОНИЯ СТИЛЯ',
               description:'ONE - это компьютер с элегантным черным корпусом, дополненным яркими A-RGB вентиляторами и изящными прямыми линиями, идеально вписывающимися в любой интерьер. Высококачественная сталь обеспечивает прочную фиксацию комплектующих, а стильная сетчатая передняя панель и прозрачное смотровое окно подчеркивают эксклюзивность и уникальность дизайна.',
               slider_images:[
                    '/single-product/play-17/hyperpc-play-17-preview-1.jpg',
                    '/single-product/play-17/hyperpc-play-17-preview-2.jpg',
                    '/single-product/play-17/hyperpc-play-17-preview-3.jpg',
                    '/single-product/play-17/hyperpc-play-17-preview-4.jpg',
                    '/single-product/play-17/hyperpc-play-17-preview-5.jpg',
               ]
          },
          performance:{
               img:'/single-product/play-17/hyperpc-play-17-idn-performance.jpg',
               img_2:'/single-product/play-17/hyperpc-play-17-idn-interface.jpg',
               title:'ПЕРЕДОВАЯ МОЩНОСТЬ',
               description:'Компьютеры ONE построены на базе передовых компьютерных комплектующих: процессоров Intel Core 12-го и 14-го поколения, а также видеокарт NVIDIA с поддержкой последних графических технологий, таких как трассировка лучей, генерация кадров и сглаживание DLSS. Эти комплектующие гарантируют высокую производительность не только в играх, но и в сложных профессиональных программах. Неважно, чем вы будете заниматься, графическим дизайном, архитектурным проектированием или 3D моделированием. Компьютеры ONE станут надежной платформой для решения ваших творческих задач.',
          },
          configurations:[
               {
                    _id:'0',
                    configuration_id:'0',
                    configuration_name:'One Start',
                    configuration_description:'Игровая платформа, построенная на базе процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5000',
                    link_to_configurator:'/one-start/config',
                    img:'/notebooks/hyperpc-play.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    display:'17", 2560 x 1600px, 240 Гц, IPS',
                    ram:'16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    ssd:'500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'1',
                    configuration_name:'One Max',
                    configuration_description:'Геймерская система с процессором Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокартой Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].',
                    configuration_price:'5900',
                    link_to_configurator:'/one-max/config',
                    img:'/notebooks/hyperpc-play.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    display:'17", 2560 x 1600px, 240 Гц, IPS',
                    ram:'16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    ssd:'500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    os:'Microsoft Windows 11 Home OEM',
               },
               {
                    _id:'0',
                    configuration_id:'2',
                    configuration_name:'One Ultra',
                    configuration_description:'Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].',
                    configuration_price:'6800',
                    link_to_configurator:'/one-ultra/config',
                    img:'/notebooks/hyperpc-play.jpg', //взять в другой таблице
                    gpu:'Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]',
                    cpu:'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    display:'17", 2560 x 1600px, 240 Гц, IPS',
                    ram:'16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    ssd:'500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    os:'Microsoft Windows 11 Home OEM',
               },
               
               
          ]

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

     const SliderImageItem =({img}) => {
          return(
               <Image.PreviewGroup
                    items={productInfo.preview.slider_images}
               >
               <div>
                    <Image
                         className="slider-image-item"
                         width={310}
                         src={img}
                    />
               </div>
               
               </Image.PreviewGroup>
          )
     }

     return(
          <>
          { isLoading ? 
               <Loading /> : 
               <>
                    <SecondNavbar productInfo={productInfo}/>
                    <SingleProductHeader header_info={headerInfo}/>
                    <section id='design' className="design container section">
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

                    <section id='preview' className="preview container section">
                         <img
                              className='preview__img'
                              src={productInfo.preview.main_img}
                              alt='Preview'
                              loading='lazy'
                         />
                         <div className="preview-body ">
                              <div className="preview-body-info">
                                   <span className="preview-body-info__mark mark-gray-green">Дизайн</span>
                                   <h2 className="preview-body-info__title">{productInfo.preview.title}</h2>
                                   <div className="preview-body-info__description">
                                        <p>{productInfo.preview.description}</p>
                                   </div>
                              </div>
                              <Slider items={productInfo.preview.slider_images.map((link,i) => <SliderImageItem key={i} img={link}/>)}/>
                         </div>
                    </section>

                    <section id='performance' className="performance container section">
                         <div className="power">
                              <img
                                   className='power__img'
                                   src={productInfo.performance.img}
                                   alt='Performance'
                                   loading='lazy'
                              />
                              <div className="power-body">
                                   <div className="power-body-info">
                                        <span className="power-body-info__mark mark-gray-green">Производительность</span>
                                        <h2 className="power-body-info__title">{productInfo.performance.title}</h2>
                                        <div className="power-body-info__description">
                                             <p>{productInfo.performance.description}</p>
                                        </div>
                                   </div>
                                   <div className="power-body-tags">
                                        <div className="power-body-tags__container">
                                             <Tag className="power-body-tags__tag" title='Видеокарта быстрее' prefix='до' main_value='6X' postfix='раз'/>
                                             <Tag className="power-body-tags__tag" title='Частота процессора' prefix='до' main_value='4,4' postfix='ГГц'/>
                                             <Tag className="power-body-tags__tag" title='Объем памяти' prefix='до' main_value='32' postfix='ГБ'/>
                                             <Tag className="power-body-tags__tag" title='Чтение SSD' prefix='до' main_value='4' postfix='ГБ/С'/>
                                        </div>
                                        <div></div>
                                   </div>
                              </div>
                         </div>

                         <div className="components-section">
                              <img
                                   className='components-section__img'
                                   src='/single-product/graphics-card.jpg'
                                   alt='Graphics card'
                                   loading='lazy'
                              />
                              <div className="components-section-body">
                                   <span className="components-section-body__mark mark-gray-green">Видеокарта</span>
                                   <h2 className="components-section-body__title">ИЗОБРЕТАЯ ГРАФИКУ ЗАНОВО</h2>
                                   <div className="components-section-body__description">
                                        <p>NVIDIA® GeForce® RTX предлагает непревзойденный игровой опыт на ПК. Созданные на новой архитектуре NVIDIA Ada Lovelace GPU и революционной платформе RTX, видеокарты RTX совмещают в себе технологии трассировки лучей в реальном времени, искусственный интеллект и программируемые шейдеры.</p>
                                   </div>
                              </div>
                         </div>

                         <div className="components-section components-section--reversed">
                              <img
                                   className='components-section__img'
                                   src='/single-product/processor.jpg'
                                   alt='Graphics card'
                                   loading='lazy'
                              />
                              <div className="components-section-body">
                                   <span className="components-section-body__mark mark-gray-green">Процессор</span>
                                   <h2 className="components-section-body__title">БОЛЬШЕ ЯДЕР, БОЛЬШЕ ВЫЧИСЛИТЕЛЬНОЙ МОЩИ</h2>
                                   <div className="components-section-body__description">
                                        <p>Компьютеры ONE с 12-м поколением процессоров Intel® Core™ для настольных ПК обеспечивают высокую производительность для обычных и профессиональных геймеров. До 6 ядер и 12 потоков, тактовая частота до 4,4 ГГц, 18 МБ кэш-памяти — процессоры Intel® Core™ 12-го поколения для настольных ПК созданы для игр и работы.</p>
                                   </div>
                              </div>
                         </div>

                         <div className="ram-and-storage">
                              <div className="ram-and-storage-body">
                                   <img
                                        className='ram-and-storage-body__img'
                                        src={productInfo.performance.img_2}
                                        alt='Ram and Storage'
                                        loading='lazy'
                                   />
                                   <div className="ram-and-storage-body-info">
                                        <span className="ram-and-storage-body-info__mark mark-gray-green">Память и накопители</span>
                                        <h2 className="ram-and-storage-body-info__title">ВЫСОКАЯ СКОРОСТЬ<br/> ОБРАБОТКИ ДАННЫХ</h2>
                                        <div className="ram-and-storage-body-info__description">
                                             <p>Компьютеры ONE с 12-м поколением процессоров Intel® Core™ для настольных ПК обеспечивают высокую производительность для обычных и профессиональных геймеров. До 6 ядер и 12 потоков, тактовая частота до 4,4 ГГц, 18 МБ кэш-памяти — процессоры Intel® Core™ 12-го поколения для настольных ПК созданы для игр и работы.</p>
                                             <p>Новейшие SSD накопители формата M.2 — идеально подойдут для интенсивных нагрузок и надежно сохранят любые данные, а повышенная пропускная способность поможет решить самые сложные задачи в кратчайший срок.</p>
                                        </div>
                                   </div>
                              </div>
                              <div className="ram-and-storage-footer">
                                   <Tag className="ram-and-storage-footer__tag" title='Объем памяти' prefix='до' main_value='32' postfix='ГБ'/>
                                   <Tag className="ram-and-storage-footer__tag" title='Чтение SSD' prefix='до' main_value='4' postfix='ГБ/С'/>
                                   <Tag className="ram-and-storage-footer__tag" title='Частота памяти' prefix='до' main_value='3600' postfix='МГц'/>
                                   <Tag className="ram-and-storage-footer__tag" title='Объем накопителя' prefix='до' main_value='12' postfix='ТБ'/>
                              </div>
                         </div>
                    </section>

                    <section id='kits-and-prices' className="kits-and-prices-bg-container container-fluid">
                         <div className="kits-and-prices container section">
                              <div className="kits-and-prices__header">
                                   <span className="kits-and-prices__header-mark mark-gray-green">Комплектации и цены</span>
                                   <h2 className="kits-and-prices__header-title">Вариации {productInfo.name}</h2>
                              </div>
                              <div className="kits-and-prices-body">
                                   {productInfo.configurations.map((kit,index)=>{
                                        return(
                                             <ConfigurationCard 
                                                  isNotebook={productInfo.category === 'notebook'}
                                                  key={index} 
                                                  img={kit.img}
                                                  name={kit.configuration_name} 
                                                  price={kit.configuration_price}
                                                  description={kit.configuration_description}
                                                  link_to_configurator={kit.link_to_configurator}
                                                  gpu={kit.gpu}
                                                  cpu={kit.cpu}
                                                  mb={kit.mb}
                                                  cpu_fan={kit.cpu_fan}
                                                  ram={kit.ram}
                                                  ssd={kit.ssd}
                                                  pow_sup={kit.pow_sup}
                                                  _case={kit.case}
                                                  os={kit.os}
                                                  display={kit.display}
                                             />
                                        ) 
                                   })}
                              </div>
                         </div>
                    </section>
               </> 
          }
          </>
     )
}
export default SingleProductPage