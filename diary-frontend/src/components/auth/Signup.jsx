import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../../features/authSlice'

const Signup = () => {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [isSignupComplete, setIsSignupComplete] = useState(false)
   const dispatch = useDispatch()
   const { loading, error } = useSelector((state) => state.auth)

   const handleSignup = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim() || !confirmPassword.trim()) {
         alert('모든 필드를 입력해주세요!')
         return
      }

      if (password !== confirmPassword) {
         alert('비밀번호가 일치하지 않습니다!')
         return
      }

      dispatch(registerUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => {
            setIsSignupComplete(true)
         })
         .catch((error) => {
            console.error('회원가입 에러:', error)
         })
   }, [email, nick, password, confirmPassword, dispatch])

   if (isSignupComplete) {
      return (
         <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4" gutterBottom align="center">
               회원가입이 완료되었습니다!
            </Typography>
            <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
               로그인 페이지로 이동하거나 다른 작업을 계속 진행할 수 있습니다.
            </Typography>
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px', borderColor: 'red', color: 'green', backgroundColor: 'white' }} onClick={() => (window.location.href = '/login')}>
               로그인 하러 가기
            </Button>
         </Container>
      )
   }

   return (
      <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginRight: '20px' }}>
               <img src="/images/tree2.png" alt="트리 이미지" style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={{ flex: 2, textAlign: 'center' }}>
               {error && (
                  <Typography color="error" align="center">
                     {error}
                  </Typography>
               )}

               <TextField
                  label="이메일"
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />

               <TextField
                  label="닉네임"
                  variant="outlined"
                  fullWidth
                  margin="normal"
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
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
               />

               <TextField
                  label="비밀번호"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               <TextField
                  label="비밀번호 확인"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />

               <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSignup}
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
                  {loading ? <CircularProgress size={25} /> : '회원가입'}
               </Button>
            </div>
         </div>
      </Container>
   )
}

export default Signup
