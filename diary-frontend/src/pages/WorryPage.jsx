import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const WorryPage = () => {
   const navigate = useNavigate()

   const handleGoToWorryPage = () => {
      navigate('/worry-list')
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
         <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green', fontSize: '70px', marginTop: '80px' }}>
            <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px', paddingTop: '50px' }}>고민동산에서는 </p>
            <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px' }}> 나랑 같은 고민을 하는 사람들과 이야기를 해봐요</p>
            <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px' }}>짝사랑 (남자,여자) 이야기, 혼내주고싶은 사람이야기, </p>
            <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px' }}>여행 이야기, 남자친구 or 여자친구에 대한 고민거리</p>
            <p style={{ color: 'green', fontSize: '30px' }}>모든 주제의 고민거리를 이야기를 해봐요</p>
         </Typography>

         <Button
            variant="outlined"
            color="primary"
            onClick={handleGoToWorryPage}
            sx={{
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
            고민동산 입장하기
         </Button>
      </Container>
   )
}

export default WorryPage
