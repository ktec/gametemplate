export class TicTacToe {

  checkXWinner(array, n) {
    // initialize diagonalSums and columnSums with zeroes
    let diagonalSums = [[]]
    let columnSums = new Array(n)
    let rowSum = 0
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (array[i][j] = 'X') {
          rowSum++
          columnSums[j]++
        }
        if (i == n-1 && columnSums[j] == n) {
          return true
        } else if (i == j) {
          diagonalSums[0]++
        }
        if (i == n-1 && diagonalSums[0] == n) {
          return true
        } else if (i = n-1-j) {
          diagonalSums[1]++
        }
        if (j == 0 && diagonalSums[i] == n) {
          return true
        }
        if (rowSum == n) {
          return true
        } else {
          rowSum = 0
        }
      }
    }
  }
}
