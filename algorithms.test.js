const { gcd, lcm } = require('./algorithms')

test('gcd(21, 6)', () => {
  expect(gcd(21, 6)).toBe(3)
})

test('lcm(21,6)', () => {
  expect(lcm(21, 6)).toBe(42)
})

test('lcm(8, 9, 21)', () => {
  expect(lcm(8, 9, 21)).toBe(504)
})
