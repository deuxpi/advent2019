const FakeFourierTransform = require('./day_16')

test('12345678', () => {
  const fft = new FakeFourierTransform(12345678)
  fft.phase(4)
  expect(fft.input).toStrictEqual([0, 1, 0, 2, 9, 4, 9, 8])
})

test('80871224585914546619083218645595', () => {
  const fft = new FakeFourierTransform('80871224585914546619083218645595')
  fft.phase(100)
  expect(fft.input.slice(0, 8)).toStrictEqual([2, 4, 1, 7, 6, 1, 7, 6])
})

test('19617804207202209144916044189917', () => {
  const fft = new FakeFourierTransform('19617804207202209144916044189917')
  fft.phase(100)
  expect(fft.input.slice(0, 8)).toStrictEqual([7, 3, 7, 4, 5, 4, 1, 8])
})

test('69317163492948606335995924319873', () => {
  const fft = new FakeFourierTransform('69317163492948606335995924319873')
  fft.phase(100)
  expect(fft.input.slice(0, 8)).toStrictEqual([5, 2, 4, 3, 2, 1, 3, 3])
})
