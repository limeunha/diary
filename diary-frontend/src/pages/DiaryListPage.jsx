import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Card, CardContent, CardActions, Box, CardMedia } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiariesThunk, deleteDiaryThunk } from '../features/diarySlice'

const DiaryListPage = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { diaries, loading, error } = useSelector((state) => state.diary)

   useEffect(() => {
      dispatch(fetchDiariesThunk(1))
   }, [dispatch])

   const deleteDiary = (id) => {
      if (window.confirm('삭제하시겠습니까?')) {
         dispatch(deleteDiaryThunk(id))
            .unwrap()
            .then(() => {
               alert('삭제되었습니다.')
               dispatch(fetchDiariesThunk(1))
            })
            .catch((error) => {
               alert('삭제에 실패했습니다.')
            })
      }
   }

   const updateDiary = (id) => {
      navigate(`/diaries/edit/${id}`)
   }

   return (
      <Container
         maxWidth="lg"
         sx={{
            paddingTop: '100px',
            paddingBottom: '20px',
            backgroundImage: 'url(/images/Rudolph.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundAttachment: 'fixed',
         }}
      >
         {loading ? (
            <Typography
               variant="h6"
               align="center"
               color="textSecondary"
               sx={{
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
                  fontSize: '20px',
               }}
            >
               로딩 중...
            </Typography>
         ) : error ? (
            <Typography
               variant="h6"
               align="center"
               color="error"
               sx={{
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
               }}
            >
               {error}
            </Typography>
         ) : diaries.length === 0 ? (
            <Typography
               variant="h6"
               align="center"
               color="textSecondary"
               sx={{
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  color: 'green',
                  fontSize: '20px',
               }}
            >
               작성된 일기가 없습니다.
            </Typography>
         ) : (
            <Box
               sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px',
                  width: '100%',
                  marginTop: '20px',
               }}
            >
               {diaries.map((diary) => (
                  <Card
                     key={diary.id}
                     sx={{
                        width: '100%',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                     }}
                  >
                     {diary.img && <CardMedia component="img" alt="Diary Image" height="140" image={`${process.env.REACT_APP_API_URL}${diary.img}`} sx={{ objectFit: 'cover' }} />}

                     <CardContent>
                        <Typography
                           variant="h5"
                           component="div"
                           sx={{
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              color: 'green',
                              fontWeight: 'bold',
                              marginBottom: '10px',
                           }}
                        >
                           {diary.title}
                        </Typography>
                        <Typography
                           variant="h6"
                           component="div"
                           sx={{
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              color: 'green',
                              marginBottom: '10px',
                           }}
                        >
                           {diary.text ? diary.text : '내용 없음'}
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
                           onClick={() => updateDiary(diary.id)}
                           variant="outlined"
                           color="primary"
                           sx={{
                              fontSize: '16px',
                              marginRight: '10px',
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              height: '35px',
                           }}
                        >
                           수정
                        </Button>

                        <Button
                           onClick={() => deleteDiary(diary.id)}
                           variant="outlined"
                           color="error"
                           sx={{
                              fontSize: '16px',
                              fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                              height: '35px',
                           }}
                        >
                           삭제
                        </Button>
                     </CardActions>
                  </Card>
               ))}
            </Box>
         )}

         <Button
            onClick={() => navigate('/diary')}
            variant="outlined"
            sx={{
               marginTop: '50px',
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
