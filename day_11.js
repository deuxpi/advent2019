const fs = require('fs')
const Intcode = require('./intcode')

const HullPaintingRobot = class {
  constructor (program) {
    this.whitePanels = new Set(['0,0'])
    this.paintedPanels = new Set(['0,0'])
    this.direction = [-1, 0]
    this.position = [0, 0]
    this.intcode = new Intcode(program)
    this.intcode.inputs = []
  }

  execute () {
    this.intcode.inputs.push(this.whitePanels.has(this.position.toString()) ? 1 : 0)
    this.intcode.execute()
    this.paint(this.intcode.output)
    this.intcode.execute()
    if (this.intcode.output === 0) {
      this.rotateLeft()
    } else {
      this.rotateRight()
    }
  }

  halted () {
    return this.intcode.halted
  }

  rotateLeft () {
    this.direction = [-this.direction[1], this.direction[0]]
    this.position[0] += this.direction[0]
    this.position[1] += this.direction[1]
  }

  rotateRight () {
    this.direction = [this.direction[1], -this.direction[0]]
    this.position[0] += this.direction[0]
    this.position[1] += this.direction[1]
  }

  paint (color) {
    this.paintedPanels.add(this.position.toString())
    if (color === 1) {
      this.whitePanels.add(this.position.toString())
    } else {
      this.whitePanels.delete(this.position.toString())
    }
  }
}

if (require.main === module) {
  fs.readFile('day_11_input', 'utf8', (err, data) => {
    if (err) throw err
    const robot = new HullPaintingRobot(data.trim())
    while (!robot.halted()) {
      robot.execute()
    }
    console.log(robot.paintedPanels.size)

    const grid = []
    for (let i = 0; i < 70; i++) {
      const line = []
      for (let j = 0; j < 100; j++) {
        line.push(' ')
      }
      grid.push(line)
    }
    for (const panel of robot.whitePanels) {
      console.log(panel)
      const position = panel.split(',').map((x) => { return parseInt(x) })
      grid[position[0]][position[1]] = '#'
    }
    for (let i = 0; i < 70; i++) {
      console.log(grid[i].join(''))
    }
  })
}

module.exports = HullPaintingRobot
