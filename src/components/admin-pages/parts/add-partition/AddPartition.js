'use client';

import React from 'react';
import './AddPartition.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import {ConfigProvider, notification } from 'antd';
import { useForm } from 'react-hook-form';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import AuthInput from '@/components/input/auth-input/AuthInput';

const AddPartition = () => {

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Новый раздел для комплектующих успешно добавлен.',
      });
    };
    const errorNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Такой раздел комплектующих уже существует.',
        });
    };

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {requestJson} = useHttp();

    const formSubmit = async (data) => {
        try{
            await requestJson(`http://localhost:8080/admin/add-partition`,'POST', JSON.stringify(data))
            succesNotification()
        }
        catch{
            errorNotification()
        }
    }

    return (
       <>
        {contextHolder}
        <AdminDashboard type='parts'/>

        <div className='add-partition container pt-100'>
            <div className='form-container horizontal_centered'>
                <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='add-partition__form'>
                    <h1 className='add-partition__form-title'>Добавление нового раздела</h1>
                    <AuthInput 
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
       </>
    );
};

export default AddPartition;