'use client'

import './ImageUpload.scss'
import { PlusOutlined } from '@ant-design/icons';
import { ConfigProvider, Image, Upload } from 'antd';
import { useState } from 'react';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const ImageUpload = (
    {
        defaultImg = null,
        isFormSubmitted,
        img,
        accept='image/*',
        listType="picture-card",
        setImg,
    }) => {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState(defaultImg ? defaultImg : []);

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

    return (
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
            <Upload
                accept={accept}
                customRequest={customRequest}
                listType={listType}
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
        </ConfigProvider>
    );
};

export default ImageUpload;