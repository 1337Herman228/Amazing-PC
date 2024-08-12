'use client'

import { useEffect, useState } from 'react'
import './Configurator.scss'
import FormListItem from './form-list-item/FormListItem'
import Summation from './summation/Summation'
import NavTree from './nav-tree/NavTree'

     // default_checked - checked по умолчанию (по дефолту стоит в true, даже если поля в объекте нет)
     // когда это значение стоит в false и элемент радиокнопка, то при выборе появляется красный крестик, нажатие на который уюирает выбор кнопки

     // multiselect:'true' - чекбоксы, если поля нет, либо false - то радиокнопки

     // max_quantity:5 - количество в select'e чекбокса
     
     // category - отвечает за название раздела, в который будет помещен товар в навигационном дереве

const components_list = [
     {
          id: 1,
          name: 'Видеокарта',
          type: 'gpu',

          // multiselect:false,
          // default_checked:null,
          // max_quantity:5,

          category:'Комплектующие',
          partition:[
               'RTX 4060',
               'RTX 4070',
               'RTX 4080',
               'RTX 4090',
          ],
          items:[
               {
                    id: 11,
                    partition: 'RTX 4060',
                    name: 'Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]',
                    price:'3000',
                    img:'/components/gpu/palit-rtx-4060-ti-dual.png',
               },
               {
                    id: 12,
                    partition: 'RTX 4060',
                    name: 'MSI GeForce RTX 4060 Ti GAMING SLIM [8GB, 4352 CUDA]',
                    price:'3700',
                    img:'/components/gpu/msi-rtx-4060-ti-gaming-slim.png',
               },
               {
                    id: 21,
                    partition: 'RTX 4070',
                    name: 'MSI GeForce RTX 4070 GAMING SLIM WHITE [12GB, 5888 CUDA]',
                    price:'4200',
                    img:'/components/gpu/msi-rtx-4070-gaming-slim-white.png',
               },
               {
                    id: 22,
                    partition: 'RTX 4070',
                    name: 'Palit GeForce RTX 4070 SUPER JetStream [12GB, 7160 CUDA]',
                    price:'4800',
                    img:'/components/gpu/msi-rtx-4070-gaming-slim-white.png',
               },
               {
                    id: 31,
                    partition: 'RTX 4080',
                    name: 'Palit GeForce RTX 4080 SUPER JetStream [16GB, 10240 CUDA]',
                    price:'5400',
                    img:'/components/gpu/palit-rtx-4080-super-jetstream.png',
               },
               {
                    id: 32,
                    partition: 'RTX 4080',
                    name: 'Palit GeForce RTX 4080 SUPER JetStream [16GB, 10240 CUDA]',
                    price:'5400',
                    img:'/components/gpu/msi-rtx-4070-gaming-slim-white.png',
               },
               {
                    id: 33,
                    partition: 'RTX 4080',
                    name: 'Palit GeForce RTX 4080 SUPER JetStream [16GB, 10240 CUDA]',
                    price:'5400',
                    img:'/components/gpu/palit-rtx-4080-super-jetstream.png',
               },
               {
                    id: 41,
                    partition: 'RTX 4090',
                    name: 'Palit GeForce RTX 4090 SUPER JetStream [16GB, 10240 CUDA]',
                    price:'5400',
                    img:'/components/gpu/msi-rtx-4060-ti-gaming-slim.png',
               },
          ]


     },
     {
          id: 2,
          name: 'Процессор',
          type: 'cpu',
          category:'Комплектующие',
          partition:[
               'Intel Core 12th',
               'Intel Core 14th',
          ],
          items:[
               {
                    id: 11,
                    partition: 'Intel Core 12th',
                    name: 'Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]',
                    price:'1500',
                    img:'/components/cpu/intel-core-i5-12th.jpg',
               },
               {
                    id: 21,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i5-14400F [до 4.7GHz, 10 ядер]',
                    price:'1900',
                    img:'/components/cpu/intel-core-i5-14th.jpg',
               },
               {
                    id: 22,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i5-14500 [до 5.0GHz, 14 ядер]',
                    price:'1900',
                    img:'/components/cpu/intel-core-i5-14th.jpg',
               },
               {
                    id: 23,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i5-14600KF [до 5.3GHz, 14 ядер]',
                    price:'2300',
                    img:'/components/cpu/intel-core-i5-14th-unlocked.jpg',
               },
               {
                    id: 24,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i7-14700F [до 5.4GHz, 20 ядер]',
                    price:'2800',
                    img:'/components/cpu/intel-core-i7-14th.jpg',
               },
               {
                    id: 25,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i7-14700KF [до 5.6GHz, 20 ядер]',
                    price:'2900',
                    img:'/components/cpu/intel-core-i7-14th-unlocked.jpg',
               },
               {
                    id: 26,
                    partition: 'Intel Core 14th',
                    name: 'Intel® Core™ i9-14900KF [до 6.0GHz, 24 ядра]',
                    price:'3800',
                    img:'/components/cpu/intel-core-i9-14th-unlocked.jpg',
               },
          ]


     },
     {
          id: 3,
          name: 'Материнская плата',
          type: 'motherboard',
          category:'Комплектующие',
          partition:[
               'Intel B760',
               'Intel Z790',
          ],
          items:[
               {
                    id: 11,
                    partition: 'Intel B760',
                    name: 'MSI PRO B760M-A [DDR4, Wi-Fi]',
                    price:'400',
                    img:'/components/mb/msi-pro-b760m-awifi-314x177.jpg',
               },
               {
                    id: 12,
                    partition: 'Intel B760',
                    name: 'MSI PRO B760M-A [DDR5, Wi-Fi]',
                    price:'450',
                    img:'/components/mb/msi-pro-b760m-awifi-314x177.jpg',
               },
               {
                    id: 13,
                    partition: 'Intel B760',
                    name: 'MSI PRO B760-P [DDR4, Wi-Fi]',
                    price:'450',
                    img:'/components/mb/msi-pro-b760-p-wifi-314x177.jpg',
               },
               {
                    id: 14,
                    partition: 'Intel B760',
                    name: 'MSI B760M GAMING PLUS [DDR5, Wi-Fi]',
                    price:'550',
                    img:'/components/mb/msi-b760m-gaming-plus-314x177.jpg',
               },
               {
                    id: 15,
                    partition: 'Intel B760',
                    name: 'MSI PRO B760-VC WIFI IV [DDR5, Wi-Fi]',
                    price:'590',
                    img:'/components/mb/msi-pro-b760-vc-wifi-iv-314x177.jpg',
               },
               {
                    id: 16,
                    partition: 'Intel B760',
                    name: 'MSI MAG B760 TOMAHAWK [DDR5, Wi-Fi]',
                    price:'700',
                    img:'/components/mb/msi-mag-b760-tomahawk-314x177.jpg',
               },
               {
                    id: 17,
                    partition: 'Intel B760',
                    name: 'MSI MPG B760I EDGE [DDR5, Wi-Fi]',
                    price:'800',
                    img:'/components/mb/msi-mpg-b760i-edge-314x177.jpg',
               },
               {
                    id: 21,
                    partition: 'Intel Z790',
                    name: 'MSI PRO Z790-A MAX [DDR5, Wi-Fi]',
                    price:'900',
                    img:'/components/mb/msi-z790-a-pro-a-max-314x177.jpg',
               },
               {
                    id: 22,
                    partition: 'Intel Z790',
                    name: 'MSI Z790 GAMING PLUS [DDR5, Wi-Fi]',
                    price:'950',
                    img:'/components/mb/msi-z790-gaming-plus-wifi-314x177.jpg',
               },
               {
                    id: 23,
                    partition: 'Intel Z790',
                    name: 'MSI MAG Z790 TOMAHAWK MAX [DDR5, Wi-Fi]',
                    price:'1050',
                    img:'/components/mb/msi-mag-z790-tomahawk-max-314x177.jpg',
               },
               {
                    id: 24,
                    partition: 'Intel Z790',
                    name: 'MSI MPG Z790 CARBON II [DDR5, Wi-Fi]',
                    price:'1150',
                    img:'/components/mb/msi-mpg-z790-carbon-ii-314x177.jpg',
               },
               {
                    id: 25,
                    partition: 'Intel Z790',
                    name: 'ASUS ROG STRIX Z790-A GAMING II [DDR5, Wi-Fi]',
                    price:'1250',
                    img:'/components/mb/asus-rog-strix-z790-a-gaming-ii-314x177.jpg',
               },
               {
                    id: 26,
                    partition: 'Intel Z790',
                    name: 'ASUS ROG STRIX Z790-F GAMING II [DDR5, Wi-Fi]',
                    price:'1350',
                    img:'/components/mb/asus-rog-strix-z790-f-gaming-2-314x177.jpg',
               },
               {
                    id: 27,
                    partition: 'Intel Z790',
                    name: 'ASUS ROG STRIX Z790-E GAMING II [DDR5, Wi-Fi]',
                    price:'1450',
                    img:'/components/mb/asus-rog-strix-z790-e-gaming-ii-314x177.jpg',
               },
               {
                    id: 28,
                    partition: 'Intel Z790',
                    name: 'ASUS ROG MAXIMUS Z790 FORMULA [DDR5, Wi-Fi]',
                    price:'1650',
                    img:'/components/mb/asus-rog-maimus-formula-z790-314x177.jpg',
               },
          ]


     },
     {
          id: 4,
          name: 'Охлаждение',
          type: 'cpu_fan',
          category:'Комплектующие',
          partition:[
               'Asus',
               'Deepcool',
               'Lian li',
               'Msi',
               'Thermaltake',
          ],
          items:[
               {
                    id: 11,
                    partition: 'Asus',
                    name: 'ASUS ROG RYUO III 360 White',
                    price:'450',
                    img:'/components/cpu-fan/asus-rog-ryuo-iii-360-argb-white-314x177.jpg',
               },
               {
                    id: 12,
                    partition: 'Asus',
                    name: 'ASUS ROG RYUO III 360 Black',
                    price:'450',
                    img:'/components/cpu-fan/asus-rog-ryuo-iii-360-argb-black-314x177.jpg',
               },
               {
                    id: 21,
                    partition: 'Deepcool',
                    name: 'DeepCool AG400 BK ARGB',
                    price:'70',
                    img:'/components/cpu-fan/deepcool-ag400-argb-black-314x177.jpg',
               },
               {
                    id: 22,
                    partition: 'Deepcool',
                    name: 'DeepCool AG500 BK ARGB',
                    price:'80',
                    img:'/components/cpu-fan/deepcool-ag500-argb-314x177.jpg',
               },
               {
                    id: 23,
                    partition: 'Deepcool',
                    name: 'DeepCool AK500 WH',
                    price:'90',
                    img:'/components/cpu-fan/deepcool-ak500-wh-314x177.jpg',
               },
               {
                    id: 24,
                    partition: 'Deepcool',
                    name: 'DeepCool LT520 WH',
                    price:'200',
                    img:'/components/cpu-fan/deepcool-lt520-wh-314x177.jpg',
               },
               {
                    id: 25,
                    partition: 'Deepcool',
                    name: 'DeepCool LS520 WH',
                    price:'190',
                    img:'/components/cpu-fan/hyperpc-watercooling-240-ls-white-314x177.jpg',
               },
               {
                    id: 31,
                    partition: 'Lian li',
                    name: 'Lian Li Galahad II Trinity 360 White',
                    price:'320',
                    img:'/components/cpu-fan/lian-li-galahad-ii-trinity-360-white-314x177.jpg',
               },
               {
                    id: 32,
                    partition: 'Lian li',
                    name: 'Lian Li Galahad II Trinity Performance 360 White',
                    price:'380',
                    img:'/components/cpu-fan/lian-li-galahad-ii-trinity-360-performance-white-314x177.jpg',
               },
               {
                    id: 41,
                    partition: 'Msi',
                    name: 'MSI MAG CORELIQUID E240',
                    price:'280',
                    img:'/components/cpu-fan/msi-mag-coreliquid-e240-black-314x177.jpg',
               },
               {
                    id: 42,
                    partition: 'Msi',
                    name: 'MSI MEG CORELIQUID S360',
                    price:'400',
                    img:'/components/cpu-fan/msi-coreliquid-s360-314x177.jpg',
               },
               {
                    id: 51,
                    partition: 'Thermaltake',
                    name: 'Thermaltake TOUGHLIQUID Ultra 360',
                    price:'500',
                    img:'/components/cpu-fan/thermaltake-toughliquid-ultra-360-314x177.jpg',
               },
          ]
     },
     {
          id: 5,
          name: 'Оперативная память',
          type: 'ram',
          category:'Комплектующие',
          partition:[
               '16 ГБ',
               '32 ГБ',
               '64 ГБ',
               '96 ГБ',
               '128 ГБ',
               '256 ГБ',
               '512 ГБ',
          ],
          items:[
               {
                    id: 11,
                    partition: '16 ГБ',
                    name: '16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]',
                    price:'220',
                    img:'/components/ram/kingston-fury-beast-ddr4-rgb-2x-314x177.jpg',
               },
               {
                    id: 21,
                    partition: '32 ГБ',
                    name: '32GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x16GB]',
                    price:'400',
                    img:'/components/ram/kingston-fury-beast-ddr4-rgb-2x-314x177.jpg',
               },
               {
                    id: 22,
                    partition: '32 ГБ',
                    name: '32GB TEAMGROUP T-Force Delta RGB White [DDR5, 5600MHz, 2x16GB]',
                    price:'450',
                    img:'/components/ram/teamgroup-t-force-delta-rgb-white-314x177.jpg',
               },
               {
                    id: 23,
                    partition: '32 ГБ',
                    name: '32GB G.SKILL TRIDENT Z5 RGB White [DDR5, 6400MHz, 2x16GB]',
                    price:'450',
                    img:'/components/ram/g-skil-trident-z-ddr5-rgb-314x177.jpg',
               },
               {
                    id: 24,
                    partition: '32 ГБ',
                    name: '32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]',
                    price:'460',
                    img:'/components/ram/teamgroup-t-force-delta-rgb-black-314x177.jpg',
               },
               {
                    id: 25,
                    partition: '32 ГБ',
                    name: '32GB TEAMGROUP T-Create Expert Black [DDR5, 6400MHz, 2x16GB]',
                    price:'480',
                    img:'/components/ram/teamgroup-t-create-expert-black-314x177.jpg',
               },
               {
                    id: 26,
                    partition: '32 ГБ',
                    name: '32GB TEAMGROUP T-Create Expert White [DDR5, 6400MHz, 2x16GB]',
                    price:'480',
                    img:'/components/ram/teamgroup-t-create-expert-white-314x177.jpg',
               },
               {
                    id: 31,
                    partition: '64 ГБ',
                    name: '64GB TEAMGROUP T-Force Delta RGB White [DDR5, 6000MHz, 2x32GB]',
                    price:'850',
                    img:'/components/ram/teamgroup-t-force-delta-rgb-white-314x177.jpg',
               },
               {
                    id: 32,
                    partition: '64 ГБ',
                    name: '64GB TEAMGROUP T-Create Expert Black [DDR5, 6400MHz, 2x32GB]',
                    price:'900',
                    img:'/components/ram/teamgroup-t-create-expert-black-314x177.jpg',
               },
               {
                    id: 33,
                    partition: '64 ГБ',
                    name: '64GB TEAMGROUP T-Create Expert White [DDR5, 6400MHz, 2x32GB]',
                    price:'900',
                    img:'/components/ram/teamgroup-t-create-expert-white-314x177.jpg',
               },
               {
                    id: 41,
                    partition: '96 ГБ',
                    name: '96GB G.SKILL TRIDENT Z5 RGB [DDR5, 6400MHz, 2x48GB]',
                    price:'1400',
                    img:'/components/ram/g.skill-tridient-z5-rgb-314x177.jpg',
               },
               {
                    id: 42,
                    partition: '96 ГБ',
                    name: '96GB TEAMGROUP T-Create Expert Black [DDR5, 6800MHz, 2x48GB]',
                    price:'1420',
                    img:'/components/ram/teamgroup-t-create-expert-black-314x177.jpg',
               },
               {
                    id: 51,
                    partition: '128 ГБ',
                    name: '128GB Samsung ECC [DDR5, 4800MHz, 4x32GB]',
                    price:'1900',
                    img:'/components/ram/samsung-ddr5-ecc-314x177.jpg',
               },
               {
                    id: 61,
                    partition: '256 ГБ',
                    name: '256GB Samsung ECC [DDR4, 3200MHz, 4x64GB]',
                    price:'2700',
                    img:'/components/ram/samsung-ddr5-ecc-314x177.jpg',
               },
               {
                    id: 62,
                    partition: '256 ГБ',
                    name: '256GB Samsung ECC [DDR5, 4800MHz, 4x64GB]',
                    price:'3700',
                    img:'/components/ram/samsung-ddr5-ecc-314x177.jpg',
               },
               {
                    id: 71,
                    partition: '512 ГБ',
                    name: '512GB Samsung ECC [DDR4, 3200MHz, 8x64GB]',
                    price:'5000',
                    img:'/components/ram/samsung-ddr5-ecc-314x177.jpg',
               },
               {
                    id: 72,
                    partition: '512 ГБ',
                    name: '512GB Samsung ECC [DDR5, 4800MHz, 8x64GB]',
                    price:'6000',
                    img:'/components/ram/samsung-ddr5-ecc-314x177.jpg',
               },
          ]
     },
     {
          id: 6,
          name: 'SSD накопитель',
          type: 'ssd',
          category:'Комплектующие',
          multiselect:true,
          default_checked:true,
          max_quantity:5,
          partition:[
               '500 ГБ',
               '1 ТБ',
               '2 ТБ',
               '4 ТБ',
          ],
          items:[
               {
                    id: 11,
                    partition: '500 ГБ',
                    name: '500GB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    price:'300',
                    img:'/components/ssd/adata-legend-800-314x177.jpg',
               },
               {
                    id: 21,
                    partition: '1 ТБ',
                    name: '1TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    price:'400',
                    img:'/components/ssd/adata-legend-800-314x177.jpg',
               },
               {
                    id: 22,
                    partition: '1 ТБ',
                    name: '1TB Samsung 970 EVO Plus [3500MB/s, Gen3]',
                    price:'470',
                    img:'/components/ssd/samsung_evo_plus_970-314x177.jpg',
               },
               {
                    id: 23,
                    partition: '1 ТБ',
                    name: '1TB Samsung 990 PRO [7450MB/s, Gen4]',
                    price:'600',
                    img:'/components/ssd/samsung-990-pro-314x177.jpg',
               },
               {
                    id: 24,
                    partition: '1 ТБ',
                    name: '1TB MSI SPATIUM M570 [9500MB/s, Gen5]',
                    price:'700',
                    img:'/components/ssd/msi-spatum-m570-314x177.jpg',
               },
               {
                    id: 31,
                    partition: '2 ТБ',
                    name: '2TB ADATA LEGEND 800 [3500MB/s, Gen4]',
                    price:'700',
                    img:'/components/ssd/adata-legend-800-314x177.jpg',
               },
               {
                    id: 32,
                    partition: '2 ТБ',
                    name: '2TB Samsung 970 EVO Plus [3500MB/s, Gen3]',
                    price:'1000',
                    img:'/components/ssd/samsung_evo_plus_970-314x177.jpg',
               },
               {
                    id: 33,
                    partition: '2 ТБ',
                    name: '2TB Samsung 990 PRO [7450MB/s, Gen4]',
                    price:'1100',
                    img:'/components/ssd/samsung-990-pro-314x177.jpg',
               },
               {
                    id: 34,
                    partition: '2 ТБ',
                    name: '2TB MSI SPATIUM M570 [10000MB/s, Gen5]',
                    price:'1200',
                    img:'/components/ssd/msi-spatum-m570-314x177.jpg',
               },
               {
                    id: 41,
                    partition: '4 ТБ',
                    name: '4TB Samsung 990 PRO [7450MB/s, Gen4]',
                    price:'2100',
                    img:'/components/ssd/samsung-990-pro-314x177.jpg',
               },
          ]
     },
     {
          id: 7,
          name: 'Блок питания',
          type: 'power_supply',
          category:'Комплектующие',
          partition:[
               'От 500W',
               'От 700W',
               'От 800W',
               'От 1000W',
          ],
          items:[
               {
                    id: 11,
                    partition: 'От 500W',
                    name: '550W DeepCool PK550D [80+ Bronze]',
                    price:'160',
                    img:'/components/pow-sup/deepcool-pk550d-314x177.jpg',
               },
               {
                    id: 12,
                    partition: 'От 500W',
                    name: '650W DeepCool PL650D [80+ Bronze]',
                    price:'220',
                    img:'/components/pow-sup/deepcool-pl650-750d-314x177.jpg',
               },
               {
                    id: 13,
                    partition: 'От 500W',
                    name: '650W DeepCool PK650D [80+ Bronze]',
                    price:'230',
                    img:'/components/pow-sup/deepcool-pk550d-314x177.jpg',
               },
               {
                    id: 14,
                    partition: 'От 500W',
                    name: '650W DeepCool PN650M [80+ Gold]',
                    price:'260',
                    img:'/components/pow-sup/deepcool-pl650-750d-314x177.jpg',
               },
               {
                    id: 21,
                    partition: 'От 700W',
                    name: '750W DeepCool PK750D [80+ Bronze]',
                    price:'300',
                    img:'/components/pow-sup/deepcool-pk550d-314x177.jpg',
               },
               {
                    id: 22,
                    partition: 'От 700W',
                    name: '750W DeepCool PN750M [80+ Gold]',
                    price:'330',
                    img:'/components/pow-sup/deepcool-pl650-750d-314x177.jpg',
               },
               {
                    id: 23,
                    partition: 'От 700W',
                    name: '750W MSI MPG A750G [80+ Gold]',
                    price:'390',
                    img:'/components/pow-sup/msi-mpg-a850g-pcie5-314x177.jpg',
               },
               {
                    id: 24,
                    partition: 'От 700W',
                    name: '750W Cooler Master V750 SFX [80+ Gold]',
                    price:'600',
                    img:'/components/pow-sup/cooler-master-v750-sfx-314x177.jpg',
               },
               {
                    id: 31,
                    partition: 'От 800W',
                    name: '850W DeepCool PN850M [80+ Gold]',
                    price:'500',
                    img:'/components/pow-sup/deepcool-pk550d-314x177.jpg',
               },
               {
                    id: 32,
                    partition: 'От 800W',
                    name: '850W DeepCool PX850G [80+ Gold]',
                    price:'530',
                    img:'/components/pow-sup/deepcool-pl650-750d-314x177.jpg',
               },
               {
                    id: 33,
                    partition: 'От 800W',
                    name: '850W MSI MAG A850GL [80+ Gold',
                    price:'800',
                    img:'/components/pow-sup/msi-mag-z850gl-314x177.jpg',
               },
               {
                    id: 34,
                    partition: 'От 800W',
                    name: '850W DeepCool PX850G WH [80+ Gold]',
                    price:'830',
                    img:'/components/pow-sup/deepcool-px850g-wht-314x177.jpg',
               },
               {
                    id: 41,
                    partition: 'От 1000W',
                    name: '1350W Thermaltake Toughpower GF3 [80+ Gold]',
                    price:'1200',
                    img:'/components/pow-sup/thermaltake-toighpower-gf3-314x177.jpg',
               },
               {
                    id: 42,
                    partition: 'От 1000W',
                    name: '1600W Super Flower Leadex [80+ Platinum]',
                    price:'1900',
                    img:'/components/pow-sup/super-flower-leadex-platinum-1600w-314x177.jpg',
               },
               {
                    id: 43,
                    partition: 'От 1000W',
                    name: '1300W MSI MEG Ai1300P PCIE5 [80+ Platinum]',
                    price:'1500',
                    img:'/components/pow-sup/msi-meg-ai1300p-314x177.jpg',
               },
               {
                    id: 44,
                    partition: 'От 1000W',
                    name: '1600W ASUS ROG THOR [80+ Titanium]',
                    price:'2300',
                    img:'/components/pow-sup/asus-rog-thor-1600w-titianum-314x177.jpg',
               },
          ]
     },
     {
          id: 8,
          name: 'Корпус',
          type: 'case',
          category:'Комплектующие',
          default_checked: false,
          partition:[
               'Asus',
               'Deepcool',
               'HyperPC',
               'Jonsbo',
               'Lian Li',
               'Montech',
          ],
          items:[
               {
                    id: 11,
                    partition: 'Asus',
                    name: 'ASUS TUF GAMING GT502 White',
                    price:'500',
                    img:'/components/case/asus-tuf-gt520-white-314x177.jpg',
               },
               {
                    id: 12,
                    partition: 'Asus',
                    name: 'ASUS ROG Strix Helios RGB',
                    price:'700',
                    img:'/components/case/-rog-strix-helios-rgb-black-314x177.jpg',
               },
               {
                    id: 21,
                    partition: 'Deepcool',
                    name: 'DeepCool CC360 WH ARGB',
                    price:'220',
                    img:'/components/case/deepcool-cc360-argb-white-314x177.jpg',
               },
               {
                    id: 22,
                    partition: 'Deepcool',
                    name: 'DeepCool CC360 ARGB',
                    price:'220',
                    img:'/components/case/deepcool-cc360-argb-314x177.jpg',
               },
               {
                    id: 23,
                    partition: 'Deepcool',
                    name: 'DeepCool CH360 WH',
                    price:'240',
                    img:'/components/case/deepcool-ch360-white-314x177.jpg',
               },
               {
                    id: 24,
                    partition: 'Deepcool',
                    name: 'DeepCool CH560 WH',
                    price:'290',
                    img:'/components/case/deepcool-ch560-white-314x177.jpg',
               },
               {
                    id: 31,
                    partition: 'HyperPC',
                    name: 'HYPERPC CYBER Black',
                    price:'600',
                    img:'/components/case/hpc-cyber-standard-black-paint-314x177.jpg',
               },
               {
                    id: 32,
                    partition: 'HyperPC',
                    name: 'HYPERPC CYBER Gray',
                    price:'600',
                    img:'/components/case/hpc-cyber-standard-gray-paint-314x177.jpg',
               },
               {
                    id: 41,
                    partition: 'Jonsbo',
                    name: 'JONSBO D40 Silver',
                    price:'300',
                    img:'/components/case/jonsbo-d40-silver-314x177.jpg',
               },
               {
                    id: 51,
                    partition: 'Lian Li',
                    name: 'Lian Li LANCOOL 205 Mesh Black',
                    price:'300',
                    img:'/components/case/lian-li-lancool-205-black-314x177.jpg',
               },
               {
                    id: 52,
                    partition: 'Lian Li',
                    name: 'Lian Li LANCOOL 205 Mesh White',
                    price:'300',
                    img:'/components/case/lian-li-lancool-205-mesh-white-314x177.jpg',
               },
               {
                    id: 53,
                    partition: 'Lian Li',
                    name: 'Lian Li O11 Vision Black',
                    price:'500',
                    img:'/components/case/lian-li-o11-vision-black-314x177.jpg',
               },
               {
                    id: 54,
                    partition: 'Lian Li',
                    name: 'Lian Li O11 Vision White',
                    price:'500',
                    img:'/components/case/lian-li-o11-vision-white-314x177.jpg',
               },
               {
                    id: 55,
                    partition: 'Lian Li',
                    name: 'Lian Li O11 Dynamic EVO RGB Black',
                    price:'600',
                    img:'/components/case/lian-li-dynamic-evo-rgb-black-314x177.jpg',
               },
               {
                    id: 56,
                    partition: 'Lian Li',
                    name: 'Lian Li O11 Dynamic EVO RGB White',
                    price:'600',
                    img:'/components/case/lian-li-dynamic-evo-rgb-white-314x177.jpg',
               },
               {
                    id: 61,
                    partition: 'Montech',
                    name: 'Montech KING 95 Black',
                    price:'600',
                    img:'/components/case/montech-king-95-black-314x177.jpg',
               },
               {
                    id: 62,
                    partition: 'Montech',
                    name: 'Montech KING 95 White',
                    price:'600',
                    img:'/components/case/montech-king-95-white-314x177.jpg',
               },
               {
                    id: 63,
                    partition: 'Montech',
                    name: 'Montech KING 95 PRO Black',
                    price:'730',
                    img:'/components/case/montech-king-95-pro-black-314x177.jpg',
               },
               {
                    id: 64,
                    partition: 'Montech',
                    name: 'Montech KING 95 PRO White',
                    price:'730',
                    img:'/components/case/montech-king-95-pro-white-314x177.jpg',
               },
          ]
     },
     {
          id: 9,
          name: 'Вентиляторы',
          category:'Комплектующие',
          type: 'fans',
          multiselect: true,
          default_checked:false,
          max_quantity:20,
          partition:[
               '120x120 MM',
               '140x140 MM',
          ],
          items:[
               {
                    id: 11,
                    partition: '120x120 MM',
                    name: 'Thermalright TL-B12',
                    price:'30',
                    img:'/components/fan/thermaltake-b12-314x177.jpg',
               },
               {
                    id: 12,
                    partition: '120x120 MM',
                    name: 'Montech AX 120 PWM Black',
                    price:'35',
                    img:'/components/fan/montech-ax-120-black-314x177.jpg',
               },
               {
                    id: 13,
                    partition: '120x120 MM',
                    name: 'Montech AX 120 PWM White',
                    price:'35',
                    img:'/components/fan/montech-ax-120-white-314x177.jpg',
               },
               {
                    id: 14,
                    partition: '120x120 MM',
                    name: 'Arctic P12 PWM PST ARGB White',
                    price:'40',
                    img:'/components/fan/arctic-p12-pwm-pst-argb-white-314x177.jpg',
               },
               {
                    id: 15,
                    partition: '120x120 MM',
                    name: 'Arctic P12 PWM PST ARGB Black',
                    price:'40',
                    img:'/components/fan/arctic-p12-pwm-pst-argb-black-314x177.jpg',
               },
               {
                    id: 16,
                    partition: '120x120 MM',
                    name: 'Lian Li UNI FAN AL V2 120 White',
                    price:'60',
                    img:'/components/fan/lian-li-uni-fan-al-120-white-alt-314x177.jpg',
               },
               {
                    id: 17,
                    partition: '120x120 MM',
                    name: 'Lian Li UNI FAN AL V2 120 Black',
                    price:'60',
                    img:'/components/fan/lian-li-uni-fan-al-120-black-alt-314x177.jpg',
               },
               {
                    id: 18,
                    partition: '120x120 MM',
                    name: 'Lian Li UNI FAN SL V2 120 White',
                    price:'75',
                    img:'/components/fan/lian-li-uni-fan-sl-v2-120-white-alt-314x177.jpg',
               },
               {
                    id: 21,
                    partition: '140x140 MM',
                    name: 'Arctic P14 PWM PST ARGB White',
                    price:'45',
                    img:'/components/fan/arctic-p12-pwm-pst-argb-white-314x177.jpg',
               },
               {
                    id: 22,
                    partition: '140x140 MM',
                    name: 'Thermaltake TOUGHFAN 14 White',
                    price:'45',
                    img:'/components/fan/thermaltake-toughfan-14-white-314x177.jpg',
               },
               {
                    id: 23,
                    partition: '140x140 MM',
                    name: 'Lian Li UNI FAN AL V2 140 White',
                    price:'70',
                    img:'/components/fan/lian-li-uni-fan-al-120-white-alt-314x177.jpg',
               },
               {
                    id: 24,
                    partition: '140x140 MM',
                    name: 'Lian Li UNI FAN AL V2 140 Black',
                    price:'70',
                    img:'/components/fan/lian-li-uni-fan-al-120-black-alt-314x177.jpg',
               },
               {
                    id: 25,
                    partition: '140x140 MM',
                    name: 'Lian Li UNI FAN SL V2 140 White',
                    price:'85',
                    img:'/components/fan/lian-li-uni-fan-sl-v2-120-white-alt-314x177.jpg',
               },
          ]
     },
     {
          id: 10,
          name: 'Монитор',
          type: 'display',
          category:'Переферия',
          multiselect: true,
          default_checked:false,
          max_quantity:3,
          partition:[
               '24″',
               '27″',
               '32″',
               '34″',
               '49″',
          ],
          items:[
               {
                    id: 21,
                    partition: '24″',
                    name: 'LG UltraGear 24GN65R',
                    price:300,
                    img:'/components/monitor/lg-ultragear-24gn65r-b-314x177.jpg',
               },
               {
                    id: 22,
                    partition: '24″',
                    name: 'Dell Alienware AW2523HF',
                    price:800,
                    img:'/components/monitor/dell-alienware-aw2523hf-314x177.jpg',
               },
               {
                    id: 31,
                    partition: '27″',
                    name: 'LG UltraGear 27GR75Q',
                    price:400,
                    img:'/components/monitor/lg-ultragear-27gr75q-b-314x177.jpg',
               },
               {
                    id: 32,
                    partition: '27″',
                    name: 'LG UltraGear 27GP95R',
                    price:900,
                    img:'/components/monitor/lg-ultragear-27gp95r-314x177.jpg',
               },
               {
                    id: 33,
                    partition: '27″',
                    name: 'ASUS ROG SWIFT PG27AQDM',
                    price:1350,
                    img:'/components/monitor/asus-rog-swift-pg27aqdm-314x177.jpg',
               },
               {
                    id: 34,
                    partition: '27″',
                    name: 'MSI MPG 271QRX QD-OLED',
                    price:1650,
                    img:'/components/monitor/msi-mpg-271qrx-qd-oled-314x177.jpg',
               },
               {
                    id: 41,
                    partition: '32″',
                    name: 'LG UltraGear 32GQ950',
                    price:1800,
                    img:'/components/monitor/lg-ultragear-32gq950-b-314x177.jpg',
               },
               {
                    id: 42,
                    partition: '32″',
                    name: 'MSI MPG 321URX QD-OLED',
                    price:2030,
                    img:'/components/monitor/msi-mpg-321urx-qd-oled-314x177.jpg',
               },
               {
                    id: 43,
                    partition: '32″',
                    name: 'LG UltraGear 32GR93U',
                    price:1950,
                    img:'/components/monitor/lg-ultragear-32gr93u-314x177.jpg',
               },
               {
                    id: 51,
                    partition: '34″',
                    name: 'Samsung Odyssey OLED G8 S34BG850SI',
                    price:2400,
                    img:'/components/monitor/samsing-odyssey-oled-g8-s34bg850si-314x177.jpg',
               },
               {
                    id: 52,
                    partition: '34″',
                    name: 'Dell Alienware AW3423DWF',
                    price:2750,
                    img:'/components/monitor/dell-alienware-aw3423dwf-314x177.jpg',
               },
               {
                    id: 61,
                    partition: '49″',
                    name: 'Samsung Odyssey OLED G9 G93SC',
                    price:3300,
                    img:'/components/monitor/samsung-odyssey-oled-g9-g93sc-alt-314x177.jpg',
               },
               
          ]
     },
     {
          id: 11,
          name: 'Мышь',
          type: 'mouse',
          category:'Переферия',
          default_checked: false,
          partition:[
               'Razer',
               'Logitech',
          ],
          items:[
               {
                    id: 11,
                    partition: 'Razer',
                    name: 'Razer Viper',
                    price:200,
                    img:'/components/mouse/razer-viper.jpg',
               },
               {
                    id: 12,
                    partition: 'Razer',
                    name: 'Razer Viper',
                    price:230,
                    img:'/components/mouse/razer-basilisk-v2.jpg',
               },
               {
                    id: 21,
                    partition: 'Logitech',
                    name: 'Logitech G305 Lightspeed Purple',
                    price:180,
                    img:'/components/mouse/logitech-g305-lightspeed-purple.jpg',
               },
          ]
     },


]

const Configurator = () => {

     const [product, setProduct] = useState({});
     console.log('product', product)

     const addItemToProduct = (name, item) => {
          product[`${name}`] = item
          setProduct({...product})
     }

     const makeNavTreeInfoArray = () => {
          const categories = []
          let uniqueCategories;

          components_list.forEach( el =>{
               categories.push(el.category)
          })
          uniqueCategories = categories.filter((item, index) => categories.indexOf(item) === index);
          
          let allItems = []
          components_list.forEach( el =>{
               allItems.push({category: el.category, name: el.name})
          })
          
          return {uniqueCategories, allItems}
     }

     const {uniqueCategories, allItems} = makeNavTreeInfoArray()

     return(
          <>
               <section className='configurator container section-decreased'>
                    <aside className='aside-components-tree hidden-tablet sticky-block'>
                         <NavTree uniqueCategories={uniqueCategories} allItems={allItems}/>
                    </aside>

                    <ul className='components-list'>
                         {components_list.map((item) => 
                              <FormListItem 
                                   addItemToProduct={addItemToProduct}
                                   max_quantity={item?.max_quantity}
                                   default_checked={item?.default_checked}
                                   multiselect={item?.multiselect} 
                                   key={item.id} 
                                   name={item.name} 
                                   type={item.type}
                                   category = {item.category}
                                   partition={item.partition} 
                                   items={item.items}
                              />) 
                         }
                    </ul>

                    <aside className='summation sticky-block'>
                         <Summation product={product} />
                    </aside>
               </section>
          </>
     )
} 

export default Configurator