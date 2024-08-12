

import React from 'react';
import { ConfigProvider, Modal } from 'antd';
import configuratorHook from '../../../lib/hooks/configuratorHook'
import useSpecificationModal from '../../../lib/hooks/useSpecificationModal'
import './PcSpecModal.scss'

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

const PcSpecModal = ({product, isModalOpen, toggleModal}) => {

    // console.log('product', product)

    const {selectIcon} = configuratorHook()
    const {makeProductArray, getCategories} = useSpecificationModal()

    return (
        <>
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
                    {getCategories(product).map((item) => {
                        const _category = item
                        return(
                                <>

                                <tr key={item} className='modal-table__header'>
                                    <th className='modal-table__header-text' colSpan={3}>{item}</th>
                                </tr>

                                {makeProductArray(product).map((item, index) => {
                                    if(item.category === _category){
                                        const name = item.title
                                        // console.log('item', item)
                                        const info = (item?.length > 0 && Array.isArray(item)) ? item.map(item => <>{item.name} ({item?.quantity || 1} шт.)<br/></>) : item.name
                                        const price = (item?.length > 0 && Array.isArray(item)) ? item.map(item => <>{item.price*(item?.quantity || 1)} BYN<br/></>) : item.price + ' BYN'
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
        </>
    );
};

export default PcSpecModal;