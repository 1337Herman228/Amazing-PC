'use client';

import React, { useEffect, useState } from 'react';
import '../add-type/AddType.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import {ConfigProvider, notification } from 'antd';
import { useForm } from 'react-hook-form';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import AuthInput from '@/components/input/auth-input/AuthInput';
import { usePathname } from 'next/navigation';
import LoadingPage from '@/components/loading/LoadingPage';

const EditType = () => {

    const [api, contextHolder] = notification.useNotification();
    const succesEditNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Изменения типа комплектующей успешно сохранены.',
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

    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);


    const formSubmit = async (data) => {
        data.typeId = type.typeId
        try{
            await requestJson(`http://localhost:8080/admin/edit-type`,'POST', JSON.stringify(data))
            succesEditNotification()
        }
        catch{
            errorEditNotification()
        }
    }

    const id = usePathname().split('/').pop()
    const fetchEditType = async () => {
        try{
            setLoading(true)
            const editType = await requestJson(`http://localhost:8080/admin/get-type/${id}`)
            setLoading(false)
            setType(editType)
        }
        catch{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEditType()
    }, []);

    return (
       <>
        {contextHolder}
        <AdminDashboard type='parts'/>
        {loading && type ? <LoadingPage /> :
        <div className='add-type container pt-100'>
            <div className='form-container horizontal_centered'>
                <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='add-type__form'>
                    <h1 className='add-type__form-title'>Редактирование типа комплектующей</h1>
                    <AuthInput 
                        defaultValue={type?.typeName}
                        labelText='Название типа (например "cpu")' 
                        name='typeName' 
                        minLength={3} 
                        require={true} 
                        register={register} 
                        errors={errors}
                    />
                    <AuthInput 
                        defaultValue={type?.alternativeName}
                        labelText='Альтернативное название типа (например "Процессор")' 
                        name='alternativeName' 
                        minLength={3} 
                        require={true} 
                        register={register} 
                        errors={errors}
                    />
                    <input className='add-type__form-submit-btn main-color-submit-btn' type='submit' value='Подтвердить'/>
                </form>
            </div>
        </div>
        }
       </>
    );
};

export default EditType;