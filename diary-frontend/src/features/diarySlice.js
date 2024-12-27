import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createDiary, updateDiary, deleteDiary, getDiaryById, getDiaries } from '../api/diaryApi'

// 일기 등록 Thunk
export const createDiaryThunk = createAsyncThunk('diary/createDiary', async (diaryData, { rejectWithValue }) => {
   try {
      const response = await createDiary(diaryData)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 등록 실패')
   }
})

// 일기 수정
export const updateDiaryThunk = createAsyncThunk('diary/updateDiary', async (data, { rejectWithValue }) => {
   try {
      const { id, diaryData } = data
      const response = await updateDiary(id, diaryData)
      return response.data.diary
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 수정 실패')
   }
})

// 일기 삭제
export const deleteDiaryThunk = createAsyncThunk('diary/deleteDiary', async (id, { rejectWithValue }) => {
   try {
      // eslint-disable-next-line
      const response = await deleteDiary(id)
      return id // 삭제 성공 후 삭제된 일기의 id만 반환
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 삭제 실패')
   }
})

// 특정 일기 가져오기
export const fetchDiaryByIdThunk = createAsyncThunk('diary/fetchDiaryById', async (id, { rejectWithValue }) => {
   try {
      const response = await getDiaryById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '일기 불러오기 실패')
   }
})

// 전체 일기 리스트 가져오기
export const fetchDiariesThunk = createAsyncThunk('diary/fetchDiaries', async (page, { rejectWithValue }) => {
   try {
      const response = await getDiaries(page)
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
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 일기 등록
      builder
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
      // 일기 리스트 불러오기
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
      // 특정 일기 불러오기
      builder
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
      // 일기 삭제
      builder
         .addCase(deleteDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 일기 수정
      builder
         .addCase(updateDiaryThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateDiaryThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(updateDiaryThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default diarySlice.reducer
