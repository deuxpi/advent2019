const { factorials, fromLehmerCode, permutations } = require('./permutation')

test('permutation for Lehmer code 5,2,5,0,1,3,2,0,0 is 6,3,8,1,4,9,7,2,5', () => {
  expect(fromLehmerCode([1, 2, 3, 4, 5, 6, 7, 8, 9], [5, 2, 5, 0, 1, 3, 2, 0, 0])).toStrictEqual([6, 3, 8, 1, 4, 9, 7, 2, 5])
})

test('factorials', () => {
  expect(factorials(2)).toStrictEqual([[0, 0], [1, 0]])
  expect(factorials(3)).toStrictEqual([[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0], [2, 1, 0]])
})

test('permutations', () => {
  expect(permutations([0, 1])).toStrictEqual([[0, 1], [1, 0]])
  expect(permutations([1, 2, 3])).toStrictEqual([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])
})
