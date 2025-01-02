import React, { useState, useEffect } from 'react'
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const DiaryEditPage = () => {
   const { id } = useParams()
   const navigate = useNavigate()

   const [diary, setDiary] = useState(null)
   const [title, setTitle] = useState('')
   const [date, setDate] = useState('')
   const [diaryText, setDiaryText] = useState('')
   const [image, setImage] = useState(null)
   const [loading, setLoading] = useState(true)

   // 다양한 날짜 형식을 yyyy-MM-dd로 변환하는 함수
   const formatDate = (date) => {
      if (date && date.includes('.')) {
         const [year, month, day] = date.split('.').map((part) => part.trim())
         return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }

      if (date && date.includes('/')) {
         const [year, month, day] = date.split('/').map((part) => part.trim())
         return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }

      if (date && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
         return date
      }

      return ''
   }

   useEffect(() => {
      setLoading(true)
      const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || []
      const currentDiary = storedDiaries.find((diary) => diary.id === parseInt(id))

      if (currentDiary) {
         setDiary(currentDiary)
         setTitle(currentDiary.title || '')
         setDate(formatDate(currentDiary.date) || '')
         setDiaryText(currentDiary.text || '')
         setImage(currentDiary.image || null)
      } else {
         alert('일기를 찾을 수 없습니다.')
         navigate('/diary-list')
      }
      setLoading(false)
   }, [id, navigate])

   const handleTitleChange = (e) => setTitle(e.target.value)
   const handleDateChange = (e) => setDate(e.target.value)
   const handleDiaryChange = (e) => setDiaryText(e.target.value)
   const handleImageChange = (e) => setImage(e.target.files[0])

   const handleSaveEdit = () => {
      if (diaryText.trim() === '') {
         alert('일기 내용을 작성해주세요.')
         return
      }

      const updatedDiary = {
         ...diary,
         title,
         date,
         text: diaryText,
         image: image || diary.image, // image가 없으면 기존 이미지를 유지
      }

      const storedDiaries = JSON.parse(localStorage.getItem('diaries')) || []
      const updatedDiaries = storedDiaries.map((d) => (d.id === diary.id ? updatedDiary : d))
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries))

      navigate('/diary-list', { state: { diaries: updatedDiaries } })
   }

   if (loading) {
      return (
         <Container
            maxWidth="md"
            sx={{
               paddingTop: '100px',
               paddingBottom: '20px',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '100%',
            }}
         >
            <CircularProgress />
         </Container>
      )
   }

   if (!diary) return null

   return (
      <Container
         maxWidth="md"
         sx={{
            paddingTop: '100px',
            paddingBottom: '20px',
            backgroundImage: 'url(/images/Rudolph.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundAttachment: 'fixed',
         }}
      >
         <Typography
            variant="h4"
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
               marginBottom: '20px',
            }}
         >
            일기 수정
         </Typography>

         <Box
            sx={{
               width: '100%',
               maxWidth: '600px',
               padding: '20px',
               borderRadius: '8px',
               backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
         >
            <TextField
               label="제목"
               variant="outlined"
               fullWidth
               value={title}
               onChange={handleTitleChange}
               sx={{
                  marginBottom: '20px',
                  '& .MuiInputBase-input': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiFormLabel-root': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiOutlinedInput-root': {
                     borderRadius: '12px',
                     '& fieldset': {
                        borderColor: 'red',
                     },
                     '&:hover fieldset': {
                        borderColor: 'red',
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'red',
                     },
                  },
               }}
            />

            <TextField
               type="date"
               value={date}
               onChange={handleDateChange}
               fullWidth
               sx={{
                  marginBottom: '20px',
                  '& .MuiInputBase-input': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiFormLabel-root': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiOutlinedInput-root': {
                     borderRadius: '12px',
                     '& fieldset': {
                        borderColor: 'red',
                     },
                     '&:hover fieldset': {
                        borderColor: 'red',
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'red',
                     },
                  },
               }}
            />

            <TextField
               label="비밀내용"
               multiline
               rows={10}
               fullWidth
               value={diaryText}
               onChange={handleDiaryChange}
               sx={{
                  marginBottom: '20px',
                  '& .MuiInputBase-input': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiFormLabel-root': {
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     fontSize: '20px',
                     color: 'green',
                  },
                  '& .MuiOutlinedInput-root': {
                     borderRadius: '12px',
                     '& fieldset': {
                        borderColor: 'red',
                     },
                     '&:hover fieldset': {
                        borderColor: 'red',
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'red',
                     },
                  },
               }}
            />

            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               style={{
                  display: 'block',
                  margin: '20px 0',
               }}
            />

            <Button
               onClick={handleSaveEdit}
               variant="outlined"
               color="primary"
               sx={{
                  width: '100%',
                  height: '50px',
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
                  backgroundColor: 'white',
                  border: '1px solid red',
                  borderRadius: '12px',
               }}
            >
               수정 저장
            </Button>
         </Box>
      </Container>
   )
}

export default DiaryEditPage
