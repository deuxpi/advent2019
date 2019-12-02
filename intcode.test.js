const Intcode = require('./intcode')

test('1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2)', () => {
  const intcode = new Intcode('1,0,0,0,99')
  intcode.execute()
  expect(intcode.program).toBe('2,0,0,0,99')
})

test('2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6)', () => {
  const intcode = new Intcode('2,3,0,3,99')
  intcode.execute()
  expect(intcode.program).toBe('2,3,0,6,99')
})

test('2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801)', () => {
  const intcode = new Intcode('2,4,4,5,99,0')
  intcode.execute()
  expect(intcode.program).toBe('2,4,4,5,99,9801')
})

test('1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99', () => {
  const intcode = new Intcode('1,1,1,4,99,5,6,0,99')
  intcode.execute()
  expect(intcode.program).toBe('30,1,1,4,2,5,6,0,99')
})
