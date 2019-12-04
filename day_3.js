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
    this.distance = distance
  }

  crossingPoint (otherSegment) {
    if (
      this.orientation === 'V' &&
      otherSegment.orientation === 'H' &&
      this.inside(this.start.y, this.end.y, otherSegment.start.y) &&
      this.inside(otherSegment.start.x, otherSegment.end.x, this.start.x)
    ) {
      return { x: this.start.x, y: otherSegment.start.y }
    }

    if (
      this.orientation === 'H' &&
      otherSegment.orientation === 'V' &&
      this.inside(this.start.x, this.end.x, otherSegment.start.x) &&
      this.inside(otherSegment.start.y, otherSegment.end.y, this.start.y)
    ) {
      return { x: otherSegment.start.x, y: this.start.y }
    }
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
      const point = segment.crossingPoint(otherSegment)
      if (point && (point.x !== 0 || point.y !== 0)) {
        return Math.min(d2, Math.abs(point.x) + Math.abs(point.y))
      } else {
        return d2
      }
    }, Infinity))
  }, Infinity)
}

function numberOfSteps (firstWire, secondWire) {
  const firstPath = makePath(firstWire)
  const secondPath = makePath(secondWire)

  let firstPathSteps = 0

  return firstPath.reduce((d1, segment) => {
    let secondPathSteps = 0

    const newD1 = secondPath.reduce((d2, otherSegment) => {
      const point = segment.crossingPoint(otherSegment)

      if (point && (point.x !== 0 || point.y !== 0)) {
        const d3 = (
          firstPathSteps +
          secondPathSteps +
          Math.abs(segment.start.x - point.x) +
          Math.abs(segment.start.y - point.y) +
          Math.abs(otherSegment.start.x - point.x) +
          Math.abs(otherSegment.start.y - point.y)
        )
        d2 = Math.min(d2, d3)
      }

      secondPathSteps += otherSegment.distance
      return d2
    }, Infinity)

    firstPathSteps += segment.distance
    return Math.min(d1, newD1)
  }, Infinity)
}

if (require.main === module) {
  fs.readFile('./day_3_input', 'utf8', (err, data) => {
    if (err) throw err
    const wires = data.trim().split('\n')
    console.log(distance(wires[0], wires[1]))
    console.log(numberOfSteps(wires[0], wires[1]))
  })
}

module.exports.distance = distance
module.exports.numberOfSteps = numberOfSteps
