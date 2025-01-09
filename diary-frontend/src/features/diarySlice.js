import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createDiary, updateDiary, deleteDiary, getDiaryById, getDiaries } from '../api/diaryApi'

// 게시물 등록 Thunk
export const createDiaryThunk = createAsyncThunk('diaries/createDiary', async (diaryData, { rejectWithValue }) => {
   try {
      const response = await createDiary(diaryData)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '등록 실패')
   }
})

// 게시물 수정
export const updateDiaryThunk = createAsyncThunk('diaries/updateDiary', async (data, { rejectWithValue }) => {
   try {
      const { id, diaryData } = data
      const response = await updateDiary(id, diaryData)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '수정 실패')
   }
})

// 게시물 삭제
export const deleteDiaryThunk = createAsyncThunk('diaries/deleteDiary', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteDiary(id)
      return id
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '삭제 실패')
   }
})

// 특정 게시물 가져오기
export const fetchDiaryByIdThunk = createAsyncThunk('diaries/fetchDiaryById', async (id, { rejectWithValue }) => {
   try {
      const response = await getDiaryById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 전체 게시물 리스트 가져오기
export const fetchDiariesThunk = createAsyncThunk('diaries/fetchDiaries', async (page, { rejectWithValue }) => {
   try {
      const response = await getDiaries(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const diarySlice = createSlice({
   name: 'diaries',
   initialState: {
      diaries: [],
      diary: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 게시물 등록
         .addCase(createDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(createDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 리스트 불러오기
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
         // 특정 게시물 불러오기
         .addCase(fetchDiaryByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchDiaryByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.diary = action.payload.diary
         })
         .addCase(fetchDiaryByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 삭제
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
         // 게시물 수정
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
   },
})

export default diarySlice.reducer
