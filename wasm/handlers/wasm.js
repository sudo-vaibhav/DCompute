const fs = require('fs')
const path = require('path')
const loader = require('@assemblyscript/loader')
const { exec } = require('child_process')
const admin = require('firebase-admin')
const serviceAccount = require('../firebase-admin.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

let storage = admin.storage()
let bucket = storage.bucket('dcompute-16d7b.appspot.com')

const wasm = (req, res) => {
  const imports = {
    /* imports go here */
  }
  // console.log('oye bhai ye dekh')
  fs.writeFileSync(path.join(__dirname, '../assembly/index.ts'), req.body.code)

  exec('npm run asbuild', (err, stdout, stderr) => {
    try {
      if (err) {
        throw new Error(err)
      } else {
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
        const now = Date.now()
        bucket
          .upload(path.join(__dirname, '../build/optimized.wasm'), {
            destination: `${now}.wasm`,
          })
          .then((x) => {
            console.log('file uploaded')
            return res.send({
              fileName: now,
            })
          })
      }
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  })
}

module.exports = wasm
