import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import diaryReducer from '../features/diarySlice'
import worryReducer from '../features/worrySlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      diary: diaryReducer,
      worry: worryReducer,
   },
})

export default store
