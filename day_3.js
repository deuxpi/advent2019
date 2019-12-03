const fs = require('fs')

const Segment = class {
  constructor (location, direction, distance) {
    this.start = location
    this.end = {
      U: { x: location.x, y: location.y - distance },
      D: { x: location.x, y: location.y + distance },
      L: { x: location.x - distance, y: location.y },
      R: { x: location.x + distance, y: location.y }
    }[direction]
    this.orientation = {
      U: 'V',
      D: 'V',
      L: 'H',
      R: 'H'
    }[direction]
  }

  crossingPoint (otherSegment) {
    let distance = Infinity

    if (
      this.orientation === 'V' &&
      otherSegment.orientation === 'H' &&
      this.inside(this.start.y, this.end.y, otherSegment.start.y) &&
      this.inside(otherSegment.start.x, otherSegment.end.x, this.start.x)
    ) {
      distance = Math.abs(this.start.x) + Math.abs(otherSegment.start.y)
    }

    if (
      this.orientation === 'H' &&
      otherSegment.orientation === 'V' &&
      this.inside(this.start.x, this.end.x, otherSegment.start.x) &&
      this.inside(otherSegment.start.y, otherSegment.end.y, this.start.y)
    ) {
      distance = Math.abs(this.start.y) + Math.abs(otherSegment.start.x)
    }

    if (distance === 0) distance = Infinity

    return distance
  }

  inside (p1, p2, q) {
    return q >= Math.min(p1, p2) && q <= Math.max(p1, p2)
  }
}

function makePath (wire) {
  let location = { x: 0, y: 0 }
  return wire.split(',').map((m) => {
    const direction = m[0]
    const distance = parseInt(m.slice(1))
    const s = new Segment(location, direction, distance)
    location = s.end
    return s
  })
}

function distance (firstWire, secondWire) {
  const firstPath = makePath(firstWire)
  const secondPath = makePath(secondWire)
  return firstPath.reduce((d1, segment) => {
    return Math.min(d1, secondPath.reduce((d2, otherSegment) => {
      return Math.min(d2, segment.crossingPoint(otherSegment))
    }, Infinity))
  }, Infinity)
}

if (require.main === module) {
  fs.readFile('./day_3_input', 'utf8', (err, data) => {
    if (err) throw err
    const wires = data.trim().split('\n')
    console.log(distance(wires[0], wires[1]))
  })
}

module.exports = distance
