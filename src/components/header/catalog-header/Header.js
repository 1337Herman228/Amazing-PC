import Link from 'next/link'
import './Header.scss'

const Header = ({header_info}) => {
     return(
          <section className='_header'>
               <div className='_header__body container section'>
                    <div className='breadcrumbs'>
                         <Link href='/' className='breadcrumbs__link'>Главная</Link>
                         <span className='breadcrumbs__divider'>/</span>
                         <span className='breadcrumbs__link current'>{header_info.title}</span>
                    </div>
                    <div className='information'>
                         <h1 className='information__title'>{header_info.title}</h1>
                         <div className='information__description'>
                              <p>{header_info.description}</p>
                         </div>
                         <Link href={header_info.link} className='information__link link-more-details'>{header_info.link_text}</Link>
                    </div>
                    <div className='image-container'>
                         <img
                              className='image-container__img'
                              alt=''
                              src={header_info.img}
                              loading='lazy'
                         />
                    </div>
               </div>
          </section>
     )
}

export default Header