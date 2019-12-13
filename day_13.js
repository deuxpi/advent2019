const fs = require('fs')
const Intcode = require('./intcode')

function printMap (map) {
  for (let i = 0; i < map.length; i++) {
    console.log(map[i].join(''))
  }
}

if (require.main === module) {
  fs.readFile('./day_13_input', 'utf8', (err, data) => {
    if (err) throw err
    const map = []
    for (let i = 0; i < 22; i++) {
      const row = []
      for (let j = 0; j < 40; j++) {
        row.push(' ')
      }
      map.push(row)
    }
    const intcode = new Intcode(data.trim())
    intcode.store(2, 0)
    intcode.inputs = [0]

    let state = 0
    let x, y, paddleX, ballX, ballY
    const stats = {
      '#': 0,
      '=': 0,
      '-': 0,
      '.': 0
    }
    while (!intcode.halted) {
      intcode.execute()

      if (state === 0) {
        x = intcode.output
      } else if (state === 1) {
        y = intcode.output
      } else if (x === -1 && y === 0) {
        console.log(`score: ${intcode.output}`)
      } else {
        const tileId = [' ', '#', '=', '-', '.'][intcode.output]
        if (map[y][x] !== ' ') {
          stats[map[y][x]]--
        }
        if (tileId !== ' ') {
          stats[tileId]++
        }

        map[y][x] = tileId
        if (tileId === '-') {
          paddleX = x
        } else if (tileId === '.') {
          [ballX, ballY] = [x, y]
        }

        intcode.inputs = [paddleX > ballX ? -1 : (paddleX < ballX ? 1 : 0)]

        if (tileId !== ' ') {
          printMap(map)
        }
      }
      state = (state + 1) % 3
    }
    console.log(stats['='])
  })
}
