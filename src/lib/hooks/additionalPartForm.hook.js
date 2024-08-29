import CpuForm from '@/components/form/part-forms/CpuForm';
import GpuForm from '@/components/form/part-forms/GpuForm';
import PeripheryForm from '@/components/form/part-forms/PeripheryForm';
import MotherboardForm from '@/components/form/part-forms/MotherboardForm';
import CpuFanForm from '@/components/form/part-forms/CpuFanForm';
import RamForm from '@/components/form/part-forms/RamForm';
import SsdForm from '@/components/form/part-forms/SsdForm';
import PsuForm from '@/components/form/part-forms/PsuForm';
import CaseForm from '@/components/form/part-forms/CaseForm';
import FanForm from '@/components/form/part-forms/FanForm';

const useAdditionalPartForm = () => {

    const switchAdditionalForm = ({selectedCategory, selectedType, register, unregister, errors, part = null, isEditForm = false, isFormSubmitted = false}) => {
        if(selectedCategory === 'Комплектующие'){
            switch(selectedType){
                case 'Процессор': return <CpuForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} cpu={part?.cpu}/>;
                case 'Видеокарта': return <GpuForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} gpu={part?.gpu}/>;
                case 'Материнская плата': return <MotherboardForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} motherboard={part?.motherboard}/>;
                case 'Охлаждение': return <CpuFanForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} cpuAirCooling={part?.cpuAirCooling} cpuLiquidCooling={part?.cpuLiquidCooling}/>;
                case 'Оперативная память': return <RamForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} ram={part?.ram}/>;
                case 'SSD накопитель': return <SsdForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} ssd={part?.ssd}/>;
                case 'Блок питания': return <PsuForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} psu={part?.psu}/>;
                case 'Корпус': return <CaseForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} caseData={part?.cases}/>;
                case 'Вентилятор': return <FanForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} isFormSubmitted={isFormSubmitted} fanData={part?.fan}/>;
            }
        }
        else if(selectedCategory === 'Периферия'){
            return <PeripheryForm register={register} unregister={unregister} errors={errors} isEditForm={isEditForm} periphery={part?.periphery}/>
        }
        else{
            return null
        }
    }

    return {switchAdditionalForm}
};

export default useAdditionalPartForm;