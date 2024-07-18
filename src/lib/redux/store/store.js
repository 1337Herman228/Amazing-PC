'use client';

import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../slices/cartSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart:cartSlice
    },
  })
}