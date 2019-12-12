const fs = require('fs')
const { lcm } = require('./algorithms')

const Vector = class {
  constructor (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  add (v) {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  subtract (v) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  compare (v) {
    const g = v.subtract(this)
    g.x = Math.max(-1, Math.min(g.x, 1))
    g.y = Math.max(-1, Math.min(g.y, 1))
    g.z = Math.max(-1, Math.min(g.z, 1))
    return g
  }

  norm () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }

  toString () {
    return `<x=${this.x}, y=${this.y}, z=${this.z}>`
  }
}

const Moon = class {
  constructor (x, y, z) {
    this.initialPosition = new Vector(x, y, z)
    this.position = new Vector(x, y, z)
    this.velocity = new Vector(0, 0, 0)
  }

  totalEnergy () {
    return this.position.norm() * this.velocity.norm()
  }

  isInitialState () {
    return [
      this.position.x === this.initialPosition.x && this.velocity.x === 0,
      this.position.y === this.initialPosition.y && this.velocity.y === 0,
      this.position.z === this.initialPosition.z && this.velocity.z === 0
    ]
  }

  toString () {
    return `pos=${this.position}, vel=${this.velocity}`
  }
}

const JupiterSystem = class {
  constructor (moons) {
    this.moons = moons.map(moon => new Moon(...moon))
  }

  applyGravity () {
    for (let i = 0; i < this.moons.length - 1; i++) {
      const m1 = this.moons[i]
      for (let j = i + 1; j < this.moons.length; j++) {
        const m2 = this.moons[j]
        const gravity = m1.position.compare(m2.position)
        m1.velocity = m1.velocity.add(gravity)
        m2.velocity = m2.velocity.subtract(gravity)
      }
    }
  }

  applyVelocity () {
    for (const moon of this.moons) {
      moon.position = moon.position.add(moon.velocity)
    }
  }

  totalEnergy () {
    return this.moons.reduce((energy, moon) => moon.totalEnergy() + energy, 0)
  }

  isInitialState () {
    return this.moons.reduce((initial, moon) => {
      const axes = moon.isInitialState()
      return [initial[0] && axes[0], initial[1] && axes[1], initial[2] && axes[2]]
    }, [true, true, true])
  }

  toString () {
    return this.moons.map(moon => moon.toString()).join('\n')
  }
}

if (require.main === module) {
  fs.readFile('./day_12_input', 'utf8', (err, data) => {
    if (err) throw err

    // const moons = [[-1, 0, 2], [2, -10, -7], [4, -8, 8], [3, 5, -1]]
    // const moons = [[-8, -10, 0], [5, 5, 10], [2, -7, 3], [9, -8, -3]]
    const moons = data.trim().split('\n').map(line => {
      return line.match(/(-?\d+)/g).map(x => parseInt(x))
    })

    const j = new JupiterSystem(moons)
    console.log(j.toString())

    const periods = [0, 0, 0]
    for (let i = 0; ; i++) {
      j.applyGravity()
      j.applyVelocity()

      for (let k = 0; k < 3; k++) {
        const axes = j.isInitialState()
        if (periods[k] === 0 && axes[k]) {
          periods[k] = i + 1
        }
      }
      if (periods.every(p => p !== 0)) {
        break
      }
    }
    console.log(j.totalEnergy())
    console.log(j.toString())
    console.log(lcm(...periods))
  })
}
