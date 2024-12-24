import React, { useState } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'

const DiaryForm = ({ onSave }) => {
   const [diaryText, setDiaryText] = useState('')

   const handleDiaryChange = (event) => {
      setDiaryText(event.target.value)
   }
   const handleSaveDiary = () => {
      if (diaryText.trim() === '') {
         alert('일기를 작성해주세요!')
         return
      }
      onSave(diaryText)
      setDiaryText('')
   }

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
         <Typography variant="h4" gutterBottom align="center">
            비밀일기
         </Typography>

         <TextField label="내용을 적어주세요" multiline rows={10} fullWidth value={diaryText} onChange={handleDiaryChange} sx={{ marginBottom: '20px' }} />
         <Button variant="contained" color="primary" onClick={handleSaveDiary} fullWidth>
            저장
         </Button>
      </Container>
   )
}

export default DiaryForm
