import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// 일기 등록
export const createDiaryThunk = createAsyncThunk('diary/createDiary', async (diaryData, { rejectWithValue }) => {
   try {
      const response = await axios.post('/api/diaries', diaryData)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 등록 실패')
   }
})

// 일기 불러오기
export const fetchDiaryByIdThunk = createAsyncThunk('diary/fetchDiaryById', async (id, { rejectWithValue }) => {
   try {
      const response = await axios.get(`/api/diaries/${id}`)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 불러오기 실패')
   }
})

// 일기 수정
export const updateDiaryThunk = createAsyncThunk('diary/updateDiary', async ({ id, updatedDiary }, { rejectWithValue }) => {
   try {
      const response = await axios.put(`/api/diaries/${id}`, updatedDiary)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 수정 실패')
   }
})

// 일기 삭제
export const deleteDiaryThunk = createAsyncThunk('diary/deleteDiary', async (id, { rejectWithValue }) => {
   try {
      await axios.delete(`/api/diaries/${id}`)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 삭제 실패')
   }
})

// 전체 일기 리스트 불러오기
export const fetchDiariesThunk = createAsyncThunk('diary/fetchDiaries', async (page, { rejectWithValue }) => {
   try {
      const response = await axios.get(`/api/diaries?page=${page}`)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 리스트 불러오기 실패')
   }
})

const diarySlice = createSlice({
   name: 'diary',
   initialState: {
      diaries: [],
      diary: null,
      loading: false,
      error: null,
      pagination: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 일기 등록 처리
      builder
         .addCase(createDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diaries.push(action.payload)
         })
         .addCase(createDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 일기 불러오기 처리
      builder
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
            state.error = action.payload
         })

      // 일기 수정 처리
      builder
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
            state.error = action.payload
         })

      // 일기 삭제 처리
      builder
         .addCase(deleteDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diaries = state.diaries.filter((diary) => diary.id !== action.payload)
         })
         .addCase(deleteDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      // 전체 일기 리스트 불러오기 처리
      builder
         .addCase(fetchDiariesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchDiariesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diaries = action.payload.diaries
            state.pagination = action.payload.pagination
         })
         .addCase(fetchDiariesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default diarySlice.reducer
