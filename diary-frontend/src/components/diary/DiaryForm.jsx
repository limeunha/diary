import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const DiaryForm = ({ onSubmit, initialDiary = {} }) => {
   const [content, setContent] = useState('');
   const [imgFile, setImgFile] = useState(null);
   const [image, setImage] = useState(null);
   const [imageName, setImageName] = useState('');
   const [date, setDate] = useState('');
   const [title, setTitle] = useState('');

  
   useEffect(() => {
      if (initialDiary && initialDiary.id) {
         setContent(initialDiary.text || '');
         setDate(initialDiary.date || '');
         setImage(initialDiary.image || null);
         setImageName(initialDiary.imageName || '');
         setTitle(initialDiary.title || '');
      }
   }, [initialDiary]);

  
   const handleDiaryChange = (event) => setContent(event.target.value);
   const handleDateChange = (event) => setDate(event.target.value);
   const handleTitleChange = (event) => setTitle(event.target.value);

   const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         setImgFile(file);
         const imageUrl = URL.createObjectURL(file);
         setImage(imageUrl);
         setImageName(file.name);
      }
   };

   const handleDeleteImage = () => {
      setImage(null);
      setImageName('');
   };

   const handleSubmitDiary = () => {
      if (!content.trim() || !title.trim()) {
         alert('제목과 내용을 입력해주세요!');
         return;
      }

      const formData = new FormData();
      formData.append('content', content);
      formData.append('title', title);

      if (imgFile) {
         formData.append('img', imgFile);
      }

      if (typeof onSubmit === 'function') {
         onSubmit(formData)
      }
      
      // 상태 초기화
      setContent('');
      setTitle('');
      setDate('');
      setImage(null);
      setImageName('');
   };

   return (
      <Container maxWidth="md" sx={{ paddingTop: '20px', color: 'green', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
         <Typography variant="h4" gutterBottom align="center" sx={{ fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", color: 'green' }}>
            {initialDiary && initialDiary.id ? '비밀일기 수정' : '나만의 비밀일기'}
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
            {initialDiary && initialDiary.id ? '일기 수정' : '일기 저장'}
         </Button>
      </Container>
   );
};

export default DiaryForm

