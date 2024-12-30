import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, updatePost, deletePost, getPostById, getPosts } from '../api/diaryApi'
import axios from 'axios'

// 일기 불러오기
export const fetchDiaryByIdThunk = createAsyncThunk('diary/fetchDiaryById', async (id) => {
   try {
      const response = await axios.get(`/api/diaries/${id}`)
      return response.data
      console.log(fetchDiaryByIdThunk)
   } catch (error) {
      console.error('일기 불러오기 실패:', error)
      throw new Error('Diary not found or server error')
   }
})

// 일기 업데이트
export const updateDiaryThunk = createAsyncThunk('diary/updateDiary', async ({ id, updatedDiary }) => {
   try {
      const response = await axios.put(`/api/diaries/${id}`, updatedDiary)
      return response.data
   } catch (error) {
      console.error('일기 업데이트 실패:', error)
      throw new Error('Failed to update diary')
   }
})

const diarySlice = createSlice({
   name: 'diary',
   initialState: {
      diary: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 일기 불러오기 처리
         .addCase(fetchDiaryByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchDiaryByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diary = action.payload
         })
         .addCase(fetchDiaryByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })

         // 일기 업데이트 처리
         .addCase(updateDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diary = action.payload
         })
         .addCase(updateDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export default diarySlice.reducer
