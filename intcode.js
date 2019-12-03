const fs = require('fs')

const Intcode = class {
  constructor (program) {
    this.program = program
    this.programCounter = 0
  }

  executeNext () {
    const opcode = this.fetch(this.programCounter)
    const impl = {
      1: () => {
        const arg1 = this.fetch(this.programCounter + 1)
        const arg2 = this.fetch(this.programCounter + 2)
        this.memory[this.fetch(this.programCounter + 3)] = this.fetch(arg1) + this.fetch(arg2)
        this.programCounter += 4
        return true
      },
      2: () => {
        const arg1 = this.fetch(this.programCounter + 1)
        const arg2 = this.fetch(this.programCounter + 2)
        this.memory[this.fetch(this.programCounter + 3)] = this.fetch(arg1) * this.fetch(arg2)
        this.programCounter += 4
        return true
      },
      99: () => { return false }
    }
    return impl[opcode]()
  }

  setInputs (noun, verb) {
    this.memory[1] = noun
    this.memory[2] = verb
  }

  execute () {
    while (this.executeNext()) {}
  }

  fetch (address) {
    return this.memory[address]
  }

  get program () {
    return this.memory.join(',')
  }

  set program (program) {
    this.memory = program
      .split(',')
      .map((i) => { return parseInt(i) })
  }
}

if (require.main === module) {
  fs.readFile('./day_2_input', 'utf8', (err, data) => {
    if (err) throw err
    const program = data.trim()
    const intcode = new Intcode(program)
    intcode.setInputs(31, 46)
    intcode.execute()
    console.log(intcode.fetch(0))
  })
}

module.exports = Intcode
