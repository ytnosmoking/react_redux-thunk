const http = require('http')
const fs = require('fs')
const httpPort = 3001

http.createServer((req, res) => {
  fs.readFile('./build/index.html', 'utf-8', (err, content) => {
    console.log(req.url)
    console.log(err)
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})