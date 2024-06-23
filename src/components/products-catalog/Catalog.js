'use client';

import Link from "next/link"
import Card from "./Card"
import './Catalog.scss'

const _catalog = ({categories, products_list, is_notebook = false}) =>{

     return(
          <section className='_catalog'>
               {categories.map((category) => {
                    return(
                    <div key={category.category_id} className='_catalog-body container section'>
                         <div className={categories.length > 1 ? '_catalog-body__header' : 'display-none'}>
                              <div className='header-top'>
                                   <h2 className='header-top__title'>
                                        <Link href={category.category_link}>
                                             {category.category_name}
                                        </Link>
                                   </h2>
                                   <Link href={category.category_link}>
                                        <img
                                             className='header-top__arrow'
                                             src='/arrow-top-right.svg'
                                             width={40}
                                             height={40}
                                             alt=''
                                             loading='lazy'
                                        />
                                   </Link>
                              </div>
                              <div className='header-bottom'>
                                   <p>{category.category_description}</p>
                              </div>
                         </div>
                         <main className='_catalog-body__main'>
                              {products_list.filter((item) => item.category_id === category.category_id).map((item) => 
                                   <Card key={item._id} pc={item} isNotebook={is_notebook}/>
                              )}
                         </main>
                    </div>
                    )
               })}
          </section>
     )
}

export default _catalog