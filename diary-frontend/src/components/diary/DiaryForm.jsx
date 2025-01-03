import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Container } from '@mui/material'

const DiaryForm = ({ onSubmit, initialDiary }) => {
   const [content, setContent] = useState('')
   const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
   const [image, setImage] = useState(null)
   const [imageName, setImageName] = useState('')
   const [date, setDate] = useState('')
   const [title, setTitle] = useState('')

   useEffect(() => {
      if (initialDiary) {
         setContent(initialDiary.text || '')
         setDate(initialDiary.date || '')
         setImage(initialDiary.image || null)
         setImageName(initialDiary.imageName || '')
         setTitle(initialDiary.title || '')
      } else {
         setContent('')
         setDate('')
         setImage(null)
         setImageName('')
         setTitle('')
      }
   }, [initialDiary])

   const handleDiaryChange = (event) => setContent(event.target.value)
   const handleDateChange = (event) => setDate(event.target.value)
   const handleTitleChange = (event) => setTitle(event.target.value)

   const handleSubmitDiary = () => {
      if (content.trim() === '') {
         alert('일기를 작성해주세요!')
         return
      }
      // if (date === '') {
      //    alert('날짜를 선택해주세요!')
      //    return
      // }

      const formData = new FormData() //폼 데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
      formData.append('content', content)
      formData.append('title', title)
      // formData.append('date', date)

      // 내용만 수정할때 에러 방지
      if (imgFile) {
         // 파일명 인코딩(한글 파일명 깨짐 방지)
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })

         formData.append('img', encodedFile) //이미지 파일 추가
      }

      if (typeof onSubmit === 'function') {
         onSubmit(formData)
      } else {
         console.error('실패했습니다.')
      }

      setContent('')
      setTitle('')
      // setDate('')
      setImage(null)
      // setImageName('')
   }

   const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
         setImgFile(file)

         const imageUrl = URL.createObjectURL(file)
         setImage(imageUrl)
         setImageName(file.name)
      }
   }

   const handleDeleteImage = () => {
      setImage(null)
      setImageName('')
   }

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px', color: 'green', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
         <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
            나만의 비밀일기
         </Typography>

         <TextField
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-input': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '&:hover .MuiInputBase-input': {
                  color: 'green',
               },
               '& .MuiFormLabel-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
               },
            }}
         />

         <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={handleTitleChange}
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-input': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '&:hover .MuiInputBase-input': {
                  color: 'green',
               },
               '& .MuiFormLabel-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
               },
            }}
         />

         <TextField
            label="비밀내용"
            multiline
            rows={10}
            fullWidth
            value={content}
            onChange={handleDiaryChange}
            sx={{
               marginBottom: '20px',
               '& .MuiInputBase-input': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '&:hover .MuiInputBase-input': {
                  color: 'green',
               },
               '& .MuiFormLabel-root': {
                  fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                  fontSize: '20px',
                  color: 'green',
               },
               '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&:hover fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: 'red',
                     color: 'green',
                  },
               },
            }}
         />

         <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
               display: 'block',
               margin: '20px 0',
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               color: 'green',
            }}
         />

         {image && (
            <div style={{ position: 'relative', textAlign: 'center', marginTop: '10px', padding: '10px', borderRadius: '8px' }}>
               <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDeleteImage}
                  style={{
                     position: 'absolute',
                     top: '10px',
                     right: '10px',
                     fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                     backgroundColor: 'white',
                     color: 'green',
                     border: '1px solid red',
                     fontSize: '16px',
                     zIndex: 1,
                  }}
               >
                  이미지 삭제
               </Button>
               <img src={image} alt="Selected" style={{ width: '200px', height: 'auto', borderRadius: '8px', display: 'block', margin: '0 auto' }} />
            </div>
         )}

         <Button
            variant="outlined"
            onClick={handleSubmitDiary}
            fullWidth
            sx={{
               fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
               backgroundColor: 'white',
               color: 'green',
               border: '1px solid red',
               fontSize: '20px',
               padding: '12px 0',
               marginBottom: '20px',
               height: '56px',
            }}
         >
            일기 저장
         </Button>
      </Container>
   )
}

export default DiaryForm
