const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Diary, Hashtag, User } = require('../models')
const { isLoggedIn } = require('./middlewares')
const router = express.Router()

try {
   fs.readdirSync('uploads')
} catch (error) {
   console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
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

router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

router.post('/', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      console.log('파일정보:', req.file)

      if (!req.file) {
         return res.status(400).json({ success: false, message: '파일 업로드에 실패했습니다.' })
      }

      const diary = await Diary.create({
         content: req.body.content,
         img: `/${req.file.filename}`,
         UserId: req.user.id,
      })

      const hashtags = req.body.hashtags ? req.body.hashtags.match(/#[^\s#]*/g) : []

      if (hashtags.length) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )
         await diary.addHashtags(result.map((r) => r[0]))
      }

      res.json({
         success: true,
         diary: {
            id: diary.id,
            content: diary.content,
            img: diary.img,
            UserId: diary.UserId,
         },
         message: '다이어리가 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 등록 중 오류가 발생했습니다.', error })
   }
})

router.put('/:id', isLoggedIn, upload.single('img'), async (req, res) => {
   try {
      const diary = await Diary.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      await diary.update({
         content: req.body.content,
         img: req.file ? `/${req.file.filename}` : diary.img,
      })

      const hashtags = req.body.hashtags ? req.body.hashtags.match(/#[^\s#]*/g) : []

      if (hashtags.length) {
         const result = await Promise.all(
            hashtags.map((tag) =>
               Hashtag.findOrCreate({
                  where: { title: tag.slice(1) },
               })
            )
         )
         await diary.setHashtags(result.map((r) => r[0]))
      }

      const updatedDiary = await Diary.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
      })

      res.json({
         success: true,
         diary: updatedDiary,
         message: '다이어리가 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 수정 중 오류가 발생했습니다.', error })
   }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const diary = await Diary.findOne({ where: { id: req.params.id, UserId: req.user.id } })
      if (!diary) {
         return res.status(404).json({ success: false, message: '다이어리를 찾을 수 없습니다.' })
      }

      await diary.destroy()

      res.json({
         success: true,
         message: '다이어리가 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: '다이어리 삭제 중 오류가 발생했습니다.', error })
   }
})

router.get('/:id', async (req, res) => {
   try {
      const diary = await Diary.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
            },
         ],
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
               attributes: ['id', 'nick', 'email'],
            },
            {
               model: Hashtag,
               attributes: ['title'],
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
