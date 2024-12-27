import React, { useState, useMemo, useCallback } from 'react'
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../features/authSlice'

const Login = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((state) => state.auth)

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (email.trim() && password.trim()) {
            dispatch(loginUserThunk({ email, password }))
               .unwrap()
               .then(() => navigate('/'))
               .catch((error) => console.error('로그인 실패:', error))
         }
      },
      [dispatch, email, password, navigate]
   )

   const loginButtonContent = useMemo(
      () =>
         loading ? (
            <CircularProgress
               size={24}
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
               }}
            />
         ) : (
            '로그인'
         ),
      [loading]
   )

   return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', marginRight: '20px' }}>
               <img src="/images/tree2.png" alt="트리 이미지" style={{ width: '80%', height: 'auto' }} />
            </div>

            <div style={{ flex: 2 }}>
               {error && (
                  <Typography color="error" align="center">
                     {error}
                  </Typography>
               )}

               <form onSubmit={handleLogin}>
                  <TextField
                     label="이메일"
                     name="email"
                     fullWidth
                     margin="normal"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     sx={{
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
                           },
                           '&:hover fieldset': {
                              borderColor: 'red',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: 'red',
                           },
                        },
                     }}
                  />

                  <TextField
                     label="비밀번호"
                     type="password"
                     name="password"
                     fullWidth
                     margin="normal"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     sx={{
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
                           },
                           '&:hover fieldset': {
                              borderColor: 'red',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: 'red',
                           },
                        },
                     }}
                  />

                  <Button
                     variant="outlined"
                     color="primary"
                     type="submit"
                     fullWidth
                     disabled={loading}
                     sx={{
                        position: 'relative',
                        marginTop: '20px',
                        fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif",
                        fontSize: '20px',
                        color: 'green',
                        backgroundColor: 'white',
                        border: '1px solid red',
                        borderRadius: '12px',
                     }}
                  >
                     {loginButtonContent}
                  </Button>
               </form>

               <p style={{ fontSize: '20px', padding: '15px', color: 'green' }}>
                  계정이 없으신가요?{' '}
                  <Link to="/signup" style={{ fontSize: '20px', textDecoration: 'none', color: 'green', paddingLeft: '5px' }}>
                     회원가입
                  </Link>
               </p>
            </div>
         </div>
      </Container>
   )
}

export default Login
