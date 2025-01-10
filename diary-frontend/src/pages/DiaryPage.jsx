import React, { useCallback } from 'react'
import { Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DiaryForm from '../components/diary/DiaryForm'
import { createDiaryThunk } from '../features/diarySlice'

const DiaryPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (diaryData) => {
         console.log('Received diary data: ', diaryData)

         dispatch(createDiaryThunk(diaryData))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 에러: ', error)
               alert('게시물 등록에 실패했습니다.')
            })
      },
      [dispatch]
   )

   // 다이어리 목록 보기
   const handleGoToDiaryList = () => {
      navigate('/diary-list')
   }

   return (
      <Container
         maxWidth="md"
         sx={{
            paddingTop: '40px',
            paddingBottom: '40px',
            backgroundImage: 'url(/images/Rudolph.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
         }}
      >
         <DiaryForm onSubmit={handleSubmit} />

         <Button
            variant="outlined"
            color="primary"
            onClick={handleGoToDiaryList}
            fullWidth
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               backgroundColor: 'white',
               color: 'green',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginTop: '20px',
               marginBottom: '20px',
               height: '56px',
               borderRadius: '8px',
            }}
         >
            저장된 일기 목록
         </Button>
      </Container>
   )
}

export default DiaryPage
