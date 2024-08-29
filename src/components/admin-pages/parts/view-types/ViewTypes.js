'use client';

import React, { useEffect, useState } from 'react';
import './ViewTypes.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import LoadingPage from '@/components/loading/LoadingPage';
import '../../../modals/pc-spec-modal/PcSpecModal.scss'
import Link from 'next/link';
import {ConfigProvider, notification } from 'antd';
import DeleteModal from '../../../modals/delete-modal/DeleteModal'

const ViewTypes = () => {

    
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Выбранный тип комплектующей успешно удален.',
      });
    };
    const errorDeleteNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Не удалось удалить выбранный тип комплектующей.',
        });
    };

    const {requestJson} = useHttp();

    const [types, setTypes] = useState([]);
    const [typeToDelete, setTypeToDelete] = useState(null);

    const [loading, setLoading] = useState(false);


    const [open, setOpen] = useState(false);
    const showModal = (typeToDelete) => {
        setOpen(true);
        setTypeToDelete(typeToDelete)
   };
   const handleOk = () => {
        deleteType(typeToDelete)
        setOpen(false);
   };
   const handleCancel = () => {
        setOpen(false);
   };

    useEffect(() => {
        fetchTypes()
    }, []);

    const fetchTypes = async () => {
        setLoading(true);
        try {
            const data = await requestJson(`http://localhost:8080/admin/types`)
            console.log('data',data)
            setTypes(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteType = async (type) => {
        try {
            await requestJson(`http://localhost:8080/admin/delete-type`, 'DELETE', JSON.stringify(type))
            succesDeleteNotification()
            fetchTypes()
        } catch (error) {
            errorDeleteNotification()
            console.error(error)
        }
    }


    return (
        <>
        {contextHolder}
        <AdminDashboard type='parts'/>
           {loading ? <LoadingPage /> :
               <div className='view-types container pt-100'>
                    <table className='view-types__table modal-table'>
                        <thead>
                            <tr className='modal-table__header'>
                                <th className='modal-table__header-text' colSpan={4}>Типы комплектующих</th>
                            </tr>
                            <tr className='modal-table__row-names'>
                                <th className='modal-table__row-names-cell'>
                                    typeName
                                </th>
                                <th className='modal-table__row-names-cell' colSpan={3}>
                                    alternativeTypeName
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {types.map((type) => <>
                                <tr key={type.typeId} className='modal-table__row'>

                                    <td className='modal-table__row-info'>{type.typeName}</td>
                                    <td className='modal-table__row-info'>{type.alternativeName}</td>

                                    <td className='modal-table__row-info btn-30-td'>
                                        <Link href={`/admin/parts/types-edit/${type.typeId}`} className='manage-btn'>
                                            <img
                                                className='light-img hover-img' 
                                                src='/edit.svg'
                                                alt='Редактировать'
                                                width={30}
                                                height={30}
                                            />
                                        </Link>
                                    </td>
                                    <td className='modal-table__row-info btn-30-td'>
                                        <button onClick={() => showModal(type)} className='manage-btn'>  
                                            <img
                                                className='hover-img' 
                                                src='/red-x-icon.svg'
                                                alt='Удалить'
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                       
                                    </td>
                                   
                                </tr>
                            </> )}
                        </tbody>
                   </table>
                   <DeleteModal 
                        open={open} 
                        handleOk={handleOk} 
                        handleCancel={handleCancel}
                        message='Удалить данный тип комплектующих?'
                    />
               </div>
               
           }
       </>
    );
};

export default ViewTypes;