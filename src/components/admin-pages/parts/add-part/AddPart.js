'use client'

import AdminDashboard from '@/components/navbar/admin-dashboard/AdminDashboard';
import React, { useEffect, useState } from 'react';
import useHttp from '../../../../lib/hooks/http.hook';
import './AddPart.scss'
import AloneSelect from '@/components/select/antd-alone-select/AloneSelect';
import LoadingPage from '@/components/loading/LoadingPage';
import AuthInput from '@/components/input/auth-input/AuthInput';
import { useForm } from 'react-hook-form';
import Textarea from '../../../input/textarea/Textarea'
import { PlusOutlined } from '@ant-design/icons';
import { ConfigProvider, Image, Upload, notification } from 'antd';
import useManageImg from '@/lib/hooks/manageImg.hook';
import useAdditionalPartForm from '@/lib/hooks/additionalPartForm.hook';
import useParts from '@/lib/hooks/parts.hook';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const categories = [
    {
        value:'Комплектующие',
        label:'Комплектующие'
    },
    {
        value:'Периферия',
        label:'Периферия'
    }
]

const AddPart = () => {

    const {makePartEntityObject} = useParts()
    const {switchAdditionalForm} = useAdditionalPartForm();
    const {saveImg} = useManageImg();

    const [api, contextHolder] = notification.useNotification();
    const succesNotification = () => {
      api['success']({
        message: 'Успешно',
        description:
          'Новая комплектующая успешна добавлена.',
      });
    };
    const errorNotification = () => {
        api['error']({
          message: 'Ошибка',
          description:
            'Не удалось добавить новую комплектующую.',
        });
    };

    const {requestJson} = useHttp();
    const {register, unregister, handleSubmit, formState: {errors}} = useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const [img, setImg] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    
    const [types, setTypes] = useState([]);
    const [partitions, setPartitions] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedPartition, setSelectedPartition] = useState('');

    const [loading, setLoading] = useState(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if(newFileList.length == 0) setImg(null);
    }

    const uploadButton = (
        <button
            style={{
                color: 'var(--text-color-grey)',    
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
            style={{
                marginTop: 4,
            }}
            >
            Загрузить
            </div>
        </button>
    );

    const customRequest = async ({ file, onSuccess, onError }) => {
        try {
            setImg(file);
            onSuccess();
        }
        catch{
            onError();
        }
    };


    const formSubmit = async (data) => {
        try{
            if(img && selectedPartition){

                const object = makePartEntityObject({data, selectedCategory, selectedType, selectedPartition})
                console.log(object)
                await requestJson(`http://localhost:8080/admin/add-part`,'POST', JSON.stringify(object))
                saveImg(data.name, img)

                succesNotification()
            }
            else{
                errorNotification()
            }
        }
        catch{
            errorNotification()
        }
    }

    useEffect(() => {
        fetchTypes()
        fetchPartitions()
    }, []);

    const fetchTypes = async () => {
        setLoading(true);
        try {
            const data = await requestJson(`http://localhost:8080/admin/types`)
            setTypes( makeOptionsListFromTypes(data))
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchPartitions = async () => {
        setLoading(true);
        try {
            const data = await requestJson(`http://localhost:8080/admin/partitions`)
            setPartitions(makeOptionsListFromPartitions(data))
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const makeOptionsListFromTypes = (types) => {
        const newArr = []

        types.forEach(element => {
            newArr.push({value: element.alternativeName, label: element.alternativeName})
        })

        return newArr
    }
    const makeOptionsListFromPartitions = (partitions) => {
        const newArr = []

        partitions.forEach(element => {
            newArr.push({value: element.partitionName, label: element.partitionName})
        })

        return newArr
    }

    return (
        <>
        <ConfigProvider
            theme={{
                components: {
                Upload: {
                    colorBorder: `${!img && isFormSubmitted ? 'var(--red-error-color)' : 'gray'}`,
                    colorPrimary:'var(--main-color)', //цвет рамки при наведении
                },
                },
            }}
        >
        {contextHolder}

         <AdminDashboard type='parts'/>
            {loading ? <LoadingPage /> :
                <div className='add-part container pt-100'>
                    <aside className='manage-form'>
                        <AloneSelect setStateField={setSelectedCategory} name='Категория' options={categories}/>
                        <AloneSelect setStateField={setSelectedType} name='Тип' options={types}/>
                    </aside>
                    <aside className='main-form'>
                        { !selectedCategory ? <h1 className='main-form__title'>Выберите категорию</h1> :
                          !selectedType ? <h1 className='main-form__title'>Выберите тип</h1> : 
                          <>
                          <h1 className='main-form__title'>Добавление комплектующей</h1>

                          <div className='form-wrapper'>
                            <form onSubmit={handleSubmit((data)=>formSubmit(data))} className='form'>

                                <div className='form__general'>
                                    
                                    <div className='form__general-img'>
                                        <div className='form__general-img-label'>Изображение:</div>
                                        <Upload
                                            accept='image/*'
                                            customRequest={customRequest}
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                       
                                        >
                                            {fileList.length >= 1 ? null : uploadButton}
                                        </Upload>
                                        {previewImage && (
                                            <Image
                                                wrapperStyle={{display: 'none'}}
                                                preview={{
                                                    visible: previewOpen,
                                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                                }}
                                                src={previewImage}
                                            />
                                        )}
                                        <p className='error-message'>{isFormSubmitted ? (img ? null : 'Загрузите изображение') : null}</p>
                                    </div>

                                    <div className='form__general-part-name'>
                                        <AuthInput 
                                            labelText='Название' 
                                            name='name' 
                                            minLength={3} 
                                            require={true} 
                                            register={register} 
                                            errors={errors}
                                        />
                                    </div>

                                    <div className='form__general-price'>
                                        <AuthInput 
                                            onlyPositiveDigits={true}
                                            labelText='Цена (BYN)' 
                                            name='price' 
                                            minLength={0} 
                                            require={true} 
                                            register={register} 
                                            errors={errors}
                                        />
                                    </div>

                                    <div className='form__general-select-partition'>
                                        <AloneSelect
                                            setStateField={setSelectedPartition}
                                            name='Раздел' 
                                            options={partitions}
                                            isError={isFormSubmitted ? (selectedPartition ? null : true) : null}
                                        />
                                        <p className='error-message'>{isFormSubmitted ? (selectedPartition ? null : 'Выберите раздел') : null}</p>
                                    </div>

                                    <div className='form__general-description'>
                                        <Textarea 
                                            labelText='Описание' 
                                            name='description' 
                                            minLength={20} 
                                            require={true} 
                                            register={register} 
                                            errors={errors}
                                            rows={8}
                                        />
                                    </div>

                                    <div className='form__general-quantity-left'>
                                        <AuthInput 
                                            defaultValue={0}
                                            onlyPositiveDigits={true}
                                            labelText='Оставшееся количество' 
                                            name='remainingQuantity' 
                                            minLength={0} 
                                            register={register} 
                                            errors={errors}
                                        />
                                    </div>

                                    <input onClick={()=>setIsFormSubmitted(true)} className='form__submit-btn main-color-submit-btn' type='submit' value='Подтвердить'/>

                                </div>

                                <div className='form__additional'>
                                    {switchAdditionalForm( 
                                        {
                                        selectedCategory, 
                                        isFormSubmitted, 
                                        selectedType, 
                                        register, 
                                        unregister, 
                                        errors
                                        }
                                    )}
                                </div>
                             
                            </form>

                          </div>
                          </>
                        }
                    </aside>
                </div>
            }
        </ConfigProvider>
        </>
    );
};

export default AddPart;