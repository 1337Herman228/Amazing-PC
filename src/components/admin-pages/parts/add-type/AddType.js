'use client';

import React, { useState } from 'react';
import './AddType.scss'
import useHttp from '../../../../lib/hooks/http.hook';
import {notification } from 'antd';
import { useForm } from 'react-hook-form';
import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import AuthInput from '@/components/input/auth-input/AuthInput';
import ImageUpload from '../../../upload-image/ImageUpload';
import useManageImg from '@/lib/hooks/manageImg.hook';


const AddType = () => {

    const {saveSvgIcon} = useManageImg();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Новый тип комплектующей успешно добавлен.',
      });
    };
    const errorNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Такой тип комплектующей уже существует.',
        });
    };

    const {register, handleSubmit, formState: {errors}} = useForm();

    const {requestJson} = useHttp();

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    

    const formSubmit = async (data) => {
        try{
            if(img){
                const typeToAdd = {...data, typeImage:'/svg-icons/'+data.typeName+'.svg'}
                await requestJson(`http://localhost:8080/admin/add-type`,'POST', JSON.stringify(typeToAdd))
                succesNotification()
                saveSvgIcon(data.typeName, img)
            }
            else{
                errorNotification()
            }
        }
        catch{
            errorNotification()
        }
    }

    return (
       <>
        {contextHolder}
        <AdminDashboard type='parts'/>

        <div className='add-type container pt-100'>
            <div className='form-container horizontal_centered'>
                <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='add-type__form'>

                    <h1 className='add-type__form-title'>Добавление нового типа</h1>

                    <div className='form__general-img'>
                        <div className='img-label'>Иконка (svg):</div>

                        <ImageUpload 
                            accept='.svg'
                            img={img}
                            isFormSubmitted={isFormSubmitted}
                            setImg={setImg} 
                        />
        
                        <p className='error-message'>{isFormSubmitted ? (img ? null : 'Загрузите иконку') : null}</p>
                    </div>

                    <AuthInput 
                        labelText='Название типа (например "cpu")' 
                        name='typeName' 
                        minLength={3} 
                        require={true} 
                        register={register} 
                        errors={errors}
                    />

                    <AuthInput 
                        labelText='Альтернативное название типа (например "Процессор")' 
                        name='alternativeName' 
                        minLength={3} 
                        require={true} 
                        register={register} 
                        errors={errors}
                    />

                    <input onClick={()=>setIsFormSubmitted(true)} className='add-type__form-submit-btn main-color-submit-btn' type='submit' value='Подтвердить'/>

                </form>
            </div>
        </div>
       </>
    );
};

export default AddType;