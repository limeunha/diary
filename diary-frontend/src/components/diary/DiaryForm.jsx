import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'

const DiaryForm = ({ onSave, initialDiary }) => {
   const [diaryText, setDiaryText] = useState('')
   const [image, setImage] = useState(null)
   const [imageName, setImageName] = useState('')
   const [date, setDate] = useState('')
   const [title, setTitle] = useState('')

   useEffect(() => {
      if (initialDiary) {
         setDiaryText(initialDiary.text || '')
         setDate(initialDiary.date || '')
         setImage(initialDiary.image || null)
         setImageName(initialDiary.imageName || '')
         setTitle(initialDiary.title || '')
      } else {
         setDiaryText('')
         setDate('')
         setImage(null)
         setImageName('')
         setTitle('')
      }
   }, [initialDiary])

   const handleDiaryChange = (event) => setDiaryText(event.target.value)
   const handleDateChange = (event) => setDate(event.target.value)
   const handleTitleChange = (event) => setTitle(event.target.value)

   const handleSaveDiary = () => {
      if (diaryText.trim() === '') {
         alert('일기를 작성해주세요!')
         return
      }
      if (date === '') {
         alert('날짜를 선택해주세요!')
         return
      }

      onSave(title, diaryText, date, image, imageName)

      setDiaryText('')
      setTitle('')
      setDate('')
      setImage(null)
      setImageName('')
   }

   const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setImage(imageUrl)
         setImageName(file.name)
      }
   }

   const handleDeleteImage = () => {
      setImage(null)
      setImageName('')
   }

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px', color: 'green', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
         <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
            나만의 비밀일기
         </Typography>

         <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            error={false}
            helperText=""
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-input': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '&:hover .MuiInputBase-input': {
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
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
               },
            }}
         />

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
               '&:hover .MuiInputBase-input': {
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
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
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
            error={false}
            helperText=""
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-input': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '&:hover .MuiInputBase-input': {
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
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
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
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
            }}
         />

         {image && (
            <div style={{ position: 'relative', textAlign: 'center', marginTop: '10px', padding: '10px', borderRadius: '8px' }}>
               <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDeleteImage}
                  style={{
                     position: 'absolute',
                     top: '10px',
                     right: '10px',
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     backgroundColor: 'white',
                     color: 'green',
                     border: '1px solid red',
                     fontSize: '16px',
                     zIndex: 1,
                  }}
               >
                  이미지 삭제
               </Button>
               <img src={image} alt="Selected" style={{ width: '200px', height: 'auto', borderRadius: '8px', display: 'block', margin: '0 auto' }} />
               <Typography variant="body2" sx={{ color: 'green', marginTop: '10px' }}>
                  {imageName}
               </Typography>
            </div>
         )}

         <Button
            variant="outlined"
            onClick={handleSaveDiary}
            fullWidth
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               backgroundColor: 'white',
               color: 'green',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginBottom: '20px',
               height: '56px',
            }}
         >
            일기 저장
         </Button>
      </Container>
   )
}

export default DiaryForm
