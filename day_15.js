const fs = require('fs')
const Intcode = require('./intcode')

const RepairDroid = class {
  constructor () {
    this.position = [0, 0]
    this.map = { '0,0': '.' }
    this.previousDirection = 1
    this.steps = 0
  }

  getDirection () {
    const rightTurn = [4, 3, 1, 2][this.previousDirection - 1]
    if (
      this.map[this.getPosition(rightTurn)] === '#' &&
      this.map[this.getPosition(this.previousDirection)] !== '#'
    ) {
      return this.previousDirection
    }
    if (this.map[this.getPosition(rightTurn)] !== '#') {
      return rightTurn
    }
    const leftTurn = [3, 4, 2, 1][this.previousDirection - 1]
    if (this.map[this.getPosition(leftTurn)] !== '#') {
      return leftTurn
    }
    const turnAround = [2, 1, 4, 3][this.previousDirection - 1]
    if (this.map[this.getPosition(turnAround)] !== '#') {
      return turnAround
    }
    throw (this.previousDirection)
  }

  move (direction, statusCode) {
    if (statusCode === 0) {
      this.map[this.getPosition(direction)] = '#'
    } else if (statusCode === 1) {
      this.position = this.getPosition(direction)
      if (this.map[this.position] === '.') {
        this.steps--
      } else {
        this.steps++
      }
      this.map[this.position] = '.'
      this.previousDirection = direction
    } else if (statusCode === 2) {
      this.position = this.getPosition(direction)
      this.map[this.position] = 'O'
      this.oxygenSystemPosition = this.position
      this.previousDirection = direction
      this.steps++
    }
  }

  getPosition (direction) {
    if (direction === 1) {
      return [this.position[0], this.position[1] - 1]
    } else if (direction === 2) {
      return [this.position[0], this.position[1] + 1]
    } else if (direction === 3) {
      return [this.position[0] - 1, this.position[1]]
    } else if (direction === 4) {
      return [this.position[0] + 1, this.position[1]]
    }
  }

  printMap () {
    let minX = 0
    let maxX = 0
    let minY = 0
    let maxY = 0
    for (const position of Object.keys(this.map)) {
      const [x, y] = position.split(',').map(x => parseInt(x))
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }
    for (let i = minY; i <= maxY; i++) {
      const row = []
      for (let j = minX; j <= maxX; j++) {
        if (j === 0 && i === 0) {
          row.push('x')
        } else if (j === this.position[0] && i === this.position[1]) {
          row.push('D')
        } else {
          row.push(this.map[[j, i]] || ' ')
        }
      }
      console.log(row.join(''))
    }
  }
}

const OxygenSystem = class {
  constructor (map, systemLocation) {
    this.map = map
    this.systemLocation = systemLocation
    this.minutes = 0
  }

  fill () {
    const locations = [{ x: this.systemLocation[0], y: this.systemLocation[1], depth: 0 }]
    while (locations.length > 0) {
      const { x, y, depth } = locations.pop()
      if (this.map[[x, y - 1]] === '.') {
        locations.push({ x: x, y: y - 1, depth: depth + 1 })
        this.map[[x, y - 1]] = 'O'
        this.minutes = Math.max(this.minutes, depth + 1)
      }
      if (this.map[[x, y + 1]] === '.') {
        locations.push({ x: x, y: y + 1, depth: depth + 1 })
        this.map[[x, y + 1]] = 'O'
        this.minutes = Math.max(this.minutes, depth + 1)
      }
      if (this.map[[x - 1, y]] === '.') {
        locations.push({ x: x - 1, y: y, depth: depth + 1 })
        this.map[[x - 1, y]] = 'O'
        this.minutes = Math.max(this.minutes, depth + 1)
      }
      if (this.map[[x + 1, y]] === '.') {
        locations.push({ x: x + 1, y: y, depth: depth + 1 })
        this.map[[x + 1, y]] = 'O'
        this.minutes = Math.max(this.minutes, depth + 1)
      }
    }
  }
}

if (require.main === module) {
  const droid = new RepairDroid()

  fs.readFile('./day_15_input', 'utf8', (err, data) => {
    if (err) throw err
    const intcode = new Intcode(data.trim())

    let state = 'searching'
    let exploration = 0

    while (!intcode.halted) {
      const direction = droid.getDirection()
      intcode.inputs = [direction]
      intcode.execute()
      const statusCode = intcode.output
      droid.move(direction, statusCode)

      if (state === 'searching' && droid.oxygenSystemPosition) {
        droid.printMap()
        console.log(droid.steps)
        state = 'exploring'
      }

      if (state === 'exploring' && exploration++ > 10000) {
        droid.printMap()
        break
      }
    }

    const oxygen = new OxygenSystem(droid.map, droid.oxygenSystemPosition)
    oxygen.fill()
    droid.printMap()
    console.log(oxygen.minutes)
  })
}
