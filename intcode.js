const fs = require('fs')

const Intcode = class {
  constructor (program) {
    this.program = program
    this.programCounter = 0
  }

  executeNext () {
    const opcode = this.programCode[this.programCounter]
    const impl = {
      1: () => {
        const op1 = this.programCode[this.programCounter + 1]
        const op2 = this.programCode[this.programCounter + 2]
        this.programCode[this.programCode[this.programCounter + 3]] = this.programCode[op1] + this.programCode[op2]
        this.programCounter += 4
        return true
      },
      2: () => {
        const op1 = this.programCode[this.programCounter + 1]
        const op2 = this.programCode[this.programCounter + 2]
        this.programCode[this.programCode[this.programCounter + 3]] = this.programCode[op1] * this.programCode[op2]
        this.programCounter += 4
        return true
      },
      99: () => { return false }
    }
    return impl[opcode]()
  }

  rollback () {
    this.programCode[1] = 12
    this.programCode[2] = 2
  }

  execute () {
    while (this.executeNext()) {}
  }

  get program () {
    return this.programCode.join(',')
  }

  set program (program) {
    this.programCode = program.split(',').map((i) => { return parseInt(i) })
  }
}

if (require.main === module) {
  fs.readFile('./day_2.input', 'utf8', (err, data) => {
    if (err) throw err
    const program = data.trim()
    const intcode = new Intcode(program)
    intcode.rollback()
    intcode.execute()
    console.log(intcode.program)
  })
}

module.exports = Intcode
