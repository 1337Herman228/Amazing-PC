import React, { useEffect } from 'react';
import AuthInput from '@/components/input/auth-input/AuthInput';

const FanForm = ({ register, unregister, errors, isEditForm, fanData }) => {
    useEffect(() => {
        return () => {
            unregister('fanSize');
            unregister('backlight');
            unregister('fanSpeed');
            unregister('airFlow');
            unregister('maxNoiseLevel');
        };
    }, [unregister]);

    return (
        <div className='fan-form'>
            <div className='fan-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? fanData?.fanSize : ''}
                    labelText='Размер вентилятора (120x120мм)'
                    require={true}
                    name='fanSize'
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='fan-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? fanData?.backlight : ''}
                    labelText='Подсветка'
                    require={true}
                    name='backlight'
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='fan-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? fanData?.fanSpeed : ''}
                    labelText='Скорость вентилятора (об/мин)'
                    require={true}
                    name='fanSpeed'
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='fan-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? fanData?.airFlow : ''}
                    labelText='Воздушный поток (CFM)'
                    require={true}
                    name='airFlow'
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='fan-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? fanData?.maxNoiseLevel : ''}
                    labelText='Максимальный уровень шума (дБ)'
                    require={true}
                    name='maxNoiseLevel'
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default FanForm;