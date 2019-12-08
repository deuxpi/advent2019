function fromLehmerCode (elements, d) {
  const n = d.length
  const permutation = []
  for (let i = 0; i < n; i++) {
    permutation.push(elements[d[i]])
    elements.splice(d[i], 1)
  }
  return permutation
}

function factorials (n) {
  const d = []
  const f = []
  for (let i = 0; i < n; i++) {
    d.push(0)
  }
  while (true) {
    f.push(d.slice().reverse())
    let carry = 1
    for (let i = 0; i < n; i++) {
      d[i] += carry
      if (d[i] > i) {
        d[i] = 0
        carry = 1
      } else {
        carry = 0
      }
    }
    if (carry === 1) {
      break
    }
  }
  return f
}

function permutations (elements) {
  return factorials(elements.length).map((f) => {
    return fromLehmerCode(elements.slice(), f)
  })
}

module.exports.fromLehmerCode = fromLehmerCode
module.exports.factorials = factorials
module.exports.permutations = permutations
