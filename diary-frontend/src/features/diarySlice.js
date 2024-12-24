import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   diaries: [],
   loading: false,
   error: null,
}

const diarySlice = createSlice({
   name: 'diary',
   initialState,
   reducers: {
      addDiary: (state, action) => {
         state.diaries.push(action.payload)
      },
      setLoading: (state, action) => {
         state.loading = action.payload
      },
      setError: (state, action) => {
         state.error = action.payload
      },
      resetDiaries: (state) => {
         state.diaries = []
      },
   },
})

export const { addDiary, setLoading, setError, resetDiaries } = diarySlice.actions

export default diarySlice.reducer
