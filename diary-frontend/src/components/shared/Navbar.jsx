import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated }) => {
   return (
      <AppBar position="static" style={{ backgroundImage: 'url(/images/menuimage.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
         <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
               <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'green' }}>
                  <img src="/images/트리.png" alt="로고" width="40" style={{ color: 'white' }} />
                  비밀일기
               </Link>
               <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'green' }}>
                  비밀일기장
               </Link>
               <Link to="/" style={{ textDecoration: 'none', color: 'green' }}>
                  고민동산
               </Link>
            </Typography>

            {isAuthenticated ? (
               <>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                        사용자님
                     </Typography>
                  </Link>
                  <Button>로그아웃</Button>
               </>
            ) : (
               <Link to="/login" style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
                  로그인
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
