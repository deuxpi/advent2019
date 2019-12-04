function EndOfList () {
  this.message = 'no more digits'
}

const Password = class {
  constructor (minValue, maxValue) {
    this.minValue = minValue
    this.maxValue = maxValue
    this.adjacentIndex = 0
    this.digits = 11111
  }

  next () {
    while (true) {
      const digits = this.split()
      const value = this.join(digits)
      this.digits++

      if (value >= this.minValue && this.increasing(digits) && this.noTriplets(digits)) {
        return value
      }

      if (value > this.maxValue) {
        this.adjacentIndex++
        if (this.adjacentIndex > 4) {
          throw new EndOfList()
        }
        this.digits = 11111
      }
    }
  }

  split () {
    const digits = ('' + this.digits).split('')
    const prefix = digits.slice(0, this.adjacentIndex)
    const adjacentDigit = digits.slice(this.adjacentIndex, this.adjacentIndex + 1)
    const suffix = digits.slice(this.adjacentIndex + 1)
    return prefix.concat(adjacentDigit, adjacentDigit, suffix)
  }

  join (digits) {
    return parseInt(digits.join(''))
  }

  increasing (digits) {
    return (
      digits[0] <= digits[1] &&
      digits[1] <= digits[2] &&
      digits[2] <= digits[3] &&
      digits[3] <= digits[4] &&
      digits[4] <= digits[5]
    )
  }

  noTriplets (digits) {
    return (
      (digits[0] === digits[1] && digits[1] !== digits[2]) ||
      (digits[0] !== digits[1] && digits[1] === digits[2] && digits[2] !== digits[3]) ||
      (digits[1] !== digits[2] && digits[2] === digits[3] && digits[3] !== digits[4]) ||
      (digits[2] !== digits[3] && digits[3] === digits[4] && digits[4] !== digits[5]) ||
      (digits[3] !== digits[4] && digits[4] === digits[5])
    )
  }
}

if (require.main === module) {
  const p = new Password(124075, 580769)
  const values = new Set()

  while (true) {
    try {
      values.add(p.next())
    } catch (e) {
      if (e instanceof EndOfList) {
        break
      } else {
        throw e
      }
    }
  }

  console.log(values)
  console.log(values.size)
}

module.exports = Password
