import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.resolve(__dirname, "../day09/input.txt"))
  .toString()
  .split(/\r?\n/)

enum Direction {
  LEFT = "L",
  RIGHT = "R",
  UP = "U",
  DOWN = "D",
}

interface Position {
  x: number
  y: number
  visited?: boolean
}

interface Move {
  direction: Direction
}

const getDoesPositionExist = (pos: Position, positions: Position[]): boolean =>
  positions.some((position) => position.x === pos.x && position.y === pos.y)

// Two positions are touching if the x position is the same and the y position is +/- 1
// Or if the y position is the same and the x position is +/- 1
// Or if the y and x positions are the same
// I'm pretty sure, but not entirely sure, that this works.
// todo: come here first if solution is wrong
const getArePositionsTouching = (pos1: Position, pos2: Position): boolean => {
  let result = false

  // Overlapping
  if (pos1.x === pos2.x && pos1.y === pos2.y) {
    result = true
  }

  // Touching on x
  if (pos1.y === pos2.y && (pos1.x === pos2.x - 1 || pos1.x === pos2.x + 1)) {
    result = true
  }

  // Touching on y
  if (pos1.x === pos2.x && (pos1.y === pos2.y - 1 || pos1.y === pos2.y + 1)) {
    result = true
  }

  // Touching diagonally
  if (
    (pos1.y === pos2.y - 1 || pos1.y === pos2.y + 1) &&
    (pos1.x === pos2.x - 1 || pos1.x === pos2.x + 1)
  ) {
    result = true
  }

  return result
}

const visitAtPosition = (position: Position, visitedPositions: Position[]) => {
  visitedPositions.push({ x: position.x, y: position.y })
}

const getPartOneResult = (): number => {
  const moves: Move[] = []

  // initialize with starting position
  const positions: Position[] = [{ x: 0, y: 0 }]
  const visitedPositions: Position[] = []
  let currentHPosition: Position = positions[0]
  let currentTPosition: Position = positions[0]

  input.forEach((instruction) => {
    const splitIntstruction = instruction.split(" ")

    for (let i = 0; i < +splitIntstruction[1]; i++) {
      moves.push({ direction: splitIntstruction[0] as Direction })
    }
  })

  // For each move, calculate where he'd be going, then if that position doesn't exist yet, add it to the list of positions, then move H
  // Then we can move T the same way, but we're only going to set `visited` to true if T is touching H
  moves.forEach((move) => {
    switch (move.direction) {
      case Direction.DOWN:
        let downDest = {
          x: currentHPosition.x,
          y: currentHPosition.y - 1,
        }
        if (!getDoesPositionExist(downDest, positions)) {
          positions.push(downDest)
        }
        currentHPosition = downDest
        break
      case Direction.UP:
        let upDest = {
          x: currentHPosition.x,
          y: currentHPosition.y + 1,
        }
        if (!getDoesPositionExist(upDest, positions)) {
          positions.push(upDest)
        }
        currentHPosition = upDest
        break
      case Direction.LEFT:
        let leftDest = {
          x: currentHPosition.x - 1,
          y: currentHPosition.y,
        }
        if (!getDoesPositionExist(leftDest, positions)) {
          positions.push(leftDest)
        }
        currentHPosition = leftDest
        break
      case Direction.RIGHT:
        let rightDest = {
          x: currentHPosition.x + 1,
          y: currentHPosition.y,
        }
        if (!getDoesPositionExist(rightDest, positions)) {
          positions.push(rightDest)
        }
        currentHPosition = rightDest
        break
    }
    if (!getArePositionsTouching(currentHPosition, currentTPosition)) {
      // They're either not touching because they're 2 away on the same axis,
      // in which case we just need to move 1 towards on that axis

      if (
        currentHPosition.x === currentTPosition.x ||
        currentHPosition.y === currentTPosition.y
      ) {
        if (currentHPosition.x === currentTPosition.x + 2) {
          currentTPosition.x++
        }
        if (currentHPosition.x === currentTPosition.x - 2) {
          currentTPosition.x--
        }
        if (currentHPosition.y === currentTPosition.y + 2) {
          currentTPosition.y++
        }
        if (currentHPosition.y === currentTPosition.y - 2) {
          currentTPosition.y--
        }
      }

      // or the horrifying diagonal cases

      // H is top right of T
      if (
        currentHPosition.x > currentTPosition.x &&
        currentHPosition.y > currentTPosition.y
      ) {
        currentTPosition.x++
        currentTPosition.y++
      }
      // H is top left of T
      if (
        currentHPosition.x < currentTPosition.x &&
        currentHPosition.y > currentTPosition.y
      ) {
        currentTPosition.x--
        currentTPosition.y++
      }
      // H is bottom right of T
      if (
        currentHPosition.x > currentTPosition.x &&
        currentHPosition.y < currentTPosition.y
      ) {
        currentTPosition.x++
        currentTPosition.y--
      }
      // H is bottom left of T
      if (
        currentHPosition.x < currentTPosition.x &&
        currentHPosition.y < currentTPosition.y
      ) {
        currentTPosition.x--
        currentTPosition.y--
      }

      visitAtPosition(currentTPosition, visitedPositions)
    }
  })

  // Count up all the visited positions
  let uniqueVisitedPositionCount = visitedPositions.filter(
    (v, i, a) => a.indexOf(v) === i
  ).length

  return uniqueVisitedPositionCount
}

console.log(getPartOneResult())
