import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import diaryReducer from '../features/diarySlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      diary: diaryReducer,
   },
})

export default store
