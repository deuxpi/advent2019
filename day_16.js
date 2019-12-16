const fs = require('fs')

function digits (n) {
  return ('' + n).split('')
}

const FakeFourierTransform = class {
  constructor (input) {
    this.input = digits(input)
  }

  applyPattern (pattern) {
    const output = []
    for (let i = 0; i < this.input.length; i++) {
      let value = 0
      for (let j = 0; j < this.input.length; j++) {
        value += this.input[j] * pattern[(Math.floor((j + 1) / (i + 1))) % pattern.length]
      }
      output.push(Math.abs(value) % 10)
    }
    return output
  }

  phase (n) {
    for (let i = 0; i < n; i++) {
      this.input = this.applyPattern([0, 1, 0, -1])
    }
  }
}

if (require.main === module) {
  fs.readFile('./day_16_input', 'utf8', (err, data) => {
    if (err) throw err
    const fft = new FakeFourierTransform(data.trim())
    fft.phase(100)
    console.log(fft.input.slice(0, 8).join(''))
  })
}

module.exports = FakeFourierTransform
