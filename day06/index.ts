import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.resolve(__dirname, "../day06/input.txt"))
  .toString()
  .split("")

// returns index of of place in input where the last 4 characters preceding/including the current character are all different
const getPartOneResult = (): number => {
  let fourCharsToCheck: string[] = []
  let result: number = 0

  const addChar = (newChar: string): void => {
    if (fourCharsToCheck.length === 4) {
      fourCharsToCheck.shift()
    }
    fourCharsToCheck.push(newChar)
  }

  input.some((letter, index) => {
    addChar(letter)
    result = index
    return index < 4
      ? false
      : fourCharsToCheck.length === new Set(fourCharsToCheck).size
  })

  return result + 1
}

console.log(getPartOneResult())

// the only thing different here is the number 14
const getPartTwoResult = (): number => {
  let fourCharsToCheck: string[] = []
  let result: number = 0

  const addChar = (newChar: string): void => {
    if (fourCharsToCheck.length === 14) {
      fourCharsToCheck.shift()
    }
    fourCharsToCheck.push(newChar)
  }

  input.some((letter, index) => {
    addChar(letter)
    result = index
    return index < 14
      ? false
      : fourCharsToCheck.length === new Set(fourCharsToCheck).size
  })

  return result + 1
}
console.log(getPartTwoResult())
