const Password = require('./day_4')

test('112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long', () => {
  expect(new Password().noTriplets([1, 1, 2, 2, 3, 3])).toBeTruthy()
})

test('123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444', () => {
  expect(new Password().noTriplets([1, 2, 3, 4, 4, 4])).toBeFalsy()
})

test('111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22)', () => {
  expect(new Password().noTriplets([1, 1, 1, 1, 2, 2])).toBeTruthy()
})
