const express = require('express');
const path = require('path');
const app = express();
// const router = express.Router()

console.log(__dirname);
// app.use('/home', express.static(path.join(__dirname, '../build')))
// app.use('*', express.static(path.join(__dirname, '../build')))
app.use(express.static(path.join(__dirname, '../build')));

// ----------------------------- 跨域处理-------------------------------------
// eslint-disable-next-line space-before-function-paren
app.all('*', (req, res, next) => {
  console.log(222)
  console.log(req.url);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,xtoken');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('*', (req, res) => {
  console.log(111)
  console.log(req.url);
  res.header('Content-Type', 'text/html; charset=UTF-8');

  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  // res.body = (path.resolve(__dirname, '../build', 'index.html'))
});

// app.use(express.static(path.join(__dirname + '../build')))

// router.get(`/`, (req, res, next) => {
//   res.json({
//     status: 200,
//     data: `请求成功`
//   })
// })

app.listen(3001, () => {
  console.log('has started~~~~~3001');
});
