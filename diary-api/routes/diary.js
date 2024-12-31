const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Diary } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// 업로드 디렉토리 확인 및 생성
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync(uploadDir)
}

// multer 설정
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, uploadDir)
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodedFileName)
         const basename = path.basename(decodedFileName, ext)
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

// 이미지 경로 제공 (static 파일로 서비스)
router.use('/uploads', express.static(uploadDir))

// 다이어리 생성 API
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   console.log('Logged in user:', req.user)
   console.log('Uploaded file:', req.file)

   try {
      // 이미지 파일이 없으면 에러 처리
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      // 로그인된 사용자 정보 확인
      if (!req.user) {
         return res.status(401).json({ success: false, message: '로그인 정보가 없습니다.' })
      }

      // 다이어리 데이터 생성
      const diary = await Diary.create({
         title: req.body.title,
         content: req.body.content,
         authorId: req.user.id,
         img: `/uploads/${req.file.filename}`,
      })

      // 성공적인 응답
      res.json({
         success: true,
         diary: {
            id: diary.id,
            title: diary.title,
            content: diary.content,
            img: diary.img,
            authorId: diary.authorId,
         },
         message: '다이어리가 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error('Error during diary creation:', error)
      res.status(500).json({ success: false, message: '다이어리 등록 중 오류가 발생했습니다.', error: error.message })
   }
})

// 다이어리 수정 API
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      const diary = await Diary.findOne({ where: { id: req.params.id, authorId: req.user.id } })
      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      const updatedData = {
         title: req.body.title,
         content: req.body.content,
      }

      // 이미지가 업로드된 경우, 새 이미지 경로로 업데이트
      if (req.file) {
         updatedData.img = `/uploads/${req.file.filename}`
      }

      await diary.update(updatedData)

      res.json({
         success: true,
         diary,
         message: '다이어리가 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error('Error during diary update:', error)
      res.status(500).json({ success: false, message: '다이어리 수정 중 오류가 발생했습니다.', error: error.message })
   }
})

// 다이어리 조회 API
router.get('/:id', async (req, res) => {
   try {
      const diary = await Diary.findByPk(req.params.id)

      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      res.json({
         success: true,
         diary,
         message: '다이어리를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error('Error during fetching diary:', error)
      res.status(500).json({ success: false, message: '다이어리를 불러오는 중 오류가 발생했습니다.', error: error.message })
   }
})

// 다이어리 목록 조회 API
router.get('/', async (req, res) => {
   try {
      const page = parseInt(req.query.page, 10) || 1
      const limit = parseInt(req.query.limit, 10) || 3
      const offset = (page - 1) * limit

      const count = await Diary.count()

      const diaries = await Diary.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
      })

      res.json({
         success: true,
         diaries,
         pagination: {
            totalDiaries: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 다이어리 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error('Error during fetching diaries:', error)
      res.status(500).json({ success: false, message: '다이어리 리스트를 불러오는 중 오류가 발생했습니다.', error: error.message })
   }
})

module.exports = router
