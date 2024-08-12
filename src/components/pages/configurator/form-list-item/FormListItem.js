'use client'

import { use, useEffect, useState } from 'react'
import './FormListItem.scss'
import configuratorHook from '../../../../lib/hooks/configuratorHook'

const FormListItem = (
     {
     name, 
     type,
     partition, 
     category,
     items, 
     multiselect, 
     default_checked = true, 
     max_quantity,
     addItemToProduct
     }) => {

     const [displayAppearance, setDisplayAppearance] = useState('list')
     const [filteredItems, setFilteredItems] = useState(items)
     const [selectedItem, setSelectedItem] = useState(multiselect ? (default_checked ? [items[0]]:[]) : default_checked ? items[0] : null)
          // console.log('selectedItem',selectedItem)
          // console.log('name',name)

     const {selectIcon} = configuratorHook()

     const alignGridItemWidth =()=>{
          const items = document.querySelectorAll('.grid-display')
          items.forEach(item => {
               const labels = item.querySelectorAll('label')
               labels.forEach(label => {
                    const footer = label.parentElement.nextElementSibling;
                    if (footer) {
                         const gridLabelWidth = label.offsetWidth // Получаем ширину label
                         footer.style.width = `${gridLabelWidth}px`; // Устанавливаем ширину для footer
                    }
               })
          })
     }

     useEffect(() => {
          addDefaultFields()
     }, [])

     useEffect(() => {
          alignGridItemWidth()
     }, [displayAppearance,filteredItems])

     useEffect(() => {
          addDefaultFields()
          addItemToProduct(type, selectedItem)
     }, [selectedItem])

     const addDefaultFields = () => {
          if(selectedItem != null){
               selectedItem.category = category // Устанавливаем категорию
               selectedItem.title = name // Устанавливаем title
          }
     }

     const filterItems = (e) => {
          const btn = e.target
          const part_name = btn.id

          part_name === 'all' ? setFilteredItems(items) : setFilteredItems(items.filter(item => item.partition===part_name))

          const allBtns = btn.parentElement.querySelectorAll('.item-body__dashboard-filter-button')
          allBtns.forEach(btn => btn.classList.remove('active'))
          btn.classList.add('active')
     }

     const OnRadioBtnImageClick = (e) =>{
          const img = e.target
          const input = img.nextElementSibling.querySelector('input')
          input.click();
     }

     const onCheckboxClick = (item) =>{
          if(selectedItem.includes(item)) setSelectedItem(selectedItem.filter(i => i !== item))
          else setSelectedItem([...selectedItem, item])
     }

     const onSelectQuantity = (e,item) =>{
          const quantity = +e.target.value
          selectedItem[selectedItem.indexOf(item)].quantity = quantity
          setSelectedItem([...selectedItem])
     }

     return(
          <>
          <li id={name} className='managed-component-item'>
               <div className='managed-component-item__header'>
                    <div className='managed-component-item__header-left'>
                         <img
                              className='managed-component-item__header-left-icon'
                              src={selectIcon(name)}
                              width={40}
                              height={40}
                              alt=''
                              loading='lazy'
                         />
                         <span className='managed-component-item__header-left-title'>{name}</span>
                    </div>
                    {/* <button className='managed-component-item__header-right'>
                         Какой графический процессор вам подойдёт?
                    </button> */}
               </div>
               <div className='item-body'>
                    <div className='item-body__dashboard'>
                         <ul className='item-body__dashboard-filter'>
                              <button 
                                   id='all'
                                   onClick={(e)=>filterItems(e)}
                                   className='item-body__dashboard-filter-button active'
                              >
                                   Все
                              </button>
                              {partition.map((part_name, index) => 
                                   <button 
                                        id={part_name}
                                        key={index} 
                                        className='item-body__dashboard-filter-button'
                                        onClick={(e)=>filterItems(e)}
                                   >
                                        {part_name}
                                   </button>
                              )}
                         </ul>
                         <div className='item-body__dashboard-view'>
                              <button 
                                   className={`item-body__dashboard-view-button ${displayAppearance === 'list' ? 'active' : ''}`}
                                   onClick={() => setDisplayAppearance('list')}
                              >
                                   <img
                                        className='btn-icon'
                                        src='/list-display-icon.svg'
                                        width={32}
                                        height={32}
                                        alt=''
                                        loading='lazy'
                                   />
                              </button>
                              <button 
                                   className={`item-body__dashboard-view-button ${displayAppearance === 'grid' ? 'active' : ''}`}
                                   onClick={() => setDisplayAppearance('grid')}
                              >
                                   <img
                                        className='btn-icon'
                                        src='/grid-display-icon.svg'
                                        width={32}
                                        height={32}
                                        alt=''
                                        loading='lazy'
                                   />
                              </button>
                         </div>
                    </div>
                    <div className={`list-display + ${displayAppearance === 'list' ? '' : 'display-none'}`}>
                         <div className='image-container'>
                              <img
                                   className='image-container__img'
                                   src={multiselect ? (selectedItem[selectedItem.length-1]?.img || '/components/nothing-selected.jpg') : selectedItem?.img || '/components/nothing-selected.jpg'}
                                   width={314}
                                   height={176}
                                   alt=''
                                   loading='lazy'
                              />
                         </div>
                         <ul className='list-display__form'>
                              {filteredItems.map((item, index) => 
                                   <li key={index} className='list-display__form-item'>
                                        <div className='list-display__form-item-info'>
                                             <input
                                                  className='list-display__form-item-input'
                                                  type={multiselect ? 'checkbox' : 'radio'}
                                                  name={name}
                                                  id={name + "-" + item.id}
                                                  onChange={multiselect ? () =>onCheckboxClick(item) : () => setSelectedItem(item)}
                                                  checked={multiselect ? 
                                                       selectedItem.includes(item)
                                                       : selectedItem?.id === item.id}
                                             />
                                             <label
                                                  className='list-display__form-item-label'
                                                  htmlFor={name + "-" + item.id}
                                             >
                                                  {multiselect && max_quantity ? 
                                                  <>
                                                       <select 
                                                            onChange={(e)=>onSelectQuantity(e,item)} 
                                                            className={`list-display__form-item-select ${selectedItem.includes(item) || 'visually-hidden'}`}
                                                            value={selectedItem.includes(item) ? selectedItem[selectedItem.indexOf(item)].quantity : 1}
                                                       >
                                                            {Array.from({length: max_quantity}, (_, i) => i + 1).map((i, index) => <option key={index} value={i}>{i}</option>)}
                                                       </select>
                                                  </>
                                                  : null}
                                                  {item.name}
                                             </label>
                                             <button className='list-display__form-item-i-btn'>
                                                  <img
                                                       className='btn-icon'
                                                       src='/info-icon.svg'
                                                       width={20}
                                                       height={20}
                                                       alt=''
                                                       loading='lazy'
                                                  />
                                             </button>
                                             <button className='list-display__form-item-compare-btn'>
                                                  <img
                                                       className='btn-icon'
                                                       src='/compare-icon-2.svg'
                                                       width={20}
                                                       height={20}
                                                       alt=''
                                                       loading='lazy'
                                                  />
                                             </button>
                                             { (!default_checked && !multiselect && selectedItem?.id === item.id) ? 
                                                  <button 
                                                       onClick={() => setSelectedItem(null)}
                                                       className='list-display__form-item-x-btn'
                                                  >
                                                       <img src='/red-x-icon.svg'/>
                                                  </button> 
                                                  :null}
                                        </div>
                                        <div className={`list-display__form-item-price ${multiselect ? (selectedItem.includes(item) ? 'hidden' : '') : (selectedItem?.id === item.id ? 'hidden' : '') }`}>
                                             {multiselect ? ('+' + item.price) : (selectedItem?.price ? (item.price - selectedItem?.price < 0 ? item.price - selectedItem?.price : `+${item.price - selectedItem?.price}`) : ('+' + item.price) )} BYN
                                        </div>
                                   </li>
                              )}
                         </ul>
                    </div>
                    <ul className={`grid-display ${displayAppearance === 'grid' ? '' : 'display-none'}`}>
                         {filteredItems.map((item, index) => 
                              <li key={index} className='grid-display__form-item'>
                                   <img
                                        className='grid-display__form-item-img'
                                        src={item.img}
                                        width={314}
                                        height={176}
                                        alt=''
                                        loading='lazy'
                                        onClick={(e)=>OnRadioBtnImageClick(e)}
                                   />
                                   <div className='grid-display__form-item-body'>
                                        <input
                                             className='list-display__form-item-input'
                                             type={multiselect ? 'checkbox' : 'radio'}
                                             name={name +'-grid'}
                                             id={name + "-" + item.id}
                                             onChange={multiselect ? () =>onCheckboxClick(item) : () => setSelectedItem(item)}
                                             checked={multiselect ? 
                                                  selectedItem.includes(item)
                                                  : selectedItem?.id === item.id}
                                        />
                                        <label
                                             className='list-display__form-item-label'
                                             htmlFor={name + "-" + item.id}
                                        >
                                             {multiselect && max_quantity ? 
                                                  <>
                                                       <select 
                                                            onChange={(e)=>onSelectQuantity(e,item)} 
                                                            value={selectedItem.includes(item) ? selectedItem[selectedItem.indexOf(item)].quantity : 1}
                                                            className={`list-display__form-item-select ${selectedItem.includes(item) || 'visually-hidden'}`}
                                                       >
                                                            { Array.from({length: max_quantity}, (_, i) => i + 1).map((i, index) => <option key={index} value={i}>{i}</option>)}
                                                       </select>
                                                  </>
                                                  : null}
                                             {item.name}
                                        </label>
                                   </div>
                                   <div 
                                   // style={{width:gridLabelWidth}} 
                                   className='grid-display__form-item-footer'>
                                        <div className={`list-display__form-item-price ${multiselect ? (selectedItem.includes(item) ? 'hidden' : '') : (selectedItem?.id === item.id ? 'hidden' : '') }`}>
                                             {multiselect ? ('+' + item.price) : (selectedItem?.price ? (item.price - selectedItem?.price < 0 ? item.price - selectedItem?.price : `+${item.price - selectedItem?.price}`) : ('+' + item.price)) } BYN
                                        </div>
                                        <div className='grid-display__form-item-footer-btns'>
                                             <button className='list-display__form-item-i-btn'>
                                                  <img
                                                       className='btn-icon'
                                                       src='/info-icon.svg'
                                                       width={20}
                                                       height={20}
                                                       alt=''
                                                       loading='lazy'
                                                  />
                                             </button>
                                             <button className='list-display__form-item-compare-btn'>
                                                  <img
                                                       className='btn-icon'
                                                       src='/compare-icon-2.svg'
                                                       width={20}
                                                       height={20}
                                                       alt=''
                                                       loading='lazy'
                                                  />
                                             </button>
                                             { (!default_checked && !multiselect && selectedItem?.id === item.id) ? 
                                                  <button 
                                                       onClick={() => setSelectedItem(null)}
                                                       className='list-display__form-item-x-btn'
                                                  >
                                                       <img src='/red-x-icon.svg'/>
                                                  </button> 
                                                  :null}
                                        </div>
                                   </div>
                              </li>
                         )}
                    </ul>
               </div>
          </li>
          </>
     )
}

export default FormListItem