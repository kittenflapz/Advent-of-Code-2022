// In how many assignment pairs does one range fully contain the other?

// split into pairs
// if the biggest number in one is less than the biggest number in the other
// and the smallest number is more than the smallest number in the other

import fs from "fs"
import path from "path"

const getArray = (start: number, end: number): number[] =>
  [...Array(end - start + 1).keys()].map((x) => x + start)

const getPartOneResult = (): number => {
  let totalRangesWhereOneFullyContainsTheOther = 0

  fs.readFileSync(path.resolve(__dirname, "../day04/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((pair) =>
      pair.split(",").map((assignment) => {
        const splitAssigment = assignment.split("-")
        return getArray(+splitAssigment[0], +splitAssigment[1])
      })
    )
    .forEach((assignmentPair) => {
      const lowestInFirst = assignmentPair[0][0]
      const highestInFirst = assignmentPair[0][assignmentPair[0].length - 1]

      const lowestInSecond = assignmentPair[1][0]
      const highestInSecond = assignmentPair[1][assignmentPair[1].length - 1]

      if (
        (lowestInFirst >= lowestInSecond &&
          highestInFirst <= highestInSecond) ||
        (lowestInSecond >= lowestInFirst && highestInSecond <= highestInFirst)
      ) {
        totalRangesWhereOneFullyContainsTheOther++
      }
    })

  return totalRangesWhereOneFullyContainsTheOther
}

console.log(getPartOneResult())

const getPartTwoResult = (): number => {
  let totalRangesWithOverlap = 0

  fs.readFileSync(path.resolve(__dirname, "../day04/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((pair) =>
      pair.split(",").map((assignment) => {
        const splitAssigment = assignment.split("-")
        return getArray(+splitAssigment[0], +splitAssigment[1])
      })
    )
    .forEach((assignmentPair) => {
      if (
        assignmentPair[0].filter((section) =>
          assignmentPair[1].includes(section)
        ).length > 0
      ) {
        totalRangesWithOverlap++
      }
    })

  return totalRangesWithOverlap
}
console.log(getPartTwoResult())
