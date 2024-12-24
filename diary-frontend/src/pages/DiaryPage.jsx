import React, { useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import DiaryForm from '../components/diary/DiaryForm'

const DiaryPage = () => {
   const [diaries, setDiaries] = useState([])

   const handleSaveDiary = (diaryText) => {
      setDiaries([...diaries, { id: diaries.length + 1, text: diaryText, date: new Date().toLocaleDateString() }])
   }

   const handleDeleteDiary = (id) => {
      setDiaries(diaries.filter((diary) => diary.id !== id))
   }

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
         <Typography variant="h4" gutterBottom align="center">
            비밀일기 작성
         </Typography>

         <DiaryForm onSave={handleSaveDiary} />

         <Typography variant="h5" gutterBottom align="center" sx={{ marginTop: '30px' }}>
            비밀일기 저장 목록
         </Typography>

         <List>
            {diaries.map((diary) => (
               <ListItem key={diary.id} sx={{ marginBottom: '10px' }}>
                  <ListItemText primary={diary.text} secondary={`작성일: ${diary.date}`} />
                  <Button onClick={() => handleDeleteDiary(diary.id)} variant="outlined" color="error">
                     삭제
                  </Button>
               </ListItem>
            ))}
         </List>
      </Container>
   )
}

export default DiaryPage
