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
    if (err) {
      //some err occurred
      console.error(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)

      // const wasmModule = loader.instantiateSync(
      //   fs.readFileSync(path.join(__dirname, '../build/optimized.wasm')),
      //   imports,
      // )

      // const file = bucket.file("bhai.wasm").create()
      // file.
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
          // console.log(x)
          // console.log('file uploaded', x.File.mediaLink)
        })

      // let startTime, endTime
      // let result = ''

      // const pre = () => {
      //   result += 'running WASM binary ✓\n'
      //   startTime = new Date()
      //   result += `started at ${startTime.toLocaleString()}\n`
      // }

      // const post = () => {
      //   endTime = new Date()
      //   result += `finished at ${endTime.toLocaleString()}\n`
      //   const diff = endTime - startTime
      //   result += `processed in ${diff} milliseconds ✓\n`
      // }

      // pre()
      // result +=
      //   '=====================\nBEGIN OUTPUT STREAM\n=====================\n'
      // result += wasmModule.exports.run(...req.body.inputData)
      // result +=
      //   '\n=====================\nEND OF OUTPUT STREAM\n=====================\n'
      // post()
      // console.log(result)
      // return res.send(result)
    }
  })
}

module.exports = wasm
