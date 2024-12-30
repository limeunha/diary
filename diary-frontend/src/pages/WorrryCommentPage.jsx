import React, { useState, useEffect } from 'react'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const WorryCommentPage = () => {
   const { id } = useParams()
   const [worry, setWorry] = useState(null)
   const [comment, setComment] = useState('')
   const navigate = useNavigate()

   useEffect(() => {
      const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
      const currentWorry = savedWorries.find((worry) => worry.id === parseInt(id))

      if (currentWorry) {
         setWorry(currentWorry)
      } else {
         alert('해당 고민을 찾을 수 없습니다.')
         navigate('/worry-list')
      }
   }, [id, navigate])

   const handleCommentChange = (e) => {
      setComment(e.target.value)
   }

   const handleCommentSubmit = () => {
      if (comment.trim() === '') {
         alert('코멘트를 작성해주세요.')
         return
      }

      const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
      const updatedWorry = {
         ...worry,
         comments: [...(worry.comments || []), comment],
      }

      const updatedWorriesList = savedWorries.map((w) => (w.id === parseInt(id) ? updatedWorry : w))
      localStorage.setItem('worries', JSON.stringify(updatedWorriesList))

      setWorry(updatedWorry)
      setComment('')

      alert('코멘트가 성공적으로 추가되었습니다!')
   }

   const handleDeleteComment = (index) => {
      const updatedComments = worry.comments.filter((_, i) => i !== index)
      const updatedWorry = { ...worry, comments: updatedComments }

      const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
      const updatedWorriesList = savedWorries.map((w) => (w.id === parseInt(id) ? updatedWorry : w))
      localStorage.setItem('worries', JSON.stringify(updatedWorriesList))

      setWorry(updatedWorry)
   }

   if (!worry) {
      return null
   }

   return (
      <Container sx={{ paddingTop: '20px' }}>
         <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", paddingTop: '100px', textAlign: 'center', fontSize: '30px', color: 'green' }}>
            제목: {worry.title}
         </Typography>

         <Typography variant="body1" sx={{ marginTop: '10px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '20px', color: 'green' }}>
            내용: {worry.content}
         </Typography>

         <Box sx={{ marginTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
            <TextField
               label="고민 나누기"
               variant="outlined"
               fullWidth
               multiline
               rows={4}
               value={comment}
               onChange={handleCommentChange}
               sx={{
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

            <Button variant="outlined" color="primary" onClick={handleCommentSubmit} sx={{ position: 'flex', marginTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '20px', color: 'green', backgroundColor: 'white', border: '1px solid red', borderRadius: '12px' }}>
               등록
            </Button>

            {worry.comments && (
               <Box sx={{ marginTop: '20px', color: 'green', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
                  <Typography variant="h6" sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '25px', fontWeight: 'bold' }}>
                     코멘트 목록
                  </Typography>

                  <Box sx={{ marginTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
                     {worry.comments.map((comment, index) => (
                        <Box
                           key={index}
                           sx={{
                              border: '1px solid red',
                              padding: '10px',
                              marginBottom: '10px',
                              borderRadius: '8px',
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                           }}
                        >
                           <Typography sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '20px', color: 'green' }}>{comment}</Typography>
                           <Button
                              onClick={() => handleDeleteComment(index)}
                              sx={{
                                 marginLeft: '10px',
                                 border: '1px solid red',
                                 color: 'green',
                                 fontSize: '14px',
                                 borderRadius: '8px',
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              }}
                           >
                              삭제
                           </Button>
                        </Box>
                     ))}
                  </Box>
               </Box>
            )}
         </Box>
      </Container>
   )
}

export default WorryCommentPage
