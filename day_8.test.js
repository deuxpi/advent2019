const Image = require('./day_8')

test('the image data 123456789012 corresponds to the following image layers', () => {
  const im = new Image('123456789012', 3, 2)
  expect(im.layers).toHaveLength(2)
  expect(im.layers[0]).toStrictEqual('123456')
  expect(im.layers[1]).toStrictEqual('789012')
})
