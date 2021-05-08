const PORT = process.env.PORT || 6969
const admin = require('firebase-admin')
const serviceAccount = require('./firebase-admin.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const express = require('express')

const app = express()
app.use(require('cors')())

const fs = require('fs')
const loader = require('@assemblyscript/loader')
const wasm = require('./handlers/wasm')

app.get('/wasm', wasm)

app.listen(PORT, () => {
  console.log('server running at port ' + PORT)
})
