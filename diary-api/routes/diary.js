const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Diary, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

// uploads 폴더가 없을 경우 새로 생성
try {
   fs.readdirSync('uploads') // 해당 폴더가 있는지 확인
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads') // 폴더 생성
}

// multer 설정 (파일 크기 제한 5MB)
const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/') // uploads 폴더에 저장
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname) // 파일명 디코딩 (한글 파일명 깨짐 방지)
         const ext = path.extname(decodedFileName) // 확장자 추출
         const basename = path.basename(decodedFileName, ext) // 확장자 제거한 파일명 추출
         cb(null, basename + Date.now() + ext) // 파일명 설정: 기존 이름 + 업로드 날짜 + 확장자
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 5MB 제한
})

// 다이어리 작성 (POST)
router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      // 다이어리 생성
      const diary = await Diary.create({
         title: req.body.title,
         content: req.body.content,
         UserId: req.user.id, // 작성자 ID 저장
         img: `/${req.file.filename}`, // 이미지 경로 저장
      })

      res.json({
         success: true,
         diary: {
            id: diary.id,
            title: diary.title,
            content: diary.content,
            img: diary.img,
         },
         message: '다이어리가 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 등록 중 오류가 발생했습니다.', error })
   }
})

// 다이어리 수정 (PUT)
router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      // 다이어리 찾기
      const diary = await Diary.findOne({ where: { id: req.params.id, UserId: req.user.id } })

      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      const updatedData = {
         title: req.body.title,
         content: req.body.content,
      }

      if (req.file) {
         updatedData.img = `/${req.file.filename}`
      }

      // 다이어리 업데이트
      await diary.update(updatedData)

      res.json({
         success: true,
         diary,
         message: '다이어리가 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 수정 중 오류가 발생했습니다.', error })
   }
})

//다이어리 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      // 삭제할 게시물 존재 여부 확인
      const diary = await Diary.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!diary) {
         return res.status(404).json({ success: false, message: '게시물을 찾을 수 없습니다.' })
      }

      // 게시물 삭제
      await diary.destroy()

      res.json({
         success: true,
         message: '게시물이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '게시물 삭제 중 오류가 발생했습니다.', error })
   }
})

// 다이어리 하나 조회 (GET)
router.get('/:id', async (req, res) => {
   try {
      const diary = await Diary.findByPk(req.params.id, {
         include: [{ model: User, attributes: ['id', 'name', 'email'] }],
      })

      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      res.json({
         success: true,
         diary,
         message: '다이어리를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리를 불러오는 중 오류가 발생했습니다.', error })
   }
})

// 전체 다이어리 리스트 조회 (GET) - 페이징 기능 포함
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
         include: [
            {
               model: User,
               attributes: ['id', 'name', 'email'],
            },
         ],
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
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 리스트를 불러오는 중 오류가 발생했습니다.', error })
   }
})

module.exports = router
