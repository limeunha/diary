import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DiaryForm from '../components/diary/DiaryForm'

const DiaryPage = () => {
   const [diaries, setDiaries] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || []
      setDiaries(storedDiaries)
   }, [])

   const handleSaveDiary = (diaryText) => {
      if (diaryText.trim() === '') {
         alert('일기 내용을 작성해주세요.')
         return
      }

      const newDiary = {
         id: diaries.length + 1,
         text: diaryText,
         date: new Date().toLocaleDateString(),
      }

      const updatedDiaries = [...diaries, newDiary]

      setDiaries(updatedDiaries)

      localStorage.setItem('diaries', JSON.stringify(updatedDiaries))

      alert('일기가 성공적으로 저장되었습니다!')
   }

   const handleGoToDiaryList = () => {
      navigate('/diary-list', { state: { diaries } })
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
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
            }}
         >
            비밀일기 작성
         </Typography>

         <Box sx={{ width: '100%', maxWidth: '600px', padding: '20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <DiaryForm onSave={handleSaveDiary} />
         </Box>

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
            저장된 일기 목록 보러 가기
         </Button>
      </Container>
   )
}

export default DiaryPage
