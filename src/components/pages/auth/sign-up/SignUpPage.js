'use client'

import Link from 'next/link';
import '../auth.scss';
import './SignUpPage.scss';
import { useForm } from 'react-hook-form';
import AuthInput from '../../../input/auth-input/AuthInput'
import useHttp from '../../../../lib/hooks/http.hook';
import {ConfigProvider, notification } from 'antd';


const SignUpPage = () => {

    const [api, contextHolder] = notification.useNotification();
    const userAlreadyExistsNotification = (type) => {
      api[type]({
        message: 'Ошибка регистрации',
        description:
          'Пользователь с таким логином уже существует',
      });
    };
    const successfullyRegisteredNotification = (type) => {
        api[type]({
          message: 'Вы успешно зарегистрировались',
          description:
            'А теперь авторизируйтесь чтобы проверить свой новый аккаунт ^-^',
        });
      };
    
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {authRequest} = useHttp();


    const formSubmit = async (data) => {

        const authResponse = await authRequest(`http://localhost:8080/auth/register`,'POST', JSON.stringify(data))
        console.log('authResponse', authResponse)

        if(authResponse.token === 'user already exists'){
            userAlreadyExistsNotification('warning')
        }
        else{
            successfullyRegisteredNotification('success')
        }
    
    }

    return (
        <>
        <ConfigProvider
            theme={{
                components: {
                Notification: {
                    colorBgElevated:'#212121',
                    colorText: 'white',
                    colorTextHeading: 'white',
                    colorIcon: 'white',
                    colorIconHover: 'gray',
                },
                },
            }}
            >
            {contextHolder}
        </ConfigProvider>
        
        <section className='auth-section centered-container'>
            <div className='form-container'>

                <aside className='image-container'>
                    <img
                        className='image-container__img' 
                        src='/backgrounds/hyperpc-cyber.jpg'
                        alt=''
                        width={600}
                        height={600}
                    />
                </aside>

                <aside className='form-aside form-aside--h700'>
                    <div className='navigation'>
                        <Link href='/sign-in' className='navigation__link'>Авторизация</Link>
                        <Link href='/sign-up' className='navigation__link active'>Регистрация</Link>
                    </div>
                    <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='auth-form'>
                        <AuthInput 
                            labelText='Логин' 
                            name='login' 
                            minLength={3} 
                            onlyLettersAndDigits={true}
                            // require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <AuthInput 
                            labelText='Пароль'
                            name='password' 
                            type='password'
                            minLength={8} 
                            onlyLettersAndDigits={true}
                            // require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <AuthInput 
                            labelText='Имя'
                            name='name' 
                            minLength={2} 
                            onlyLettersAndDigits={true}
                            // require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <AuthInput 
                            labelText='Фамилия'
                            name='surname' 
                            minLength={2} 
                            onlyLettersAndDigits={true}
                            // require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <AuthInput 
                            labelText='Email'
                            name='email'
                            type='email' 
                            minLength={2} 
                            onlyLettersAndDigits={false}
                            // require={true} 
                            register={register} 
                            errors={errors}
                        />
                        <AuthInput 
                            labelText='Телефон'
                            name='phone'
                            isPhone={true}
                            // // require={true} 
                            register={register} 
                            errors={errors}
                        />
                    
                        <input className='auth-form__submit-btn' type='submit' value='Подтвердить'/>
                    </form>
                </aside>
            </div>
        </section>
        </>
    );
};

export default SignUpPage;