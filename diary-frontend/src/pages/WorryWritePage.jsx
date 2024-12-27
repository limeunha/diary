import React, { useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const WorryWritePage = () => {
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')
   const navigate = useNavigate()

   const handleSubmit = () => {
      if (!title || !content) {
         alert('제목과 내용을 모두 작성해주세요.')
         return
      }

      const newWorry = {
         title: title,
         content: content,
         id: new Date().getTime(),
      }

      const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
      savedWorries.push(newWorry)

      localStorage.setItem('worries', JSON.stringify(savedWorries))

      setTitle('')
      setContent('')

      alert('고민이 저장되었습니다.')
   }

   return (
      <Container
         sx={{
            paddingTop: '20px',
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
      >
         <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
            다이어리 작성하기
         </Typography>

         <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
         <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

         <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            sx={{
               display: 'block',
               marginLeft: 'auto',
               marginRight: 'auto',
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
               backgroundColor: 'white',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginTop: '20px',
               borderRadius: '8px',
               width: '150px',
               height: '50px',
            }}
         >
            저장하기
         </Button>

         <Button
            variant="outlined"
            onClick={() => navigate('/worry-list')}
            sx={{
               display: 'block',
               marginLeft: 'auto',
               marginRight: 'auto',
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginTop: '20px',
               borderRadius: '8px',
               width: '150px',
               height: '50px',
            }}
         >
            목록으로 가기
         </Button>
      </Container>
   )
}

export default WorryWritePage
