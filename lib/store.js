import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import analyticsReducer from './slices/analyticsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    analytics: analyticsReducer,
  },
})

