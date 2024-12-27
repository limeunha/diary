import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   worries: [],
}

const worrySlice = createSlice({
   name: 'worry',
   initialState,
   reducers: {
      addWorry: (state, action) => {
         console.log(action.payload)
         state.worries.push(action.payload)
      },
      removeWorry: (state, action) => {
         console.log('Removing worry with id:', action.payload)
         state.worries = state.worries.filter((worry) => worry.id !== action.payload)
      },
   },
})

export const { addWorry, removeWorry } = worrySlice.actions
export default worrySlice.reducer
