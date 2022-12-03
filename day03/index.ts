// To help prioritize item rearrangement, every item type can be converted to a priority:

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// In the above example, the priority of the item type that appears in both compartments of each rucksack is
//  16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

// Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?

import fs from "fs"
import path from "path"

// boldly assuming we will never pass anything in here other than a single character
function getItemPriority(itemCode: string) {
  const isUpperCase: boolean = itemCode === itemCode.toUpperCase() // if this is equal, it's already uppercase

  let itemCodeToPriority: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  }

  return isUpperCase
    ? itemCodeToPriority[itemCode.toLowerCase()] + 26
    : itemCodeToPriority[itemCode]
}

interface Rucksack {
  compartmentOne: number[]
  compartmentTwo: number[]
}

const getPartOneResult = () => {
  const inventory: Rucksack[] = []
  let sumOfPrioritiesThatAppearTwice = 0

  fs.readFileSync(path.resolve(__dirname, "../day03/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((rucksackContents) => {
      let rucksack: Rucksack = { compartmentOne: [], compartmentTwo: [] }
      let halfLength = rucksackContents.length / 2

      // put left half in compartment one
      rucksackContents
        .slice(0, halfLength)
        .split("")
        .forEach((itemCode) => {
          rucksack.compartmentOne.push(getItemPriority(itemCode))
        })

      // and right half in compartment two
      rucksackContents
        .slice(halfLength, rucksackContents.length)
        .split("")
        .forEach((itemCode) => {
          rucksack.compartmentTwo.push(getItemPriority(itemCode))
        })

      inventory.push(rucksack)
    })

  inventory.forEach((rucksack) => {
    rucksack.compartmentOne.forEach((itemPriority) => {
      if (rucksack.compartmentTwo.includes(itemPriority)) {
        sumOfPrioritiesThatAppearTwice += itemPriority
        rucksack = { compartmentOne: [], compartmentTwo: [] } // Oof
      }
    })
  })

  return sumOfPrioritiesThatAppearTwice
}

console.log(getPartOneResult())

const getPartTwoResult = () => {
  const completeInventorySplitByGroup: number[][][] = []
  let groupElfInventory: number[][] = []
  let sumOfPrioritiesOfBadges = 0

  fs.readFileSync(path.resolve(__dirname, "../day03/input.txt"))
    .toString()
    .split(/\r?\n/)
    .map((rucksackContents, index) => {
      let individualElfInventory: number[] = []

      rucksackContents.split("").forEach((itemCode) => {
        individualElfInventory.push(getItemPriority(itemCode))
      })

      groupElfInventory.push(individualElfInventory)

      // every 3 elves, push to a new group
      if ((index + 1) % 3 === 0) {
        completeInventorySplitByGroup.push(groupElfInventory)
        groupElfInventory = []
      }
    })

  completeInventorySplitByGroup.forEach((group) => {
    let foundBadge = false
    group[0].forEach((item) => {
      if (
        foundBadge === false &&
        group.every((rucksack) => rucksack.includes(item))
      ) {
        foundBadge = true
        sumOfPrioritiesOfBadges += item
      }
    })
  })

  return sumOfPrioritiesOfBadges
}

console.log(getPartTwoResult())
