import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   worries: [],
}

const worrySlice = createSlice({
   name: 'worry',
   initialState,
   reducers: {
      addWorry: (state, action) => {
         state.worries.push(action.payload)
      },
      removeWorry: (state, action) => {
         state.worries = state.worries.filter((worry) => worry.id !== action.payload)
      },
   },
})

export const { addWorry, removeWorry } = worrySlice.actions
export default worrySlice.reducer
