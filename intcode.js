const fs = require('fs')

const Intcode = class {
  constructor (program) {
    this.program = program
    this.halted = false
    this.programCounter = 0
    this.relativeBase = 0
    this.inputs = [1]
  }

  executeNext () {
    const { opcode, modes } = this.parseInstruction(this.load(this.programCounter))
    const impl = {
      1: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        this.store(this.load(arg1, modes[0]) + this.load(arg2, modes[1]), this.load(this.programCounter + 3), modes[2])
        this.programCounter += 4
        return true
      },
      2: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        this.store(this.load(arg1, modes[0]) * this.load(arg2, modes[1]), this.load(this.programCounter + 3), modes[2])
        this.programCounter += 4
        return true
      },
      3: () => {
        console.assert(this.inputs.length > 0)
        const arg1 = this.load(this.programCounter + 1)
        this.store(this.inputs.shift(), arg1, modes[0])
        this.programCounter += 2
        return true
      },
      4: () => {
        this.output = this.load(this.load(this.programCounter + 1), modes[0])
        this.programCounter += 2
        return false
      },
      5: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        if (this.load(arg1, modes[0]) !== 0) {
          this.programCounter = this.load(arg2, modes[1])
        } else {
          this.programCounter += 3
        }
        return true
      },
      6: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        if (this.load(arg1, modes[0]) === 0) {
          this.programCounter = this.load(arg2, modes[1])
        } else {
          this.programCounter += 3
        }
        return true
      },
      7: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        const arg3 = this.load(this.programCounter + 3)
        this.store(this.load(arg1, modes[0]) < this.load(arg2, modes[1]) ? 1 : 0, arg3, modes[2])
        this.programCounter += 4
        return true
      },
      8: () => {
        const arg1 = this.load(this.programCounter + 1)
        const arg2 = this.load(this.programCounter + 2)
        const arg3 = this.load(this.programCounter + 3)
        this.store(this.load(arg1, modes[0]) === this.load(arg2, modes[1]) ? 1 : 0, arg3, modes[2])
        this.programCounter += 4
        return true
      },
      9: () => {
        this.relativeBase += this.load(this.load(this.programCounter + 1), modes[0])
        this.programCounter += 2
        return true
      },
      99: () => {
        this.halted = true
        return false
      }
    }
    return impl[opcode]()
  }

  setInputs (noun, verb) {
    this.store(noun, 1)
    this.store(verb, 2)
  }

  execute () {
    while (this.executeNext()) {
      // empty
    }
  }

  executeAll () {
    const outputs = []
    while (!this.halted) {
      this.execute()
      if (!this.halted) outputs.push(this.output)
    }
    return outputs
  }

  parseInstruction (instruction) {
    const modes = [
      Math.floor((instruction % 1000) / 100),
      Math.floor((instruction % 10000) / 1000),
      Math.floor((instruction % 100000) / 10000)
    ]
    return { opcode: instruction % 100, modes: modes }
  }

  load (param, mode) {
    if (mode === 1) {
      return param
    } else if (mode === 2) {
      this.expandMemory(param + this.relativeBase)
      return this.memory[param + this.relativeBase]
    } else {
      this.expandMemory(param)
      return this.memory[param]
    }
  }

  store (value, address, mode) {
    if (mode === 2) {
      address += this.relativeBase
    }
    this.expandMemory(address)
    this.memory[address] = value
  }

  expandMemory (address) {
    console.assert(address >= 0)
    while (address >= this.memory.length) {
      this.memory.push(0)
    }
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
  })

  fs.readFile('./day_5_input', 'utf8', (err, data) => {
    if (err) throw err
    const program = data.trim()
    const intcode = new Intcode(program)
    intcode.inputs = [5]
    intcode.execute()
    console.log(intcode.output)
  })
}

module.exports = Intcode
