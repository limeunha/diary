const express = require('express')
const path = require('path') // 경로 처리 유틸리티
const cookieParser = require('cookie-parser') // 쿠키 처리 미들웨어
const morgan = require('morgan') // HTTP 요청 로깅 미들웨어
const session = require('express-session') // 세션 관리 미들웨어
const passport = require('passport') // 인증 미들웨어
require('dotenv').config() // 환경 변수 관리
const cors = require('cors') // CORS 미들웨어

// 라우터 및 기타 모듈 불러오기
const indexRouter = require('./routes')
const authRouter = require('./routes/auth')
const diaryRouter = require('./routes/diary')
const { sequelize } = require('./models')
const passportConfig = require('./passport')

const app = express()

// Sequelize를 통한 DB 연결
sequelize
   .sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결 성공')
   })
   .catch((err) => {
      console.error(err)
   })

// passportConfig()를 sequelize.sync() 이후에 실행
passportConfig() // passport 설정

app.set('port', process.env.PORT || 8002)

// 미들웨어 설정
app.use(
   cors({
      origin: 'http://localhost:3000', // 요청을 허용할 도메인
      credentials: true, // 쿠키와 세션 정보 허용
   })
)

if (process.env.NODE_ENV === 'production') {
   app.use(morgan('combined')) // 배포 환경에서 로그 설정
} else {
   app.use(morgan('dev')) // 개발 환경에서 로그 설정
}

app.use(express.static(path.join(__dirname, 'uploads'))) // 정적 파일 제공
app.use(express.json()) // JSON 데이터 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 데이터 파싱
app.use(cookieParser(process.env.COOKIE_SECRET)) // 쿠키 설정

// 세션 설정
app.use(
   session({
      resave: false, // 세션 데이터가 변경되지 않아도 재저장 여부
      saveUninitialized: true, // 초기화되지 않은 세션도 저장 여부
      secret: process.env.COOKIE_SECRET, // 세션 암호화 키
      cookie: {
         httpOnly: true, // 클라이언트에서 접근 불가
         secure: process.env.NODE_ENV === 'production', // 배포 환경에서만 secure 설정
      },
   })
)

// Passport 초기화 및 세션 연동
app.use(passport.initialize())
app.use(passport.session())

// 라우터 등록
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/diary', diaryRouter)

// 잘못된 라우터 경로 처리
app.use((req, res, next) => {
   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`) // 에러 객체 생성
   error.status = 404 // 404 상태코드 설정
   next(error) // 에러 미들웨어로 전달
})

// 에러 미들웨어
app.use((err, req, res, next) => {
   const statusCode = err.status || 500 // 상태 코드 설정 (500: 서버 내부 오류)
   const errorMessage = err.message || '서버 내부 오류' // 에러 메시지 설정

   // 서버 콘솔에 에러 상세 출력 (배포 시에는 수정)
   console.log(err)

   // 클라이언트에 에러 응답
   res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: err,
   })
})

// 모든 경로에 대해 OPTIONS 요청을 허용
app.options('*', cors())

// 서버 실행
app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기중')
})
