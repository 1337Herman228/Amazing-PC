import Link from 'next/link';
import './ConfigurationCard.scss';
import { Rate } from 'antd';

const ConfigurationCard =(
    {
        img,
        name,
        price,
        description,
        link_to_configurator,

    })=>{
    return(
        // <Link>
            <div className='configuration-card'>
                <img
                    className='configuration-card__img'
                    src={img}
                    alt=''
                    loading='lazy'
                />
                <h3 className='configuration-card__title'>{name}</h3>
                <div className='configuration-card__rate'>
                <Rate className='configuration-card__rate-value' disabled defaultValue={5} />  
                <span className='configuration-card__rate-count'>(12 отзывов)</span>
                </div>
                <div className='configuration-card__buy'>
                    <span className='configuration-card__buy-price'>
                        Цена {price} BYN
                    </span>
                    <button className='configuration-card__buy-button buy-button'>В корзину</button>
                </div>
                <div className='configuration-card__description'>
                    <p>{description}</p>
                </div>
                <div className='configuration-card__links'>
                    <Link href={link_to_configurator} className='configuration-card__links-config'>
                        <img
                            className='configuration-card__links-config-svg'
                            src='/setting-2.svg'
                            width={24}
                            height={24}
                            alt='configurator'
                            loading='lazy'
                        />
                        <span className='configuration-card__links-config-text'>
                            Конфигуратор
                        </span>
                    </Link>
                    <Link href='#' className='configuration-card__links-more'>Подробнее</Link>
                </div>
                <div className='components-list'>

                </div>
            </div>
        // </Link>
    )
}

export default ConfigurationCard