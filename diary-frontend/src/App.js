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

function App() {
   return (
      <>
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
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
