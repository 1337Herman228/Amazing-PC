'use client';

import React, { useEffect, useState } from 'react';
import '../add-partition/AddPartition.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import {ConfigProvider, notification } from 'antd';
import { useForm } from 'react-hook-form';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import AuthInput from '@/components/input/auth-input/AuthInput';
import { usePathname } from 'next/navigation';

const EditPartition = () => {

    const [api, contextHolder] = notification.useNotification();
    const succesEditNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Изменения для раздела комплектующей успешно сохранены.',
      });
    };
    const errorEditNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Не удается применить изменения',
        });
    };

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {requestJson} = useHttp();

    const [partition, setPartition] = useState(null);
    const [loading, setLoading] = useState(false);

    const formSubmit = async (data) => {
        data.partitionId = partition.partitionId
        try{
            await requestJson(`http://localhost:8080/admin/edit-partition`,'POST', JSON.stringify(data))
            succesEditNotification()
        }
        catch{
            errorEditNotification()
        }
    }

    const id = usePathname().split('/').pop()
    const fetchEditPartition = async () => {
        try{
            setLoading(true)
            const editPartition = await requestJson(`http://localhost:8080/admin/get-partition/${id}`)
            setLoading(false)
            setPartition(editPartition)
        }
        catch{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEditPartition()
    }, []);

    return (
       <>
        {contextHolder}
        <AdminDashboard type='parts'/>
        {loading && partition ? <LoadingPage /> :
            <div className='add-partition container pt-100'>
                <div className='form-container horizontal_centered'>
                    <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='add-partition__form'>
                        <h1 className='add-partition__form-title'>Редактирование раздела</h1>
                        <AuthInput 
                            defaultValue={partition?.partitionName}
                            labelText='Название раздела (например "RTX 4060")' 
                            name='partitionName' 
                            minLength={3} 
                            require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <input className='add-partition__form-submit-btn main-color-submit-btn' type='submit' value='Подтвердить'/>
                    </form>
                </div>
            </div>
        }
       </>
    );
};

export default EditPartition;