const fs = require('fs')

const nodes = {}

function countOrbits (node, depth) {
  depth = depth || 0
  if (node.length === 0) {
    return depth
  } else {
    return node.reduce((orbits, satellite) => {
      const childNode = nodes[satellite]
      return orbits + countOrbits(childNode, depth + 1)
    }, 0) + depth
  }
}

function trace (target, planet) {
  if (nodes[planet].includes(target)) {
    return [planet]
  } else if (nodes[planet].length !== 0) {
    const found = nodes[planet]
      .map((satellite) => trace(target, satellite))
      .find((path) => { return path })
    if (found) {
      return [planet].concat(found)
    }
  }
}

if (require.main === module) {
  fs.readFile('./day_6_input', 'utf8', (err, data) => {
    if (err) throw err
    data.trim().split('\n').forEach((orbit) => {
      const [planet, satellite] = orbit.split(')')
      if (!(planet in nodes)) {
        nodes[planet] = []
      }
      if (!(satellite in nodes)) {
        nodes[satellite] = []
      }
      nodes[planet].push(satellite)
    })

    const root = nodes.COM
    console.log(countOrbits(root))

    const youTrace = trace('YOU', 'COM')
    const santaTrace = trace('SAN', 'COM')
    let common = 0
    while (youTrace[common] === santaTrace[common]) {
      common++
    }
    console.log(youTrace.length - common + santaTrace.length - common)
  })
}
