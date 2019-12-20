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

function binarySearch (low, high, callback) {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (callback(mid) > 0) {
      high = mid - 1
    } else if (callback(mid) === 0) {
      return mid
    } else {
      low = mid + 1
    }
  }
}

module.exports.gcd = gcd
module.exports.lcm = lcm
module.exports.binarySearch = binarySearch
