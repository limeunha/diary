import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDiaryByIdThunk, updateDiaryThunk } from '../features/diarySlice'
import { useEffect, useState } from 'react'

function DiaryEditPage() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { diary, loading, error } = useSelector((state) => state.diary)

   const [updatedDiary, setUpdatedDiary] = useState({
      title: '',
      content: '',
   })

   // 일기 데이터를 불러오기
   useEffect(() => {
      if (id) {
         dispatch(fetchDiaryByIdThunk(id))
      }
   }, [id, dispatch])

   // 데이터 로드 후 수정 폼에 데이터 채우기
   useEffect(() => {
      if (diary) {
         setUpdatedDiary({
            title: diary.title,
            content: diary.content,
         })
      }
   }, [diary])

   // 수정 처리
   const handleSubmit = (e) => {
      e.preventDefault()
      if (id) {
         dispatch(updateDiaryThunk({ id, updatedDiary }))
      }
   }

   if (loading) return <div>로딩 중...</div>
   if (error) return <div>{error}</div>

   return (
      <div>
         <h2>일기 수정</h2>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="title">제목</label>
               <input type="text" id="title" value={updatedDiary.title} onChange={(e) => setUpdatedDiary({ ...updatedDiary, title: e.target.value })} />
            </div>
            <div>
               <label htmlFor="content">내용</label>
               <textarea id="content" value={updatedDiary.content} onChange={(e) => setUpdatedDiary({ ...updatedDiary, content: e.target.value })} />
            </div>
            <button type="submit">수정하기</button>
         </form>
      </div>
   )
}

export default DiaryEditPage
