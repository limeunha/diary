import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiaryByIdThunk, updateDiaryThunk } from '../features/diarySlice'
import DiaryForm from '../components/diary/DiaryForm'

const DiaryEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { diary, loading, error } = useSelector((state) => state.diary)

   useEffect(() => {
      dispatch(fetchDiaryByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = (formData) => {
      dispatch(updateDiaryThunk({ id, diaryData: formData }))
         .unwrap()
         .then(() => {
            window.location.href = '/'
         })
         .catch((error) => {
            console.error('다이어리 수정 중 오류 발생:', error)
            alert('다이어리 수정에 실패했습니다.')
         })
   }

   return (
      <div>
         {loading && <p>로딩 중...</p>}
         {error && <p>에러 발생: {error}</p>}
         <DiaryForm onSubmit={handleSubmit} initialDiary={diary} />
      </div>
   )
}

export default DiaryEditPage
