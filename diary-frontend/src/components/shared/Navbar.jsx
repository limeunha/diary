import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
   return (
      <AppBar position="fixed" sx={{ backgroundImage: 'url(/images/menuimage.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
         <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
               <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'green', fontSize: '20px' }}>
                  비밀일기
               </Link>
               <Link to="/diary" style={{ marginRight: '20px', textDecoration: 'none', color: 'green', fontSize: '20px' }}>
                  비밀일기장
               </Link>
               <Link to="/worry" style={{ marginRight: '20px', textDecoration: 'none', color: 'green', fontSize: '20px' }}>
                  고민동산
               </Link>
            </Typography>

            {isAuthenticated ? (
               <>
                  <Link to="/my" style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" sx={{ marginRight: '20px', color: 'white', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '20px' }}>
                        {user?.nick}님
                     </Typography>
                  </Link>
                  <Button onClick={onLogout} variant="outlined" sx={{ color: 'white', borderColor: 'white', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif", fontSize: '15px' }}>
                     로그아웃
                  </Button>
               </>
            ) : (
               <Link to="/login" style={{ color: 'white', fontSize: '20px', textDecoration: 'none', fontFamily: "'TTHakgyoansimKkokkomaR', sans-serif" }}>
                  로그인
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar
