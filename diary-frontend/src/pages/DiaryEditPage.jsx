import { useParams } from 'react-router-dom'
import DiaryForm from '../components/diary/DiaryForm'
import { Container } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiaryByIdThunk, updateDiaryThunk } from '../features/diarySlice'

const DiaryEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { diary, loading, error } = useSelector((state) => state.diary)

   useEffect(() => {
      dispatch(fetchDiaryByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (diaryData) => {
         dispatch(updateDiaryThunk({ id, diaryData }))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 수정 중 오류 발생:', error)
               alert('게시물 수정에 실패했습니다.')
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생: {error}</p>

   return (
      <Container maxWidth="md">
         <h1>다이어리 수정</h1>
         {diary && <DiaryForm onSubmit={handleSubmit} initialValues={diary} />}
      </Container>
   )
}

export default DiaryEditPage
