const fs = require('fs')
const Intcode = require('./intcode')

fs.readFile('./day_9_input', 'utf8', (err, data) => {
  if (err) throw err
  const intcode = new Intcode(data.trim())
  intcode.inputs = [2]
  while (!intcode.halted) {
    intcode.execute()
    if (!intcode.halted) {
      console.log(intcode.output)
    }
  }
})
