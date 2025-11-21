const express = require('express');
const app = express();
const port = 3001; // React 앱이 보통 3000 포트를 사용하므로 3001로 설정합니다.

app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
