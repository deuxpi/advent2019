const AsteroidField = require('./day_10')

test('the best location for a new monitoring station on this map is the highlighted asteroid at 3,4 because it can detect 8 asteroids', () => {
  const af = new AsteroidField([
    '.#..#',
    '.....',
    '#####',
    '....#',
    '...##'
  ])
  expect(af.numAsteroidsFromBestLocation()).toBe(8)
})

test('best is 5,8 with 33 other asteroids detected', () => {
  const af = new AsteroidField([
    '......#.#.',
    '#..#.#....',
    '..#######.',
    '.#.#.###..',
    '.#..#.....',
    '..#....#.#',
    '#..#....#.',
    '.##.#..###',
    '##...#..#.',
    '.#....####'
  ])
  expect(af.numAsteroidsFromBestLocation()).toBe(33)
})

test('vaporized asteroids', () => {
  const af = new AsteroidField([
    '.#....#####...#..',
    '##...##.#####..##',
    '##...#...#.#####.',
    '..#.....#...###..',
    '..#.#.....#....##'
  ])
  expect(af.laserTargets([8, 3])).toStrictEqual([
    [8, 1],
    [9, 0],
    [9, 1],
    [10, 0],
    [9, 2],
    [11, 1],
    [12, 1],
    [11, 2],
    [15, 1],
    [12, 2],
    [13, 2],
    [14, 2],
    [15, 2],
    [12, 3],
    [16, 4],
    [15, 4],
    [10, 4],
    [4, 4],
    [2, 4],
    [2, 3],
    [0, 2],
    [1, 2],
    [0, 1],
    [1, 1],
    [5, 2],
    [1, 0],
    [5, 1],
    [6, 1],
    [6, 0],
    [7, 0],
    [8, 0],
    [10, 1],
    [14, 0],
    [16, 1],
    [13, 3],
    [14, 3]
  ])
})
