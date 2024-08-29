'use client'

import Link from 'next/link';
import '../auth.scss';
import { useForm } from 'react-hook-form';
import AuthInput from '../../../input/auth-input/AuthInput'
import useCookie from '../../../../lib/hooks/cookie.hook';
import useHttp from '../../../../lib/hooks/http.hook';
import {ConfigProvider, notification } from 'antd';

const SignInPage = () => {

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: 'Ошибка авторизации',
        description:
          'Проверьте правильность введенных данных',
      });
    };
    
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {createCookie, getCookies} = useCookie();
    const {authRequest} = useHttp();

    const formSubmit = async (data) => {

        try {
            const authResponse = await authRequest(`http://localhost:8080/auth/authenticate`,'POST', JSON.stringify(data))

            // console.log('authResponse', authResponse)

            createCookie("token", authResponse.authenticationResponse.token )
            createCookie("role", authResponse.role )
            createCookie("user_id", authResponse.userId )

            // console.log('cookieValue', getCookies());

            if(authResponse.role === 'admin'){
                location.href = '/admin';
            }
            else{
                location.href = '/';
            }

            
        }
        catch {
            openNotificationWithIcon('error')
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
           
            <section className='centered-container'>
                <div className='form-container'>

                    <aside className='image-container'>
                        <img
                            className='image-container__img' 
                            src='/backgrounds/phanteks-nv7-white.jpg'
                            alt=''
                            width={600}
                            height={600}
                        />
                    </aside>

                    <aside className='form-aside'>
                        <div className='navigation'>
                            <Link href='/sign-in' className='navigation__link active'>Авторизация</Link>
                            <Link href='/sign-up' className='navigation__link'>Регистрация</Link>
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
                            <input className='auth-form__submit-btn' type='submit' value='Подтвердить'/>
                        </form>
                    </aside>
                </div>
            </section>
        </>
    );
};

export default SignInPage;