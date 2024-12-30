import React, { useEffect, useState } from 'react'
import { Container, TextField, Button, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const WorryEditPage = () => {
   const { id } = useParams()
   const [worry, setWorry] = useState({ title: '', content: '' })
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

   const handleChange = (e) => {
      const { name, value } = e.target
      setWorry((prevWorry) => ({
         ...prevWorry,
         [name]: value,
      }))
   }

   const handleSave = () => {
      const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
      const updatedWorries = savedWorries.map((w) => (w.id === parseInt(id) ? worry : w))
      localStorage.setItem('worries', JSON.stringify(updatedWorries))
      navigate('/worry-list')
   }

   return (
      <Container sx={{ paddingTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
         <Typography variant="h4" align="center" gutterBottom>
            고민 수정
         </Typography>

         <TextField
            label="제목"
            variant="outlined"
            fullWidth
            name="title"
            value={worry.title}
            onChange={handleChange}
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
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="content"
            value={worry.content}
            onChange={handleChange}
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

         <Button variant="outlined" color="primary" onClick={handleSave} sx={{ width: '10%', position: 'relative', marginTop: '20px', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '20px', color: 'green', backgroundColor: 'white', border: '1px solid red', borderRadius: '10px' }}>
            수정
         </Button>
      </Container>
   )
}

export default WorryEditPage
