import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { deleteDiaryThunk } from '../../features/diarySlice'

const DiaryItem = ({ diary, isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLiked, setIsLiked] = useState(false)

   const onClickDelete = useCallback(
      (id) => {
         dispatch(deleteDiaryThunk(id))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('일기 삭제 중 오류 발생: ', error)
               alert('일기 삭제에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   )

   const handleLikeClick = () => {
      setIsLiked((prev) => !prev)
   }

   return (
      <Card sx={{ margin: '20px 0', borderRadius: '8px', boxShadow: 2 }}>
         <CardMedia sx={{ height: 240, objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} image={`${process.env.REACT_APP_API_URL}${diary.img}`} title={diary.content} />
         <CardContent>
            <Link to={`/my/${diary.User.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>@{diary.User.nick}</Typography>
            </Link>
            <Typography sx={{ color: 'text.secondary' }}>{dayjs(diary.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography sx={{ color: 'text.primary' }}>{diary.content}</Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
            <Button size="small" color="primary" onClick={handleLikeClick}>
               <FavoriteBorderIcon fontSize="small" sx={{ color: isLiked ? 'red' : 'inherit' }} />
            </Button>

            {isAuthenticated && diary.User.id === user.id && (
               <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link to={`/diaries/edit/${diary.id}`} style={{ textDecoration: 'none' }}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(diary.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default DiaryItem
