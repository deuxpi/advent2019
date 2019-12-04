const { distance, numberOfSteps } = require('./day_3')

describe('minimal Manhattan distance', () => {
  test('first example system', () => {
    expect(distance('R8,U5,L5,D3', 'U7,R6,D4,L4')).toBe(6)
  })

  test('second example system', () => {
    expect(distance('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toBe(159)
  })

  test('third example system', () => {
    expect(distance('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toBe(135)
  })
})

describe('minimal number of steps', () => {
  test('first example system', () => {
    expect(numberOfSteps('R8,U5,L5,D3', 'U7,R6,D4,L4')).toBe(30)
  })

  test('second example system', () => {
    expect(numberOfSteps('R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83')).toBe(610)
  })

  test('third example system', () => {
    expect(numberOfSteps('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7')).toBe(410)
  })
})
