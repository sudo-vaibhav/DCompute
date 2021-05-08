const wasm = (req, res) => {
  const imports = {
    /* imports go here */
  }
  const wasmModule = loader.instantiateSync(
    fs.readFileSync(__dirname + '/build/optimized.wasm'),
    imports,
  )

  let startTime, endTime
  let result = ''

  const pre = () => {
    result += 'running WASM binary ✓\n'
    startTime = new Date()
    result += `started at ${startTime.toLocaleString()}\n`
  }

  const post = () => {
    endTime = new Date()
    result += `finished at ${endTime.toLocaleString()}\n`
    const diff = endTime - startTime
    result += `processed in ${diff} milliseconds ✓\n`
  }

  pre()
  result +=
    '=====================\nBEGIN OUTPUT STREAM:\n=====================\n'
  result += wasmModule.exports.run(...[20, 23])
  result +=
    '\n=====================\nEND OF OUTPUT STREAM:\n=====================\n'
  post()
  console.log(result)
  return res.send(result)
}

module.exports = wasm
