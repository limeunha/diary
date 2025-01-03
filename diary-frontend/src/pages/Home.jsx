import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const navigate = useNavigate()

   const handleGoToDiaryPage = () => {
      navigate('/diary')
   }

   return (
      <Container
         sx={{
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url(/images/Rudolph.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
         }}
      >
         <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green', fontSize: '70px', marginTop: '50px' }}>
            쉿! 나만의 비밀일기 쓰기
         </Typography>
         <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px' }}>어렸을때 친구들과 비밀일기 써본적 있죠?</p>
         <p style={{ color: 'green', fontSize: '30px' }}>아무도 모르게 우리들의 속마음을 적어봐요</p>

         <Button
            variant="outlined"
            color="primary"
            onClick={handleGoToDiaryPage}
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
               backgroundColor: 'white',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginTop: '20px',
               borderRadius: '8px',
               width: '200px',
               height: '50px',
            }}
         >
            비밀일기 작성하러 가기
         </Button>
      </Container>
   )
}

export default Home
