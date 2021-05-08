const PORT = process.env.PORT || 6868

const express = require('express')

const app = express()
app.use(require('cors')())
app.use(require('body-parser').json())
const wasm = require('./handlers/wasm')

app.post('/wasm', wasm)

app.listen(PORT, () => {
  console.log('server running at port ' + PORT)
})
