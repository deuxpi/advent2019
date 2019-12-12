const fs = require('fs')
const { gcd } = require('./algorithms')

const AsteroidField = class {
  constructor (map) {
    this.map = map
  }

  asteroids () {
    const positions = []
    for (let i = 0; i < this.map.length; i++) {
      const line = this.map[i]
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '#') {
          positions.push([i, j])
        }
      }
    }
    return positions
  }

  normalize (reference, vector) {
    const relative = [vector[0] - reference[0], vector[1] - reference[1]]
    const f = gcd(relative[0], relative[1])
    return [f, [relative[0] / f, relative[1] / f]]
  }

  numAsteroidsFromBestLocation (debug) {
    const aa = this.asteroids()
    let maxVisible = 0
    let maxVisibleLocation
    for (let i = 0; i < aa.length; i++) {
      const a = aa[i]
      const p = {}
      for (let j = 0; j < aa.length; j++) {
        if (i === j) continue
        const [f, relativePosition] = this.normalize(a, aa[j])
        p[relativePosition] = Math.min(f, p[relativePosition] || Infinity)
      }
      if (Object.keys(p).length > maxVisible) {
        maxVisible = Object.keys(p).length
        maxVisibleLocation = [a[1], a[0]]
      }
    }
    if (debug) console.log(maxVisibleLocation)
    return maxVisible
  }

  laserTargets (station) {
    let aa = this.asteroids()
    const allTargets = []
    while (aa.length > 1) {
      const p = {}
      for (let i = 0; i < aa.length; i++) {
        if (station[1] === aa[i][0] && station[0] === aa[i][1]) continue
        const [f, relativePosition] = this.normalize([station[1], station[0]], aa[i])
        p[relativePosition] = Math.min(f, p[relativePosition] || Infinity)
      }
      let targets = []
      for (const position in p) {
        const f = p[position]
        const vector = position.split(',').map((x) => { return parseInt(x) })
        targets.push([vector[1] * f, vector[0] * f])
      }
      targets = targets
        .sort((first, second) => { return Math.atan2(second[0], second[1]) - Math.atan2(first[0], first[1]) })
        .map((target) => { return [target[0] + station[0], target[1] + station[1]] })
      Array.prototype.push.apply(allTargets, targets)
      aa = aa.filter((position) => {
        for (const target of targets) {
          if (position[0] === target[1] && position[1] === target[0]) {
            return false
          }
        }
        return true
      })
    }
    return allTargets
  }
}

if (require.main === module) {
  fs.readFile('./day_10_input', 'utf8', (err, data) => {
    if (err) throw err
    const map = data.trim().split('\n')
    const af = new AsteroidField(map)
    console.log(af.numAsteroidsFromBestLocation(true))
    console.log(af.laserTargets([37, 25])[199])
  })
}

module.exports = AsteroidField
