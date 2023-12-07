const express = require('express');
const path = require("path");
const cors = require('cors');
const { exec } = require('child_process');
const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');
const app = express();
const port = 3000;
const axios = require('axios');

app.use(cors());

axios.get('http://localhost:3000/api/DND')
  .then(response => {
    // 응답 데이터 처리
    console.log(response.data);
  })
  .catch(error => {
    // 에러 처리
    console.error('Error:', error.message);;
  });

// 정적 파일 제공을 위한 경로 설정
app.use(express.static(path.join(__dirname, '..', 'build')));

// 기본 라우트 설정
app.get('/api/DND', (req, res) => {
  res.json('Hello, It is WebServer!');
});

// REST API 라우트 설정
app.get('/api/data', (req, res) => {
  // 데이터 처리 로직 작성
  // 예: 데이터 조회, 데이터베이스 연동 등
  res.send('REST API Request data');
});

// 모든 요청에 대해 index.html을 제공
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  // React 앱 실행 localhost 전용
  exec('npm run build && npm start', {
    cwd: path.join(__dirname, '../src') // React 프로젝트의 경로로 설정
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`An error occurred while running React app: ${error}`);
      return;
    }
    console.log(`React app is running.`);
  });

  const open = require('open');
  open(`http://localhost:${port}`);

});
