import AuthInput from '@/components/input/auth-input/AuthInput';
import './PartForms.scss'
import React, { useEffect} from 'react';

const RamForm = ({ register, unregister, errors, isEditForm, ram }) => {

    useEffect(() => {
        return () => {
            unregister('type');
            unregister('frequency');
            unregister('capacity');
        }
    }, []);

    return (
        <div className='ram-form'>
            <div className='ram-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? ram?.type : ''}
                    labelText='Тип (DDR)'
                    require={true}
                    name='type'
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='ram-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? ram?.frequency : ''}
                    onlyPositiveDigits={true}
                    labelText='Частота (МГц)'
                    require={true}
                    name='frequency'
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className='ram-form__input'>
                <AuthInput
                    defaultValue={isEditForm ? ram?.capacity : ''}
                    onlyPositiveDigits={true}
                    labelText='Объем (ГБ)'
                    require={true}
                    name='capacity'
                    minLength={0}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default RamForm;