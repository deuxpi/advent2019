const fs = require('fs')

function fuel (mass) {
  return Math.floor(mass / 3) - 2
}

function recursiveFuel (mass) {
  let totalFuel = fuel(mass)
  mass = totalFuel

  let extraFuel
  while ((extraFuel = fuel(mass)) > 0) {
    totalFuel += extraFuel
    mass = extraFuel
  }

  return totalFuel
}

if (require.main === module) {
  fs.readFile('./day_1_input', 'utf8', (err, data) => {
    if (err) throw err
    const totalFuel = data
      .trim()
      .split('\n')
      .reduce((total, mass) => { return recursiveFuel(parseInt(mass)) + total }, 0)

    console.log(totalFuel)
  })
}

module.exports.fuel = fuel
module.exports.recursiveFuel = recursiveFuel
