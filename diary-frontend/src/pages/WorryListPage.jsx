import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const WorryListPage = () => {
   const [worries, setWorries] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      const fetchWorries = () => {
         const savedWorries = JSON.parse(localStorage.getItem('worries')) || []
         setWorries(savedWorries)
      }

      fetchWorries()
   }, [])

   const deleteWorry = (id) => {
      const updatedWorries = worries.filter((worry) => worry.id !== id)
      setWorries(updatedWorries)
      localStorage.setItem('worries', JSON.stringify(updatedWorries))
   }

   return (
      <Container sx={{ paddingTop: '20px' }}>
         <Typography variant="h4" align="center" gutterBottom>
            고민 목록
         </Typography>

         <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/worry-write')}
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               backgroundColor: 'white',
               color: 'green',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginBottom: '20px',
               width: '200px',
               height: '50px',
               borderRadius: '8px',
               marginLeft: 'auto',
               marginRight: '0',
               display: 'block',
            }}
         >
            고민 등록하기
         </Button>

         {worries.length === 0 ? (
            <Typography
               variant="h6"
               align="center"
               style={{
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
                  fontSize: '50px',
               }}
            >
               고민을 등록해주세요
            </Typography>
         ) : (
            <Grid container spacing={3}>
               {worries.map((worry) => (
                  <Grid item xs={12} sm={6} md={4} key={worry.id}>
                     <Card sx={{ height: '250px', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                              {worry.title}
                           </Typography>
                           <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                              {worry.content.length > 100 ? worry.content.substring(0, 100) + '...' : worry.content}
                           </Typography>
                        </CardContent>

                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: 'auto',
                              padding: '10px',
                           }}
                        >
                           <Button
                              component={Link}
                              to={`/worry/${worry.id}`}
                              variant="outlined"
                              sx={{
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 backgroundColor: 'white',
                                 color: 'green',
                                 border: '1px solid red',
                                 flex: 1,
                                 marginRight: '10px',
                              }}
                           >
                              더 보기
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => deleteWorry(worry.id)}
                              sx={{
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 backgroundColor: 'white',
                                 color: 'green',
                                 border: '1px solid red',
                                 flex: 1,
                              }}
                           >
                              삭제
                           </Button>
                        </Box>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         )}
      </Container>
   )
}

export default WorryListPage
