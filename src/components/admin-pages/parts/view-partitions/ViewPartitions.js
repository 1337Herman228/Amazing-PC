'use client';

import React, { useEffect, useState } from 'react';
import './ViewPartitions.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import LoadingPage from '@/components/loading/LoadingPage';
import '../../../modals/pc-spec-modal/PcSpecModal.scss'
import Link from 'next/link';
import {ConfigProvider, notification } from 'antd';
import DeleteModal from '../../../modals/delete-modal/DeleteModal'

const ViewPartitions = () => {

    
    const [api, contextHolder] = notification.useNotification();
    const succesDeleteNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Выбранный раздел комплектующей успешно удален.',
      });
    };
    const errorDeleteNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Не удалось удалить выбранный раздел комплектующей.',
        });
    };

    const {requestJson} = useHttp();

    const [partitions, setPartitions] = useState([]);
    const [partitionToDelete, setPartitionToDelete] = useState(null);

    const [loading, setLoading] = useState(false);


    const [open, setOpen] = useState(false);
    const showModal = (objectToDelete) => {
        setOpen(true);
        setPartitionToDelete(objectToDelete)
   };
   const handleOk = () => {
        deletePartition(partitionToDelete)
        setOpen(false);
   };
   const handleCancel = () => {
        setOpen(false);
   };

    useEffect(() => {
        fetchPartitions()
    }, []);

    const fetchPartitions = async () => {
        setLoading(true);
        try {
            const data = await requestJson(`http://localhost:8080/admin/partitions`)
            console.log('partitions',data)
            setPartitions(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePartition = async (partition) => {
        try {
            await requestJson(`http://localhost:8080/admin/delete-partition`, 'DELETE', JSON.stringify(partition))
            succesDeleteNotification()
            fetchPartitions()
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
               <div className='view-partitions container pt-100'>
                    <table className='view-partitions__table modal-table'>
                        <thead>
                            <tr className='modal-table__header'>
                                <th className='modal-table__header-text' colSpan={3}>Разделы комплектующих</th>
                            </tr>
                            <tr className='modal-table__row-names'>
                     
                                <th className='modal-table__row-names-cell' colSpan={3}>
                                    partitionName
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {partitions.map((partition) => <>
                                <tr key={partition.partitionId} className='modal-table__row'>

                                    <td className='modal-table__row-info'>{partition.partitionName}</td>

                                    <td className='modal-table__row-info btn-30-td'>
                                        <Link href={`/admin/parts/partition-edit/${partition.partitionId}`} className='manage-btn'>
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
                                        <button onClick={() => showModal(partition)} className='manage-btn'>  
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
                        message='Удалить данный раздел комплектующих?'
                    />
               </div>
               
           }
       </>
    );
};

export default ViewPartitions;