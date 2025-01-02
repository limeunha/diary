import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Card, CardContent, CardActions, Box } from '@mui/material'
import axios from 'axios'

const DiaryListPage = () => {
   const navigate = useNavigate()
   const [diaryList, setDiaryList] = useState([])

   // 일기 목록 가져오기
   useEffect(() => {
      const fetchDiaries = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/diaries')
            setDiaryList(response.data.diaries)
         } catch (error) {
            console.error('일기 목록을 가져오는 데 실패했습니다.', error)
         }
      }

      fetchDiaries()
   }, [])

   // 일기 삭제 처리
   const handleDeleteDiary = async (id) => {
      if (window.confirm('일기를 삭제하시겠습니까?')) {
         try {
            await axios.delete(`http://localhost:5000/api/diaries/${id}`)
            setDiaryList(diaryList.filter((diary) => diary.id !== id))
            alert('일기가 삭제되었습니다.')
         } catch (error) {
            console.error('일기 삭제에 실패했습니다.', error)
            alert('일기 삭제에 실패했습니다.')
         }
      }
   }

   // 일기 수정 클릭
   const handleEditClick = (id) => {
      navigate(`/diaries/edit/${id}`)
   }

   // 일기 내용 미리보기
   const getPreviewText = (text) => {
      return text?.trim() === '' ? '내용 없음' : text.length > 100 ? `${text.substring(0, 100)}...` : text
   }

   const commonStyles = {
      fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
      color: 'green',
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
         {diaryList.length === 0 ? (
            <Typography variant="h6" align="center" color="textSecondary" sx={{ ...commonStyles, color: 'green' }}>
               일기가 없습니다.
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
               {diaryList.map((diary) => (
                  <Card
                     key={diary.id}
                     sx={{
                        width: '100%',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' },
                     }}
                  >
                     <CardContent>
                        <Typography variant="h5" component="div" sx={{ ...commonStyles, fontWeight: 'bold', marginBottom: '10px' }}>
                           {diary.title}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ ...commonStyles, marginBottom: '10px' }}>
                           {getPreviewText(diary.text)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ ...commonStyles }}>
                           {diary.date}
                        </Typography>
                     </CardContent>

                     <CardActions sx={{ justifyContent: 'flex-end', paddingBottom: '12px', fontFamily: commonStyles.fontFamily }}>
                        <Button
                           onClick={() => handleEditClick(diary.id)}
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
                           onClick={() => handleDeleteDiary(diary.id)}
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
               marginTop: '20px',
               fontFamily: commonStyles.fontFamily,
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
