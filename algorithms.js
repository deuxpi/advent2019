function gcd (a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b]
  }
  return Math.abs(a)
}

function lcm (a, b, c, ...rest) {
  if (b === undefined) return a
  return lcm(Math.abs(a * b) / gcd(a, b), c, ...rest)
}

module.exports.gcd = gcd
module.exports.lcm = lcm
