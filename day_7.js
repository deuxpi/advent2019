const fs = require('fs')
const Intcode = require('./intcode')
const { permutations } = require('./permutation')

const AmplifierControl = class {
  constructor (program) {
    this.program = program
  }

  thrusterSignal (phaseSettings, loop) {
    const intcodes = []
    let signal = 0
    let lastSignal = 0

    for (let i = 0; i < phaseSettings.length; i++) {
      intcodes.push(new Intcode(this.program.slice()))
    }

    for (let i = 0; i < phaseSettings.length; i++) {
      intcodes[i].inputs = [phaseSettings[i], signal]
      intcodes[i].execute()
      signal = intcodes[i].output
    }

    lastSignal = signal

    while (loop) {
      for (let i = 0; i < phaseSettings.length; i++) {
        intcodes[i].inputs = [signal]
        intcodes[i].execute()
        signal = intcodes[i].output
      }
      if (intcodes[4].halted) {
        loop = false
      } else {
        lastSignal = signal
      }
    }

    return lastSignal
  }
}

function maxThrusterSignal (program, phaseSettings, loop) {
  const ac = new AmplifierControl(program)
  return permutations(phaseSettings).reduce((maxThrusterSignal, phaseSetting) => {
    return Math.max(maxThrusterSignal, ac.thrusterSignal(phaseSetting, loop))
  }, -1)
}

if (require.main === module) {
  fs.readFile('./day_7_input', 'utf8', (err, data) => {
    if (err) throw err
    console.log(maxThrusterSignal(data.trim(), [0, 1, 2, 3, 4]))
    console.log(maxThrusterSignal(data.trim(), [5, 6, 7, 8, 9], true))
  })
}

module.exports = maxThrusterSignal
