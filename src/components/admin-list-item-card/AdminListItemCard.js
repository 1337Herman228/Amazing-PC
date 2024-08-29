'use client'

import React, { useState } from 'react';
import './AdminListItemCard.scss'
import InfoModal from '../../components/modals/info-modal/InfoModal'
import useParts from '../../lib/hooks/parts.hook'
import DeleteModal from '../modals/delete-modal/DeleteModal'
import {Flex, notification } from 'antd';
import useHttp from '@/lib/hooks/http.hook';
import { Image } from 'antd';
import useManageImg from '@/lib/hooks/manageImg.hook';
import Link from 'next/link';

const AdminListItemCard = ({id, name, type, category, partition, price, remainingQuantity, part, img, fetchParts}) => {

    const {requestJson} = useHttp();
    const {deleteImg} = useManageImg();

    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Выбранная комплектующая успешно удалена.',
      });
    };
    const errorDeleteNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Не удалось удалить выбранную комплектующую.',
        });
    };

    const [isModalOpen, setIsModalOpen] = useState([false, false]);

    const {makePartInfoObject} = useParts()

    const [partToDelete, setPartToDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const showModal = (partToDelete) => {
        setOpen(true);
        setPartToDelete(partToDelete)
   };
   const handleOk = () => {
        deletePart(partToDelete)
        setOpen(false);
   };

  const handleCancel = () => {
        setOpen(false);
   };

   const deletePart = async (part) => {
        try {
            await requestJson(`http://localhost:8080/admin/delete-part`, 'DELETE', JSON.stringify(part))
            deleteImg(name)
            succesDeleteNotification()
            setTimeout(() => {
                fetchParts()
            },1200)
        } catch (error) {
            errorDeleteNotification()
            console.error(error)
        }
    }

    const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
        p[idx] = target;
        return [...p];
    });
    };

    const getPartObject = () =>{

    let type = part.types.typeName;

    if(type === 'cpu_fan'){
        type = 'cpuAirCooling'
        if(!part[type]){
            type = 'cpuLiquidCooling'
        }
    }
    if(!part[type]){
        type = 'periphery'
    }

    return [type, part[type]]
    }

    return (
        <li key={id} className='admin-list-item-card'>
            {contextHolder}
            <Image
                className='admin-list-item-card__img' 
                src={img}
                alt=''
                width={165}
                height={165}
            />
            <div className='card-content'>
                <div className='card-content__header'>
                    <h2 className='card-content__name'>{name}</h2>
                    <div className='card-content__manage'>

                        <button  onClick={() => toggleModal(1, true)} className='card-content__manage-btn'>
                            <img
                                className='light-img hover-img' 
                                src='/info.svg'
                                alt='Подробнее'
                                width={30}
                                height={30}
                            />
                        </button>

                        <InfoModal 
                            data={makePartInfoObject(getPartObject())} 
                            name={name}
                            isModalOpen={isModalOpen} 
                            toggleModal={toggleModal}
                        />

                        <Link href={`/admin/parts/edit/${part.partId}`} className='card-content__manage-btn'>
                            <img
                                className='light-img hover-img' 
                                src='/edit.svg'
                                alt='Редактировать'
                                width={30}
                                height={30}
                            />
                        </Link>

                        <button onClick={() => showModal(part)} className='card-content__manage-btn'>
                            <img
                                className='hover-img' 
                                src='/red-x-icon.svg'
                                alt='Удалить'
                                width={20}
                                height={20}
                            />
                        </button>

                    </div>
                </div>
                <div className='card-content__info'><span className='card-content__label'>Цена:</span> {price} BYN</div>
                <div className='card-content__info'><span className='card-content__label'>Тип:</span> {type}</div>
                <div className='card-content__info'><span className='card-content__label'>Категория:</span> {category}</div>
                <div className='card-content__info'><span className='card-content__label'>Раздел:</span> {partition}</div>
                <div className='card-content__info'><span className='card-content__label'>Осталось:</span> {remainingQuantity} шт</div>
            </div>
            <DeleteModal 
                open={open} 
                handleOk={handleOk} 
                handleCancel={handleCancel}
                message='Удалить данную комплектующую?'
            />
        </li>
    );
};

export default AdminListItemCard;