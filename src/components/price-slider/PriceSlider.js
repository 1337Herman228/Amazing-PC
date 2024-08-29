'use client'

import React, { useRef } from 'react';
import './PriceSlider.scss'
import { ConfigProvider, Slider } from 'antd';

const PriceSlider = ({name, minMax,setMinMax}) => {

    const refMin = useRef(null)
    const refMax = useRef(null)

    const handleChange = (value) => {
        setTimeout(() => {
            setMinMax(value)
            refMin.current.innerHTML = value[0]
            refMax.current.innerHTML = value[1]
        }, 99)
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                Slider: {
                    trackHoverBg:'#c0ff01',
                    trackBg:'#c0ff01',
                    handleColor:'#c0ff01',
                    handleActiveColor:'#c0fa01',
                    dotActiveBorderColor:'#c0fa01',
                    handleActiveOutlineColor:'#c0fa01',
                    colorPrimaryBorderHover: '#c0ff01',

                    railBg: 'gray',
                    railHoverBg: '#999',
                },
                },
            }}
        >
            <div className='price-slider'>
                <div className='price-slider__label'>
                    <p>{name} | <span ref={refMin}>{minMax[0]}</span> - <span ref={refMax}>{minMax[1]}</span></p>
                </div>
                <Slider
                    className='price-slider__slider'
                    min={minMax[0]}
                    max={minMax[1]}
                    range={{}}
                    defaultValue={minMax}
                    onChange = {handleChange}
                />
            </div>
        </ConfigProvider>
    );
};

export default PriceSlider;