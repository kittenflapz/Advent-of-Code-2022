import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.resolve(__dirname, "../day08/input.txt"))
  .toString()
  .split(/\r?\n/)

interface Tree {
  height: number
  visible: boolean
}

const getPartOneResult = (): number => {
  const treeRows: Tree[][] = input.map((row) => {
    return row.split("").map((number) => {
      return { height: +number, visible: false }
    })
  })

  const rowLength = treeRows[0].length
  const colLength = treeRows.length

  const getIsVisibleFromTop = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): boolean => {
    // check every row higher than the current row at this column index

    let result = true
    treeRows.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        if (rowIndex > treeToCheckRow && columnIndex === treeToCheckColumn) {
          if (treeToCheckHeight <= tree.height) {
            result = false
          }
        }
      })
    })
    return result
  }

  const getIsVisibleFromLeft = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): boolean => {
    // check every column lower than this column at this row index
    let result = true
    treeRows.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        if (columnIndex < treeToCheckColumn && rowIndex === treeToCheckRow) {
          if (treeToCheckHeight <= tree.height) {
            result = false
          }
        }
      })
    })
    return result
  }

  const getIsVisibleFromRight = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): boolean => {
    // check every column higher than this column at this row index
    let result = true
    treeRows.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        if (columnIndex > treeToCheckColumn && rowIndex === treeToCheckRow) {
          if (treeToCheckHeight <= tree.height) {
            result = false
          }
        }
      })
    })

    return result
  }

  const getIsVisibleFromBottom = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): boolean => {
    // check every row lower than this row at this column index
    let result = true
    treeRows.forEach((row, rowIndex) => {
      row.forEach((tree, columnIndex) => {
        if (rowIndex < treeToCheckRow && columnIndex === treeToCheckColumn) {
          if (treeToCheckHeight <= tree.height) {
            result = false
          }
        }
      })
    })
    return result
  }

  treeRows.forEach((row, rowIndex) => {
    row.forEach((tree, columnIndex) => {
      const isEdge =
        rowIndex === 0 ||
        columnIndex === 0 ||
        rowIndex === rowLength ||
        columnIndex === colLength

      const isVisible =
        isEdge ||
        getIsVisibleFromTop(rowIndex, columnIndex, tree.height) ||
        getIsVisibleFromLeft(rowIndex, columnIndex, tree.height) ||
        getIsVisibleFromRight(rowIndex, columnIndex, tree.height) ||
        getIsVisibleFromBottom(rowIndex, columnIndex, tree.height)

      tree.visible = isVisible
    })
  })

  let totalVisibleTrees = 0

  treeRows.forEach((row) =>
    row.forEach((tree) => {
      if (tree.visible) {
        totalVisibleTrees++
      }
    })
  )
  return totalVisibleTrees
}

console.log(getPartOneResult())

interface PartTwoTree {
  height: number
  totalViewingDistance: number
}

const getPartTwoResult = (): number => {
  const treeRows: PartTwoTree[][] = input.map((row) => {
    return row.split("").map((number) => {
      return { height: +number, totalViewingDistance: 0 }
    })
  })

  const rowLength = treeRows[0].length
  const colLength = treeRows.length

  const getTopViewingDistance = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): number => {
    // Column to check stays the same, check every row, DESCENDING (up)_
    const startingRow = treeToCheckRow - 1
    const columnToCheck = treeToCheckColumn

    let result = 0

    for (let i = startingRow; i >= 0; i--) {
      if (treeRows[i][columnToCheck].height < treeToCheckHeight) {
        result++
      } else {
        return ++result
      }
    }

    return result
  }

  const getLeftViewingDistance = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): number => {
    // Row to check stays the same, check every column, DESCENDING (left)
    const startingColumn = treeToCheckColumn - 1
    const rowToCheck = treeToCheckRow

    let result = 0

    for (let i = startingColumn; i >= 0; i--) {
      if (treeRows[rowToCheck][i].height < treeToCheckHeight) {
        result++
      } else {
        return ++result
      }
    }

    return result
  }

  const getRightViewingDistance = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): number => {
    // Row to check stays the same, check every column, ASCENDING (right)
    const startingColumn = treeToCheckColumn + 1
    const rowToCheck = treeToCheckRow

    let result = 0

    for (let i = startingColumn; i < rowLength; i++) {
      if (treeRows[rowToCheck][i].height < treeToCheckHeight) {
        result++
      } else {
        return ++result
      }
    }

    return result
  }

  const getBottomViewingDistance = (
    treeToCheckRow: number,
    treeToCheckColumn: number,
    treeToCheckHeight: number
  ): number => {
    // Column to check stays the same, check every row, ASCENDING (down) (lol)
    const startingRow = treeToCheckRow + 1
    const columnToCheck = treeToCheckColumn
    let result = 0

    for (let i = startingRow; i < colLength; i++) {
      if (treeRows[i][columnToCheck].height < treeToCheckHeight) {
        result++
      } else if (treeRows[i][columnToCheck].height === treeToCheckHeight) {
        return ++result
      } else {
        return result
      }
    }

    return result
  }

  treeRows.forEach((row, rowIndex) => {
    row.forEach((tree, columnIndex) => {
      const top = getTopViewingDistance(rowIndex, columnIndex, tree.height)
      const left = getLeftViewingDistance(rowIndex, columnIndex, tree.height)
      const right = getRightViewingDistance(rowIndex, columnIndex, tree.height)

      const bottom = getBottomViewingDistance(
        rowIndex,
        columnIndex,
        tree.height
      )

      tree.totalViewingDistance = left * right * top * bottom
    })
  })

  let bestVisibility = 0

  treeRows.forEach((row) => {
    row.forEach((tree) => {
      if (tree.totalViewingDistance > bestVisibility) {
        bestVisibility = tree.totalViewingDistance
      }
    })
  })

  return bestVisibility
}

console.log(getPartTwoResult())
