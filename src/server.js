const express = require('express')

const app = express()

app.get('/app/user', (req, res) => {
  res.json({
    name: 'xyc'
  })
})

app.listen(3000)
