const fs = require('fs')

const ReactionGraph = class {
  constructor () {
    this.reactions = new Map()
  }

  addReaction (reaction) {
    const [lh, rh] = reaction.split(' => ')
    const reactants = lh.split(', ').map(r => this.parseChemical(r))
    const product = this.parseChemical(rh)
    for (const reactant of reactants) {
      if (!this.reactions.has(reactant.material)) {
        this.reactions.set(reactant.material, [])
      }
      this.reactions.get(reactant.material).push({
        product: product,
        quantityRequired: reactant.quantity
      })
    }
  }

  parseChemical (r) {
    const [quantity, material] = r.split(' ')
    return { material: material, quantity: parseInt(quantity) }
  }

  orePerFuel (fuel = 1) {
    this.requiredFuel = fuel
    return this.computeRequirements('ORE')
  }

  computeRequirements (material) {
    if (material === 'FUEL') {
      return this.requiredFuel
    }
    return this.reactions.get(material).reduce((quantity, reaction) => {
      return quantity + reaction.quantityRequired * Math.ceil(this.computeRequirements(reaction.product.material) / reaction.product.quantity)
    }, 0)
  }

  fuel (ore) {
    let f = Math.floor(ore / this.orePerFuel())
    const fuelRange = { min: f, max: f }
    for (;;) {
      if (this.orePerFuel(f) > ore) {
        fuelRange.max = f
        break
      } else {
        fuelRange.min = f
        f *= 2
      }
    }

    while (fuelRange.min < fuelRange.max) {
      f = Math.ceil((fuelRange.min + fuelRange.max) / 2)
      if (this.orePerFuel(f) > ore) {
        fuelRange.max = f - 1
      } else if (this.orePerFuel(f) === ore) {
        return f
      } else {
        fuelRange.min = f + 1
      }
    }

    return fuelRange.max
  }
}

if (require.main === module) {
  fs.readFile('./day_14_input', 'utf8', (err, data) => {
    if (err) throw err
    const graph = new ReactionGraph()
    graph.debug = true
    for (const reaction of data.trim().split('\n')) {
      graph.addReaction(reaction)
    }
    console.log(graph.orePerFuel())
    console.log(graph.fuel(1000000000000))
  })
}

module.exports = ReactionGraph
