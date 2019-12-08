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

test('1002,4,3,4,33 becomes 1002,4,3,4,99', () => {
  const intcode = new Intcode('1002,4,3,4,33')
  intcode.execute()
  expect(intcode.program).toBe('1002,4,3,4,99')
})

test('1101,100,-1,4,0 becomes 1101,100,-1,4,99', () => {
  const intcode = new Intcode('1101,100,-1,4,0')
  intcode.execute()
  expect(intcode.program).toBe('1101,100,-1,4,99')
})

test('3,0,4,0,99 outputs whatever it gets as input', () => {
  const intcode = new Intcode('3,0,4,0,99')
  intcode.inputs = [50]
  intcode.execute()
  expect(intcode.output).toBe(50)
})

test('3,9,8,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not)', () => {
  let intcode = new Intcode('3,9,8,9,10,9,4,9,99,-1,8')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(1)

  intcode = new Intcode('3,9,8,9,10,9,4,9,99,-1,8')
  intcode.inputs = [9]
  intcode.execute()
  expect(intcode.output).toBe(0)
})

test('3,9,7,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not)', () => {
  let intcode = new Intcode('3,9,7,9,10,9,4,9,99,-1,8')
  intcode.inputs = [7]
  intcode.execute()
  expect(intcode.output).toBe(1)

  intcode = new Intcode('3,9,7,9,10,9,4,9,99,-1,8')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(0)
})

test('3,3,1108,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not)', () => {
  let intcode = new Intcode('3,3,1108,-1,8,3,4,3,99')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(1)

  intcode = new Intcode('3,3,1108,-1,8,3,4,3,99')
  intcode.inputs = [9]
  intcode.execute()
  expect(intcode.output).toBe(0)
})

test('3,3,1107,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not)', () => {
  let intcode = new Intcode('3,3,1107,-1,8,3,4,3,99')
  intcode.inputs = [7]
  intcode.execute()
  expect(intcode.output).toBe(1)

  intcode = new Intcode('3,3,1107,-1,8,3,4,3,99')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(0)
})

test('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 (using position mode)', () => {
  let intcode = new Intcode('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
  intcode.inputs = [0]
  intcode.execute()
  expect(intcode.output).toBe(0)

  intcode = new Intcode('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(1)
})

test('3,3,1105,-1,9,1101,0,0,12,4,12,99,1 (using immediate mode)', () => {
  let intcode = new Intcode('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
  intcode.inputs = [0]
  intcode.execute()
  expect(intcode.output).toBe(0)

  intcode = new Intcode('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(1)
})

test('larger example', () => {
  let intcode = new Intcode('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
  intcode.inputs = [7]
  intcode.execute()
  expect(intcode.output).toBe(999)

  intcode = new Intcode('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
  intcode.inputs = [8]
  intcode.execute()
  expect(intcode.output).toBe(1000)

  intcode = new Intcode('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
  intcode.inputs = [9]
  intcode.execute()
  expect(intcode.output).toBe(1001)
})
