const fs = require('fs')

const Image = class {
  constructor (raw, width, height) {
    this.width = width
    this.height = height
    this.imageSize = width * height

    const numLayers = raw.length / this.imageSize
    this.layers = []
    for (let i = 0; i < numLayers; i++) {
      this.layers.push(raw.slice(this.imageSize * i, this.imageSize * (i + 1)))
    }
  }

  stack () {
    const im = []
    for (let i = 0; i < this.imageSize; i++) {
      for (let j = 0; j < this.layers.length; j++) {
        if (this.layers[j][i] !== '2') {
          im.push(this.layers[j][i])
          break
        }
      }
    }
    return im.join('')
  }

  pp (im) {
    for (let i = 0; i < this.height; i++) {
      console.log(im.slice(this.width * i, this.width * (i + 1)).replace(/0/g, ' '))
    }
  }
}

if (require.main === module) {
  fs.readFile('./day_8_input', 'utf8', (err, data) => {
    if (err) throw err
    const im = new Image(data.trim(), 25, 6)

    let layerIndex
    let minZeroDigits = Infinity
    for (let i = 0; i < im.layers.length; i++) {
      const numZeroDigits = im.layers[i].match(/0/g).length
      if (numZeroDigits < minZeroDigits) {
        minZeroDigits = numZeroDigits
        layerIndex = i
      }
    }
    const layer = im.layers[layerIndex]
    console.log(layer.match(/1/g).length * layer.match(/2/g).length)

    console.log(im.pp(im.stack()))
  })
}

module.exports = Image
