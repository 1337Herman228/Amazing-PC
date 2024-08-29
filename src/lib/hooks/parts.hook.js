
const useParts = () => {

    const makeCpuInfoObject = (object) => {

        const cpu = {}
        if(object.socket) cpu['Сокет'] = object.socket
        if(object.baseFrequency) cpu['Базовая частота'] = object.baseFrequency +' Мгц'
        if(object.boostFrequency) cpu['Турбо-частота'] = object.boostFrequency +' Мгц'
        if(object.cashL1) cpu['Кэш L1'] = object.cashL1
        if(object.cashL2) cpu['Кэш L2'] = object.cashL2
        if(object.cashL3) cpu['Кэш L3'] = object.cashL3
        if(object.cpuCores) cpu['Кол-во ядер'] = object.cpuCores
        if(object.cpuThreads) cpu['Кол-во потоков'] = object.cpuThreads
        if(object.maxRamCapacity) cpu['Максимальный объем памяти'] = object.maxRamCapacity +' ГБ'
        if(object.ramType) cpu['Поддерживаемые типы памяти'] = JSON.parse(object.ramType).join(', ')
        if(object.tdp) cpu['TDP'] = object.tdp +' Вт'
        if(object.techProcess) cpu['Тех-процесс'] = object.techProcess

        return cpu
    }

    const makeGpuInfoObject = (object) => {
        const gpu = {};
        if (object.techProcess) gpu['Тех-процесс'] = object.techProcess + ' нм';
        if (object.maxDisplaysQuantity) gpu['Макс. количество дисплеев'] = object.maxDisplaysQuantity;
        if (object.maxResolution) gpu['Макс. разрешение'] = object.maxResolution;
        if (object.baseFrequency) gpu['Базовая частота'] = object.baseFrequency + ' Мгц';
        if (object.boostFrequency) gpu['Турбо-частота'] = object.boostFrequency + ' Мгц';
        if (object.vramCapacity) gpu['Объем видеопамяти'] = object.vramCapacity + ' ГБ';
        if (object.vramType) gpu['Тип видеопамяти'] = object.vramType;
        if (object.busWidth) gpu['Ширина шины'] = object.busWidth + ' бит';
        if (object.hdmi) gpu['Количество HDMI'] = object.hdmi;
        if (object.displayPort) gpu['Количество DisplayPort'] = object.displayPort;
        if (object.cuda) gpu['CUDA ядра'] = object.cuda;
        if (object.powerConnector) gpu['Разъем питания'] = object.powerConnector;
        if (object.minPowerUnit) gpu['Минимальный блок питания'] = object.minPowerUnit + ' Вт';
        if (object.fans) gpu['Количество вентиляторов'] = object.fans;
        if (object.extensionSlots) gpu['Количество слотов расширения'] = object.extensionSlots;
        if (object['length']) gpu['Длина'] = object['length'] + ' мм';
        if (object.width) gpu['Ширина'] = object.width + ' мм';
        if (object.height) gpu['Высота'] = object.height + ' мм';
    
        return gpu;
    };

    const makeMotherboardInfoObject = (object) => {
        const motherboard = {};
        
        if (object.socket) motherboard['Сокет'] = object.socket;
        if (object.formFactor) motherboard['Форм-фактор'] = object.formFactor;
        if (object.chipset) motherboard['Чипсет'] = object.chipset;
        if (object.ramType) motherboard['Тип памяти'] = object.ramType;
        if (object.ramSlots) motherboard['Количество слотов для памяти'] = object.ramSlots;
        if (object.maxRamCapacity) motherboard['Максимальный объем памяти'] = object.maxRamCapacity + ' ГБ';
        if (object.sataQuantity) motherboard['Количество SATA'] = object.sataQuantity;
        if (object.m2Quantity) motherboard['Количество M.2'] = object.m2Quantity;
        if (object.pcie16Quantity) motherboard['Количество PCIe 16x'] = object.pcie16Quantity;
    
        return motherboard;
    };

    const makeCpuAirCoolingObject = (object) => {
        const cpuFan = {};
        
        if (object.sockets) cpuFan['Поддерживаемые сокеты'] = JSON.parse(object.sockets).join(', ');
        if (object.fansQuantity) cpuFan['Количество вентиляторов'] = object.fansQuantity;
        if (object.fanSize) cpuFan['Размер вентилятора'] = object.fanSize;
        if (object.tdp) cpuFan['Максимальный TDP'] = object.tdp + ' Вт';
        if (object.backlight) cpuFan['Подсветка'] = object.backlight;
        if (object.height) cpuFan['Высота'] = object.height + ' мм';
        if (object.fanSpeed) cpuFan['Скорость вентилятора'] = object.fanSpeed;
        if (object.airFlow) cpuFan['Воздушный поток'] = object.airFlow + ' CFM';
        if (object.maxNoiseLevel) cpuFan['Максимальный уровень шума'] = object.maxNoiseLevel + ' дБ';
        if (object.connector) cpuFan['Разъем'] = object.connector;
    
        return cpuFan;
    };

    const makeCpuLiquidCoolingObject = (object) => {
        const cpuFan = {};
        
        if (object.sockets) cpuFan['Поддерживаемые сокеты'] = JSON.parse(object.sockets).join(', ');
        if (object.fansQuantity) cpuFan['Количество вентиляторов'] = object.fansQuantity;
        if (object.fanSize) cpuFan['Размер вентилятора'] = object.fanSize;
        if (object.tdp) cpuFan['Максимальный TDP'] = object.tdp + ' Вт';
        if (object.backlight) cpuFan['Подсветка'] = object.backlight;
        if (object['length']) cpuFan['Длина'] = object['length'] + ' мм';
        if (object.width) cpuFan['Ширина'] = object.width + ' мм';
        if (object.height) cpuFan['Высота'] = object.height + ' мм';
        if (object.fanSpeed) cpuFan['Скорость вентилятора'] = object.fanSpeed;
        if (object.airFlow) cpuFan['Воздушный поток'] = object.airFlow + ' СFM';
        if (object.maxNoiseLevel) cpuFan['Максимальный уровень шума'] = object.maxNoiseLevel + ' дБ';
        if (object.connector) cpuFan['Разъем'] = object.connector;
    
        return cpuFan;
    };

    const makeRamObject = (object) => {
        const ram = {};
        
        if (object.type) ram['Тип'] = object.type;
        if (object.frequency) ram['Частота'] = object.frequency + ' МГц';
        if (object.capacity) ram['Объем'] = object.capacity + ' ГБ';
    
        return ram;
    };

    const makeSsdObject = (object) => {
        const ssd = {};
        
        if (object.formFactor) ssd['Форм-фактор'] = object.formFactor;
        if (object.capacity) ssd['Объем'] = object.capacity;
        if (object.flashMemoryType) ssd['Тип флеш-памяти'] = object.flashMemoryType;
        if (object.controllerType) ssd['Тип контроллера'] = object.controllerType;
        if (object.writeVelocity) ssd['Скорость записи'] = object.writeVelocity + ' МБ/с';
        if (object.readVelocity) ssd['Скорость чтения'] = object.readVelocity + ' МБ/с';
        if (object.randomWriteSpeed) ssd['Случайная скорость записи'] = object.randomWriteSpeed + ' IOPS';
        if (object.connectionType) ssd['Тип подключения'] = object.connectionType;
        if (object.mtbfTime) ssd['MTBF'] = object.mtbfTime;
        if (object.maxTemperature) ssd['Максимальная температура'] = object.maxTemperature;
    
        return ssd;
    };

    const makePsuObject = (object) => {
        const psu = {};
        
        if (object.power) psu['Мощность'] = object.power + ' Вт';
        if (object.formFactor) psu['Форм-фактор'] = object.formFactor;
        if (object.pfc) psu['PFC'] = object.pfc;
        if (object.coolingSystem) psu['Система охлаждения'] = object.coolingSystem;
        if (object.mbConnector) psu['Разъем для материнской платы'] = object.mbConnector;
        if (object.cpu4Plus4Quantity) psu['Количество 4+4 pin для CPU'] = object.cpu4Plus4Quantity;
        if (object.gpu6Plus2Quantity) psu['Количество 6+2 pin для GPU'] = object.gpu6Plus2Quantity;
        if (object.sataQuantity) psu['Количество SATA'] = object.sataQuantity;
        if (object.certificate) psu['Сертификат'] = object.certificate;
        if (object.modular) psu['Модульный'] = object.modular;
    
        return psu;
    };

    const makeCaseObject = (object) => {
        const caseInfo = {};
        
        if (object.maxCpuCoolerHeight) caseInfo['Максимальная высота кулера'] = object.maxCpuCoolerHeight + ' мм';
        if (object.maxGpuLength) caseInfo['Максимальная длина GPU'] = object.maxGpuLength + ' мм';
        if (object.maxLiquidCoolingLength) caseInfo['Максимальная длина жидкостного охлаждения'] = object.maxLiquidCoolingLength + ' мм';
        if (object.hddSlotsQuantity) caseInfo['Количество слотов для HDD'] = object.hddSlotsQuantity;
        if (object.ssdSlotsQuantity) caseInfo['Количество слотов для SSD'] = object.ssdSlotsQuantity;
        if (object.extensionSlotsQuantity) caseInfo['Количество расширительных слотов'] = object.extensionSlotsQuantity;
        if (object.length) caseInfo['Длина'] = object.length + ' мм';
        if (object.width) caseInfo['Ширина'] = object.width + ' мм';
        if (object.height) caseInfo['Высота'] = object.height + ' мм';
        if (object.weight) caseInfo['Вес'] = object.weight + ' кг';
        if (object.possibleFormFactors) caseInfo['Поддерживаемые форм-факторы мат.плат'] = JSON.parse(object.possibleFormFactors).join(', ');
    
        return caseInfo;
    };

    const makeFanObject = (object) => {
        const fan = {};
        
        if (object.fanSize) fan['Размер вентилятора'] = object.fanSize;
        if (object.backlight) fan['Подсветка'] = object.backlight;
        if (object.fanSpeed) fan['Скорость вентилятора'] = object.fanSpeed;
        if (object.airFlow) fan['Воздушный поток'] = object.airFlow + ' CFM';
        if (object.maxNoiseLevel) fan['Максимальный уровень шума'] = object.maxNoiseLevel + ' дБ';
    
        return fan;
    };

    const makePeripheryObject = (object) => {
        const periphery = {};
        
        if (object?.characteristics) {
            const characteristics = JSON.parse(object?.characteristics);
            Object.entries(characteristics).forEach(([key, value]) => {
                periphery[key] = value;
            });
        }
    
        return periphery;
    };

    const makePartInfoObject = ([type, object]) => {
        switch (type) {
            case 'cpu': return makeCpuInfoObject(object)
            case 'gpu': return makeGpuInfoObject(object)
            case 'motherboard': return makeMotherboardInfoObject(object)
            case 'cpuAirCooling': return makeCpuAirCoolingObject(object)
            case 'cpuLiquidCooling': return makeCpuLiquidCoolingObject(object)
            case 'ram': return makeRamObject(object)
            case 'ssd': return makeSsdObject(object)
            case 'psu': return makePsuObject(object)
            case 'cases': return makeCaseObject(object)
            case 'fan': return makeFanObject(object)
            case 'periphery': return makePeripheryObject(object)
        }
    }
    
    const transformParts = (data) => {
        
        const partsArray = []

        data.forEach(element => {
            const part = {}

            for (const key in element) {

                if(element[key] != null && element[key] !== ''){
                    part[key] = element[key]
                }
               
            }
            partsArray.push(part)

        });
        return partsArray
    }

    const transformPart = (part) => {
        
        const newPart = {}
        for (const key in part) {
            if(part[key] != null && part[key] !== ''){
                newPart[key] = part[key]
            }
        }
        return newPart
    }

    const makePartEntityObject = ({data, isEditForm = false, part = null, selectedCategory, selectedType, selectedPartition}) => {
        
        console.log(data)

        if(selectedCategory === 'Периферия'){
            return makePeripheryEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
        }
        else if(selectedCategory === 'Комплектующие'){
            switch(selectedType){
                case 'Процессор': return makeCpuEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Видеокарта': return makeGpuEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Материнская плата': return makeMotherboardEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Охлаждение': {
                        if(data?.cpuFanType === 'Воздушное') return makeCpuAirCoolingEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                        if(data?.cpuFanType === 'Жидкостное') return makeCpuLiquidCoolingEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)}
                case 'Оперативная память': return makeRamEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'SSD накопитель': return makeSsdEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Блок питания': return makePsuEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Корпус': return makeCaseEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
                case 'Вентилятор': return makeFanEntityObject(data, isEditForm, part, selectedCategory, selectedType, selectedPartition)
            }
        }
    }

    const fullPartObject = ({object,data,isEditForm,category,type,partition,part}) => {
        if(isEditForm) object.partId = part.partId
        object.name = data.name
        object.price = data.price
        object.category = category
        object.type = type
        object.partition = partition
        object.description = data.description
        object.image = '/uploads/' + data.name.toLowerCase().replace(/\s/g, '-') + '.jpg'
        object.remainingQuantity = Number(data.remainingQuantity)
    }

    const makePeripheryEntityObject = (data, isEditForm, part, category, type, partition) => {

        const object = {
            periphery: {
                "characteristics": {}
            }
        }
        fullPartObject({object,data, isEditForm, category, type,partition, part})
        const characteristics = {}
        for(const key in data){
            if(key.includes('key')){
                console.log(data[key],  data['value' + '/'+ key.split('/')[1]])
                characteristics[data[key]] = data['value' + '/'+ key.split('/')[1]]
            }
        }
        object.periphery.characteristics = JSON.stringify(characteristics)
        if(isEditForm) object.periphery.peripheryId = part.periphery.peripheryId

        return object
    }

    const makeCpuEntityObject = (data, isEditForm, part, category, type, partition) => {

        const object = {}
        fullPartObject({object,data, isEditForm, category, type,partition, part})

        object.cpu = {
            "baseFrequency": data.baseFrequency,
            "boostFrequency": data.boostFrequency,
            "cpuCores": data.cpuCores,
            "cpuThreads": data.cpuThreads,
            "maxRamCapacity": data.maxRamCapacity,
            "tdp": data.tdp,
            "cacheL1": data.cachel1,
            "cacheL2": data.cachel2,
            "cacheL3": data.cachel3,
            "socket": data.socket,
            "techProcess": data.techProcess,
            "ramType": JSON.stringify(data.ramType.replace(/\s/g, '').split(',')),
        }
        if(isEditForm) object.cpu.cpuId = part.cpu.cpuId

        return object
    }

    const makeGpuEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.gpu = {
            "baseFrequency": data.baseFrequency,
            "boostFrequency": data.boostFrequency,
            "vramCapacity": data.vramCapacity,
            "vramType": data.vramType,
            "busWidth": data.busWidth,
            "hdmi": data.hdmi,
            "displayPort": data.displayPort,
            "cuda": data.cuda,
            "powerConnector": data.powerConnector,
            "minPowerUnit": data.minPowerUnit,
            "fans": data.fans,
            "extensionSlots": data.extensionSlots,
            "length": data[length],
            "width": data.width,
            "height": data.height,
        };
    
        if (isEditForm) object.gpu.gpuId = part.gpu.gpuId;
    
        return object;
    };

    const makeMotherboardEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.motherboard = {
            "socket": data.socket,
            "formFactor": data.formFactor,
            "chipset": data.chipset,
            "ramType": data.ramType,
            "ramSlots": data.ramSlots,
            "maxRamCapacity": data.maxRamCapacity,
            "sataQuantity": data.sataQuantity,
            "m2Quantity": data.m2Quantity,
            "pcie16Quantity": data.pcie16Quantity,
        };
    
        if (isEditForm) object.motherboard.motherboardId = part.motherboard.motherboardId;
    
        return object;
    };

    const makeCpuAirCoolingEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.cpuAirCooling = {
            fansQuantity: data.fansQuantity,
            fanSize: data.fanSize,
            tdp: data.tdp,
            backlight: data.backlight,
            height: data.height,
            fanSpeed: data.fanSpeed,
            airFlow: data.airFlow,
            maxNoiseLevel: data.maxNoiseLevel,
            connector: data.connector,
            sockets: JSON.stringify(data.sockets.replace(/\s/g, '').split(',')),
        };
    
        if (isEditForm) {
            object.cpuAirCooling.cpuAirCoolingId = part.cpuAirCooling.cpuAirCoolingId;
        }
    
        return object;
    };

    const makeCpuLiquidCoolingEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.cpuLiquidCooling = {
            fansQuantity: data.fansQuantity,
            fanSize: data.fanSize,
            tdp: data.tdp,
            backlight: data.backlight,
            length: data[length],
            width: data.width,
            height: data.height,
            fanSpeed: data.fanSpeed,
            airFlow: data.airFlow,
            maxNoiseLevel: data.maxNoiseLevel,
            connector: data.connector,
            sockets: JSON.stringify(data.sockets.replace(/\s/g, '').split(',')) ,
        };
    
        if (isEditForm) {
            object.cpuLiquidCooling.cpuLiquidCoolingId = part.cpuLiquidCooling.cpuLiquidCoolingId;
        }
    
        return object;
    };

    const makeRamEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.ram = {
            type: data.type,
            frequency: data.frequency,
            capacity: data.capacity,
        };
    
        if (isEditForm) {
            object.ram.ramId = part.ram.ramId;
        }
    
        return object;
    };

    const makeSsdEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.ssd = {
            formFactor: data.formFactor,
            capacity: data.capacity,
            flashMemoryType: data.flashMemoryType,
            controllerType: data.controllerType,
            writeVelocity: data.writeVelocity,
            readVelocity: data.readVelocity,
            randomWriteSpeed: data.randomWriteSpeed,
            connectionType: data.connectionType,
            mtbfTime: data.mtbfTime,
            maxTemperature: data.maxTemperature,
        };
    
        if (isEditForm) {
            object.ssd.ssdId = part.ssd.ssdId;
        }
    
        return object;
    };

    const makePsuEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.psu = {
            power: data.power,
            formFactor: data.formFactor,
            pfc: data.pfc,
            coolingSystem: data.coolingSystem,
            mbConnector: data.mbConnector,
            cpu4Plus4Quantity: data.cpu4Plus4Quantity,
            gpu6Plus2Quantity: data.gpu6Plus2Quantity,
            sataQuantity: data.sataQuantity,
            certificate: data.certificate,
            modular: data.modular,
        };
    
        if (isEditForm) {
            object.psu.psuId = part.psu.psuId;
        }
    
        return object;
    };

    const makeCaseEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.cases = {
            maxCpuCoolerHeight: data.maxCpuCoolerHeight,
            maxGpuLength: data.maxGpuLength,
            maxLiquidCoolingLength: data.maxLiquidCoolingLength,
            hddSlotsQuantity: data.hddSlotsQuantity,
            ssdSlotsQuantity: data.ssdSlotsQuantity,
            extensionSlotsQuantity: data.extensionSlotsQuantity,
            length: data[length],
            width: data.width,
            height: data.height,
            weight: data.weight,
            possibleFormFactors: JSON.stringify(data.possibleFormFactors.replace(/\s/g, '').split(',')) ,
        };
    
        if (isEditForm) {
            object.cases.caseId = part.cases.caseId;
        }
    
        return object;
    };

    const makeFanEntityObject = (data, isEditForm, part, category, type, partition) => {
        const object = {};
        fullPartObject({ object, data, isEditForm, category, type, partition, part });
    
        object.fan = {
            fanSize: data.fanSize,
            backlight: data.backlight,
            fanSpeed: data.fanSpeed,
            airFlow: data.airFlow,
            maxNoiseLevel: data.maxNoiseLevel,
        };
    
        if (isEditForm) {
            object.fan.fanId = part.fan.fanId;
        }
    
        return object;
    };

    return {makePartInfoObject, transformParts, transformPart, makePartEntityObject}
};

export default useParts;