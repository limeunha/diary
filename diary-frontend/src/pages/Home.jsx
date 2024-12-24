import { Container, Typography } from '@mui/material'

const Home = () => {
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
         <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green', fontSize: '70px' }}>
            쉿! 나만의 비밀일기 쓰기
         </Typography>
         <p style={{ color: 'green', fontSize: '30px', paddingBottom: '10px' }}>어렸을때 친구들과 비밀일기 써본적 있죠?</p>
         <p style={{ color: 'green', fontSize: '30px' }}>아무도 모르게 우리들의 속마음을 적어봐요</p>
      </Container>
   )
}

export default Home
