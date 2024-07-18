'use client';

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items:[
      {
          "img": "/gaming-pc/one.jpg",
          "name": "One Start",
          "price": "5000",
          "description": "Игровая платформа, построенная на базе процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].",
          "link_to_configurator": "/one-start/config",
          "gpu": "Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]",
          "cpu": "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
          "mb": "MSI PRO B760M-A [DDR4, Wi-Fi]",
          "cpu_fan": "DeepCool AG400 BK ARGB",
          "ram": "16GB Kingston FURY Beast RGB [DDR4, 3600MHz, 2x8GB]",
          "ssd": "500GB ADATA LEGEND 800 [3500MB/s, Gen4]",
          "pow_sup": "550W DeepCool PK550D [80+ Bronze]",
          "_case": "DeepCool CC360 ARGB",
          "os": "Microsoft Windows 11 Home OEM",
          "isNotebook": false
      },
      {
          "img": "/gaming-pc/one.jpg",
          "name": "One Max",
          "price": "5900",
          "description": "Геймерская система с процессором Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокартой Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA].",
          "link_to_configurator": "/one-max/config",
          "gpu": "Palit GeForce RTX 4060 Dual [8GB, 3072 CUDA]",
          "cpu": "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
          "mb": "MSI PRO B760M-A [DDR5, Wi-Fi]",
          "cpu_fan": "DeepCool AG400 BK ARGB",
          "ram": "32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]",
          "ssd": "1TB ADATA LEGEND 800 [3500MB/s, Gen4]",
          "pow_sup": "550W DeepCool PK550D [80+ Bronze]",
          "_case": "DeepCool CC360 ARGB",
          "os": "Microsoft Windows 11 Home OEM",
          "isNotebook": false
      },
      {
          "img": "/gaming-pc/one.jpg",
          "name": "One Ultra",
          "price": "6800",
          "description": "Платформа для гейминга в Full HD разрешении, созданная на базе центрального процессора Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер] и видеокарты Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA].",
          "link_to_configurator": "/one-ultra/config",
          "gpu": "Palit GeForce RTX 4060 Ti Dual [8GB, 4352 CUDA]",
          "cpu": "Intel® Core™ i5-12400F [до 4.4GHz, 6 ядер]",
          "mb": "MSI PRO B760M-A [DDR5, Wi-Fi]",
          "cpu_fan": "DeepCool AG400 BK ARGB",
          "ram": "32GB TEAMGROUP T-Force Delta RGB Black [DDR5, 5600MHz, 2x16GB]",
          "ssd": "1TB ADATA LEGEND 800 [3500MB/s, Gen4]",
          "pow_sup": "650W DeepCool PK550D [80+ Bronze]",
          "_case": "DeepCool CC360 ARGB",
          "os": "Microsoft Windows 11 Home OEM",
          "isNotebook": false
      }
  ],
  
  // loading:false,
  // error:false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartItems: (state) => {
      //TODO: получение данных из БД
    },
    addCartItem: (state, action) => {
      state.items.push(action.payload)
    },
    deleteCartItem: (state, action) => {
      state.items.filter(item => item.id !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCartItems, addCartItem, deleteCartItem } = cartSlice.actions

export default cartSlice.reducer

// Define a thunk that dispatches those action creators
// const fetchUsers = () => async (dispatch) => {
//   dispatch(usersLoading())
//   const response = await usersAPI.fetchAll()
//   dispatch(usersReceived(response.data))
// }