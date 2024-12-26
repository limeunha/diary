import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'

const DiaryForm = ({ onSave }) => {
   const [diaryText, setDiaryText] = useState('')
   const [image, setImage] = useState(null)
   const [date, setDate] = useState('')

   const handleDiaryChange = (event) => {
      setDiaryText(event.target.value)
   }

   const handleDateChange = (event) => {
      setDate(event.target.value)
   }

   const handleSaveDiary = () => {
      if (diaryText.trim() === '') {
         alert('일기를 작성해주세요!')
         return
      }
      if (date === '') {
         alert('날짜를 선택해주세요!')
         return
      }

      onSave(diaryText, date)

      setDiaryText('')
      setDate('')
      setImage(null)
   }

   const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         const imageUrl = URL.createObjectURL(file)
         setImage(imageUrl)
      }
   }

   const handleDeleteImage = () => {
      setImage(null)
   }

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px', color: 'green', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
         <Typography variant="h4" gutterBottom align="center" style={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
            나만의 비밀일기
         </Typography>

         {/* 날짜 입력 필드 */}
         <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
               },
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
            label="비밀일기"
            multiline
            rows={10}
            fullWidth
            value={diaryText}
            onChange={handleDiaryChange}
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
               },
               '& .MuiInputBase-input': {
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
               '& .MuiFormLabel-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '& .MuiInputLabel-root.Mui-focused': {
                  color: 'green',
               },
            }}
         />
         {/* 이미지 업로드 */}
         <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block', margin: '20px 0', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }} />

         {/* 이미지 삭제 버튼 */}
         {image && (
            <div style={{ position: 'relative', textAlign: 'center', marginTop: '10px' }}>
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

               <img src={image} alt="Selected" style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
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
