// This list represents the Calories of the food carried by five Elves:

// The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
// The second Elf is carrying one food item with 4000 Calories.
// The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
// The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
// The fifth Elf is carrying one food item with 10000 Calories.
// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

// Part One

// const fs = require("fs")
// const path = require("path")

// const data: number[] = fs
//   .readFileSync(path.resolve(__dirname, "../day01/input.txt"))
//   .toString()
//   .split(/\r?\n/)
//   .map((value: string): Number => Number(value))

// let highestSoFar: number = 0

// data.reduce((calorieAccumulator, currentCalorieValue) => {
//   // If the current value is not an empty line, accumulate
//   if (currentCalorieValue) {
//     return calorieAccumulator + currentCalorieValue
//   } else {
//     // If it is an empty line, check if the total calories accumulated is higher than the previous total
//     if (calorieAccumulator > highestSoFar) {
//       highestSoFar = calorieAccumulator
//     }
//     calorieAccumulator = 0
//     return calorieAccumulator
//   }
// })

// console.log(highestSoFar)

// Part Two, Electric Boogaloo

import fs from "fs"
import path from "path"

const data: number[] = fs
  .readFileSync(path.resolve(__dirname, "../day01/input.txt"))
  .toString()
  .split(/\r?\n/)
  .map((value: string): number => Number(value))

const totalCaloriesForEachElf: number[] = []

data.reduce((calorieAccumulator, currentCalorieValue) => {
  // If the current value is not an empty line, accumulate
  if (currentCalorieValue) {
    return calorieAccumulator + currentCalorieValue
  } else {
    // If it is an empty line, push the total to the inventory, then start again
    totalCaloriesForEachElf.push(calorieAccumulator)
    calorieAccumulator = 0
    return calorieAccumulator
  }
})

const combinedHighestThree = totalCaloriesForEachElf
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((accumulator, value) => accumulator + value)

console.log(combinedHighestThree)
