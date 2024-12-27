import React, { useState, useEffect } from 'react'
import { Container, Typography, List, ListItem, Button, Card, CardContent, CardActions } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const DiaryListPage = () => {
   const location = useLocation()
   const { diaries } = location.state || []
   const navigate = useNavigate()

   const [updatedDiaries, setUpdatedDiaries] = useState(diaries)

   useEffect(() => {
      if (!diaries) {
         console.log('No diaries found in location.state')
      } else {
         console.log('Diaries:', diaries)
      }
   }, [diaries])

   const handleDeleteDiary = (id) => {
      const newDiaries = updatedDiaries.filter((diary) => diary.id !== id)
      setUpdatedDiaries(newDiaries)
   }

   const handleGoBack = () => {
      navigate(-1)
   }

   const handleEditClick = (id) => {
      navigate(`/diaries/edit/${id}`)
   }

   const getPreviewText = (text) => {
      console.log('Diary text:', text)

      if (!text || text.trim() === '') {
         return '내용 없음'
      }

      return text.length > 100 ? text.substring(0, 100) + '...' : text
   }

   return (
      <Container
         maxWidth="md"
         sx={{
            paddingTop: '100px',
            paddingBottom: '20px',
            backgroundImage: 'url(/images/Rudolph.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundAttachment: 'fixed',
         }}
      >
         {updatedDiaries.length === 0 ? (
            <Typography
               variant="h6"
               align="center"
               color="textSecondary"
               sx={{
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
               }}
            >
               일기가 없습니다.
            </Typography>
         ) : (
            <List sx={{ width: '100%', maxWidth: 360, marginTop: '20px' }}>
               {updatedDiaries.map((diary) => (
                  <ListItem key={diary.id} sx={{ marginBottom: '20px' }}>
                     <Card
                        sx={{
                           width: '100%',
                           borderRadius: '8px',
                           backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        }}
                     >
                        <CardContent>
                           <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 fontWeight: 'bold',
                                 marginBottom: '10px',
                                 color: 'green',
                              }}
                           >
                              {diary.title}
                           </Typography>
                           <Typography
                              variant="h6"
                              component="div"
                              sx={{
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 fontWeight: 'bold',
                                 marginBottom: '10px',
                                 color: 'green',
                              }}
                           >
                              {getPreviewText(diary.text)}
                           </Typography>
                           <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 color: 'green',
                              }}
                           >
                              {diary.date}
                           </Typography>
                        </CardContent>

                        <CardActions
                           sx={{
                              justifyContent: 'flex-end',
                              paddingBottom: '12px',
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                           }}
                        >
                           <Button
                              onClick={() => handleEditClick(diary.id)}
                              variant="outlined"
                              color="primary"
                              sx={{
                                 fontSize: '20px',
                                 marginRight: '10px',
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 height: '35px',
                              }}
                           >
                              수정
                           </Button>

                           <Button
                              onClick={() => handleDeleteDiary(diary.id)}
                              variant="outlined"
                              color="error"
                              sx={{
                                 fontSize: '20px',
                                 fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                                 width: '10px',
                                 height: '35px',
                              }}
                           >
                              삭제
                           </Button>
                        </CardActions>
                     </Card>
                  </ListItem>
               ))}
            </List>
         )}

         <Button
            onClick={handleGoBack}
            variant="outlined"
            sx={{
               marginTop: '20px',
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               backgroundColor: 'white',
               color: 'green',
               border: '1px solid red',
               borderRadius: '8px',
               padding: '12px 20px',
               fontSize: '20px',
               '&:hover': {
                  backgroundColor: 'lightgreen',
               },
            }}
         >
            일기쓰기
         </Button>
      </Container>
   )
}

export default DiaryListPage
