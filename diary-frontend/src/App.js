import './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import DiaryPage from './pages/DiaryPage'
import WorryPage from './pages/WorryPage'
import DiaryListPage from './pages/DiaryListPage'
import WorryListPage from './pages/WorryListPage'
import WorryWritePage from './pages/WorryWritePage'
import DiaryEditPage from './pages/DiaryEditPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/diary-list" element={<DiaryListPage />} />
            <Route path="/diaries/edit/:id" element={<DiaryEditPage />} />
            <Route path="/worry-list" element={<WorryListPage />} />
            <Route path="/worry-write" element={<WorryWritePage />} />
            <Route path="/worry" element={<WorryPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </>
   )
}

export default App
