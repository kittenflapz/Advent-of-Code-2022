// 1 = A = X = Rock
// 2 = B = Y = Paper
// 3 = C = Z = Scissors

const WIN_POINTS = 6
const DRAW_POINTS = 3
const ROCK_POINTS = 1
const PAPER_POINTS = 2
const SCISSORS_POINTS = 3

import fs from "fs"
import path from "path"

let myScore: number = 0
let opponentScore: number = 0

const scoreShape = (hand: string) => {
  switch (hand) {
    case "A":
      opponentScore += ROCK_POINTS
      break
    case "B":
      opponentScore += PAPER_POINTS
      break
    case "C":
      opponentScore += SCISSORS_POINTS
      break
    case "X":
      myScore += ROCK_POINTS
      break
    case "Y":
      myScore += PAPER_POINTS
      break
    case "Z":
      myScore += SCISSORS_POINTS
      break
  }
}

const scoreRound = (opponentHand: string, myHand: string) => {
  switch (opponentHand) {
    // they played rock
    case "A":
      if (myHand === "X") {
        opponentScore += DRAW_POINTS
        myScore += DRAW_POINTS
      } else if (myHand === "Y") {
        myScore += WIN_POINTS
      } else if (myHand === "Z") {
        opponentScore += WIN_POINTS
      }
      break
    // they played paper
    case "B":
      if (myHand === "X") {
        opponentScore += WIN_POINTS
      } else if (myHand === "Y") {
        opponentScore += DRAW_POINTS
        myScore += DRAW_POINTS
      } else if (myHand === "Z") {
        myScore += WIN_POINTS
      }
      break
    // they played scissors
    case "C":
      if (myHand === "X") {
        myScore += WIN_POINTS
      } else if (myHand === "Y") {
        opponentScore += WIN_POINTS
      } else if (myHand === "Z") {
        opponentScore += DRAW_POINTS
        myScore += DRAW_POINTS
      }
      break
  }
}

const getPartOneResult = (): number => {
  fs.readFileSync(path.resolve(__dirname, "../day02/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((gameResult) => gameResult.split(" "))
    .forEach((splitGameResult) => {
      splitGameResult.forEach((result) => scoreShape(result))
      scoreRound(splitGameResult[0], splitGameResult[1])
    })

  return myScore
}

console.log(getPartOneResult())

// --- Part Two ---
// The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose,
// Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

// The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

// In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
// In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
// In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
// Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

// Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

// X = LOSE
// Y = DRAW
// Z = WIN

// also realized i don't need to keep track of the opponent's score here :D
let myScorePartTwo: number = 0

const scoreShapePartTwo = (hand: "rock" | "paper" | "scissors") => {
  switch (hand) {
    case "rock":
      myScorePartTwo += ROCK_POINTS
      break
    case "paper":
      myScorePartTwo += PAPER_POINTS
      break
    case "scissors":
      myScorePartTwo += SCISSORS_POINTS
      break
  }
}

const scoreRoundPartTwo = (opponentHand: string, myHand: string) => {
  switch (opponentHand) {
    case "A":
      if (myHand === "X") {
        scoreShapePartTwo("scissors")
      } else if (myHand === "Y") {
        scoreShapePartTwo("rock")
        myScorePartTwo += DRAW_POINTS
      } else if (myHand === "Z") {
        scoreShapePartTwo("paper")
        myScorePartTwo += WIN_POINTS
      }
      break
    case "B":
      if (myHand === "X") {
        scoreShapePartTwo("rock")
      } else if (myHand === "Y") {
        scoreShapePartTwo("paper")
        myScorePartTwo += DRAW_POINTS
      } else if (myHand === "Z") {
        scoreShapePartTwo("scissors")
        myScorePartTwo += WIN_POINTS
      }
      break
    case "C":
      if (myHand === "X") {
        scoreShapePartTwo("paper")
      } else if (myHand === "Y") {
        scoreShapePartTwo("scissors")
        myScorePartTwo += DRAW_POINTS
      } else if (myHand === "Z") {
        scoreShapePartTwo("rock")
        myScorePartTwo += WIN_POINTS
      }
      break
  }
}

const getPartTwoResult = (): number => {
  fs.readFileSync(path.resolve(__dirname, "../day02/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((gameResult) => gameResult.split(" "))
    .forEach((splitGameResult) => {
      scoreRoundPartTwo(splitGameResult[0], splitGameResult[1])
    })

  return myScorePartTwo
}

console.log(getPartTwoResult())
