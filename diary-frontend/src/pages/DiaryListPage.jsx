import React, { useState } from 'react'
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const DiaryListPage = () => {
   const location = useLocation()
   const { diaries } = location.state || []
   const navigate = useNavigate()

   const [updatedDiaries, setUpdatedDiaries] = useState(diaries)

   const handleDeleteDiary = (id) => {
      const newDiaries = updatedDiaries.filter((diary) => diary.id !== id)
      setUpdatedDiaries(newDiaries)
   }

   const handleGoBack = () => {
      navigate(-1)
   }

   return (
      <Container
         maxWidth="md"
         sx={{
            paddingTop: '20px',
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
         <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
               paddingTop: '80px',
            }}
         >
            비밀일기 목록
         </Typography>

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
                  <ListItem
                     key={diary.id}
                     sx={{
                        marginBottom: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '8px',
                     }}
                  >
                     {/* 다이어리 내용 */}
                     <ListItemText
                        primary={diary.text}
                        secondary={`작성일: ${diary.date}`}
                        sx={{
                           fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                        }}
                     />

                     {/* 삭제 버튼 */}
                     <Button
                        onClick={() => handleDeleteDiary(diary.id)}
                        variant="outlined"
                        color="error"
                        sx={{
                           fontSize: '15px',
                        }}
                     >
                        삭제
                     </Button>
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
                  boxShadow: 6,
               },
            }}
         >
            일기쓰기
         </Button>
      </Container>
   )
}

export default DiaryListPage
