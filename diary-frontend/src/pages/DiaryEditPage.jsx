import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiaryByIdThunk, updateDiaryThunk } from '../features/diarySlice'
import DiaryForm from '../components/diary/DiaryForm'
import { CircularProgress, Typography, Container } from '@mui/material'

const DiaryEditPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const diary = useSelector((state) => state.diary.diary)
   const loading = useSelector((state) => state.diary.loading)
   const error = useSelector((state) => state.diary.error)

   useEffect(() => {
      if (id) {
         dispatch(fetchDiaryByIdThunk(id))
      }
   }, [dispatch, id])

   const handleSave = (title, diaryText, date, image, imageName) => {
      if (id) {
         dispatch(updateDiaryThunk({ id, diaryData: { title, diaryText, date, image, imageName } }))
            .unwrap()
            .then(() => {
               navigate('/diary-list')
            })
            .catch((error) => {
               console.error('일기 수정 중 오류 발생:', error)
               alert('일기 수정에 실패했습니다.')
            })
      }
   }

   if (loading) return <CircularProgress />

   if (error) return <Typography color="error">에러 발생: {error}</Typography>

   if (!diary) {
      return (
         <Typography variant="h6" color="textSecondary">
            일기 데이터를 불러오는 중입니다. 잠시만 기다려 주세요.
         </Typography>
      )
   }

   return (
      <Container maxWidth="md">
         <Typography variant="h4" gutterBottom align="center">
            일기 수정
         </Typography>
         <DiaryForm onSave={handleSave} initialDiary={diary} />
      </Container>
   )
}

export default DiaryEditPage
