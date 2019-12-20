const fs = require('fs')
const Intcode = require('./intcode')
const { binarySearch } = require('./algorithms')

if (require.main === module) {
  fs.readFile('./day_19_input', 'utf8', (err, data) => {
    if (err) throw err
    let beamSize = 0
    const beamReadings = []

    for (let i = 1248; i < 1348; i++) {
      const row = []
      for (let j = 1122; j < 1222; j++) {
        const intcode = new Intcode(data.trim())
        intcode.inputs = [j, i]
        intcode.execute()
        if (intcode.output === 1) {
          beamSize++
          row.push('#')
        } else {
          row.push('.')
        }
      }
      beamReadings.push(row)
    }
    for (let i = 0; i < beamReadings.length; i++) {
      console.log(i + 1247, beamReadings[i].join(''))
    }
    console.log(beamSize)

    const squareSize = 100
    console.log(binarySearch(1000, 10000, y => {
      const top = y

      let x = 0
      for (;;) {
        const intcode = new Intcode(data.trim())
        intcode.inputs = [x, y]
        intcode.execute()
        if (intcode.output === 1) break
        x++
      }
      const left = x

      for (;;) {
        const intcode = new Intcode(data.trim())
        intcode.inputs = [x, y]
        intcode.execute()
        if (intcode.output === 0) break
        x++
      }
      const right = x - 1
      if (right - left < squareSize) {
        console.log(y, 'too narrow', left, right)
        return -1
      }

      let intcode = new Intcode(data.trim())
      intcode.inputs = [right - squareSize + 1, top + squareSize - 1]
      intcode.execute()
      if (intcode.output === 0) {
        console.log(y, 'too short')
        return -1
      }

      console.log(y, [right, top], [left, top + squareSize - 1])

      intcode = new Intcode(data.trim())
      intcode.inputs = [right - squareSize + 1, top + squareSize]
      intcode.execute()
      if (intcode.output !== 0) {
        return 1
      }

      console.log(y, [right, top], [left, top + squareSize - 1])
      return 0
    }))
  })
}
