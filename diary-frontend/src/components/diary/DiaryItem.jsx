import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { deletePostThunk } from '../../features/postSlice'

const PostItem = ({ post, isAuthenticated, user }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLiked, setIsLiked] = useState(false)

   const onClickDelete = useCallback(
      (id) => {
         dispatch(deletePostThunk(id))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다.')
            })
      },
      [dispatch, navigate]
   )

   const handleLikeClick = () => {
      setIsLiked((prev) => !prev)
   }

   return (
      <Card sx={{ margin: '20px 0', borderRadius: '8px', boxShadow: 2 }}>
         <CardMedia sx={{ height: 240, objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }} image={`${process.env.REACT_APP_API_URL}${post.img}`} title={post.content} />
         <CardContent>
            <Link to={`/my/${post.User.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>@{post.User.nick}</Typography>
            </Link>
            <Typography sx={{ color: 'text.secondary' }}>{dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography sx={{ color: 'text.primary' }}>{post.content}</Typography>
         </CardContent>
         <CardActions sx={{ justifyContent: 'space-between', padding: '8px 16px' }}>
            <Button size="small" color="primary" onClick={handleLikeClick}>
               <FavoriteBorderIcon fontSize="small" sx={{ color: isLiked ? 'red' : 'inherit' }} />
            </Button>

            {isAuthenticated && post.User.id === user.id && (
               <Box sx={{ display: 'flex', gap: 1 }}>
                  <Link to={`/posts/edit/${post.id}`} style={{ textDecoration: 'none' }}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(post.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default PostItem
