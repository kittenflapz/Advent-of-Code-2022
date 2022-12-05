import fs from "fs"
import path from "path"

// Part One

const input = fs
  .readFileSync(path.resolve(__dirname, "../day05/input.txt"))
  .toString()
  .split(/\r\n/)

const unformattedCrates = input.slice(0, input.indexOf(""))

const moves = input.slice(input.indexOf("") + 1, input.length)

let crateStacks = [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""]]

const putInStack = (stack: number, crate: string) => {
  crateStacks[stack].unshift(crate)
}

const getPartOneAnswer = () => {
  unformattedCrates.forEach((crateDiagramLine) =>
    crateDiagramLine.split("").forEach((letterOrNumber, index) => {
      if (!letterOrNumber.match(/[a-z]/i)) {
        return
      } else {
        putInStack((index - 1) / 4, letterOrNumber)
      }
    })
  )

  crateStacks.forEach((crate) => crate.pop()) // just removing the empty string, don't mind me

  const moveCrate = (instruction: string): void => {
    const instructionArray: string[] = instruction.match(/\d+/g) || ["", "", ""]
    const instructionArrayNums: number[] = instructionArray.map(
      (instruction) => +instruction
    )
    const amountToMove = instructionArrayNums[0]
    const crateToMoveFrom = instructionArrayNums[1]
    const crateToMoveTo = instructionArrayNums[2]

    for (let i = 0; i < amountToMove; i++) {
      crateStacks[crateToMoveTo - 1].push(
        crateStacks[crateToMoveFrom - 1].pop() || ""
      )
      crateStacks[crateToMoveTo - 1].forEach((crate, index) => {
        if (crate === "") {
          crateStacks[crateToMoveTo - 1].splice(index, 1)
        }
      })
    }
  }

  moves.forEach((move) => moveCrate(move))

  const answer: string[] = []

  crateStacks.forEach((stack) => answer.push(stack.pop() || ""))

  console.log(answer.join().replaceAll(",", ""))
}

// Part Two

const getPartTwoAnswer = () => {
  unformattedCrates.forEach((crateDiagramLine) =>
    crateDiagramLine.split("").forEach((letterOrNumber, index) => {
      if (!letterOrNumber.match(/[a-z]/i)) {
        return
      } else {
        putInStack((index - 1) / 4, letterOrNumber)
      }
    })
  )

  crateStacks.forEach((crate) => crate.pop()) // just removing the empty string, don't mind me

  const moveCrates = (instruction: string): void => {
    const instructionArray: string[] = instruction.match(/\d+/g) || ["", "", ""]
    const instructionArrayNums: number[] = instructionArray.map(
      (instruction) => +instruction
    )
    const amountToMove = instructionArrayNums[0]
    const crateToMoveFrom = instructionArrayNums[1]
    const crateToMoveTo = instructionArrayNums[2]

    const tempCrates: string[] = []
    for (let i = 0; i < amountToMove; i++) {
      tempCrates.push(crateStacks[crateToMoveFrom - 1].pop() || "")
    }

    for (let i = tempCrates.length - 1; i >= 0; i--) {
      crateStacks[crateToMoveTo - 1].push(tempCrates[i])
    }
  }

  moves.forEach((move) => moveCrates(move))

  const answer: string[] = []

  crateStacks.forEach((stack) => answer.push(stack.pop() || ""))

  console.log(answer.join().replaceAll(",", ""))
}

getPartTwoAnswer()
