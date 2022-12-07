import fs from "fs"
import path from "path"

const input = fs
  .readFileSync(path.resolve(__dirname, "../day07/input.txt"))
  .toString()
  .split(/\r?\n/)

interface File {
  name: string
  size: number
}

interface Directory {
  name: string
  files?: File[]
  directories?: Directory[]
  size: number
}

enum InputAction {
  CHANGE_DIRECTORY = "cd",
  LIST = "ls",
}

const getDoesDirectoryIncludeFile = (
  directoryToSearch: Directory,
  fileNameToSearchFor: string
) => directoryToSearch.files?.find((file) => file.name === fileNameToSearchFor)

const getDoesDirectoryIncludeDirectory = (
  directoryToSearch: Directory,
  directoryNameToSearchFor: string
) =>
  directoryNameToSearchFor === "/" ||
  directoryToSearch.directories?.find(
    (directory) => directory.name === directoryNameToSearchFor
  )

const setFileSizesInDirectory = (directory: Directory): void => {
  directory.files?.forEach((file) => {
    directory.size += file.size
  })

  directory.directories?.forEach((innerDirectory) =>
    setFileSizesInDirectory(innerDirectory)
  )

  directory.directories?.forEach(
    (innerDirectory) => (directory.size += innerDirectory.size)
  )
}

const getPartOneResult = (): number => {
  const fileSystem: Directory = {
    name: "/",
    directories: [],
    files: [],
    size: 0,
  }
  let directoryHistory: Directory[] = []
  let currentDirectory = fileSystem

  // Casually put together a file system

  input.forEach((line, index) => {
    const splitLine = line.split(" ")
    let commandType: InputAction

    // Is input
    if (splitLine[0] === "$") {
      commandType = splitLine[1] as InputAction

      if (commandType === InputAction.CHANGE_DIRECTORY) {
        const isMovingUp = splitLine[2] === ".."

        if (!isMovingUp) {
          directoryHistory.push(currentDirectory)
          // If our filesystem does not include this directory, add it
          if (
            !getDoesDirectoryIncludeDirectory(currentDirectory, splitLine[2])
          ) {
            currentDirectory.directories?.push({
              name: splitLine[2],
              files: [],
              directories: [],
              size: 0,
            })
          }
          currentDirectory =
            currentDirectory.directories?.find(
              (directory) => directory.name === splitLine[2]
            ) ?? currentDirectory
        } else {
          currentDirectory = directoryHistory[directoryHistory.length - 1]
          directoryHistory.pop()
        }
      }
    } else {
      // It's output
      if (
        splitLine[0] === "dir" &&
        !getDoesDirectoryIncludeDirectory(currentDirectory, splitLine[1])
      ) {
        currentDirectory.directories?.push({
          name: splitLine[1],
          files: [],
          directories: [],
          size: 0,
        })
      } else if (!getDoesDirectoryIncludeFile(currentDirectory, splitLine[1])) {
        currentDirectory.files?.push({
          size: +splitLine[0],
          name: splitLine[1],
        })
      }
    }
  })

  // ^ Phew, now just to find the directory with the thiccest accumulated file size

  setFileSizesInDirectory(fileSystem)

  let totalSize = 0

  const accumulateSizes = (directory: Directory) => {
    directory.directories?.forEach((innerDirectory) => {
      if (innerDirectory.size <= 100000) {
        totalSize += innerDirectory.size
      }

      accumulateSizes(innerDirectory)
    })
  }

  accumulateSizes(fileSystem)

  return totalSize
}

console.log("Part One:", getPartOneResult())

const getPartTwoResult = (): number => {
  const fileSystem: Directory = {
    name: "/",
    directories: [],
    files: [],
    size: 0,
  }
  let directoryHistory: Directory[] = []
  let currentDirectory = fileSystem

  // Casually put together a file system

  input.forEach((line, index) => {
    const splitLine = line.split(" ")
    let commandType: InputAction

    // Is input
    if (splitLine[0] === "$") {
      commandType = splitLine[1] as InputAction

      if (commandType === InputAction.CHANGE_DIRECTORY) {
        const isMovingUp = splitLine[2] === ".."

        if (!isMovingUp) {
          directoryHistory.push(currentDirectory)
          // If our filesystem does not include this directory, add it
          if (
            !getDoesDirectoryIncludeDirectory(currentDirectory, splitLine[2])
          ) {
            currentDirectory.directories?.push({
              name: splitLine[2],
              files: [],
              directories: [],
              size: 0,
            })
          }
          currentDirectory =
            currentDirectory.directories?.find(
              (directory) => directory.name === splitLine[2]
            ) ?? currentDirectory
        } else {
          currentDirectory = directoryHistory[directoryHistory.length - 1]
          directoryHistory.pop()
        }
      }
    } else {
      // It's output
      if (
        splitLine[0] === "dir" &&
        !getDoesDirectoryIncludeDirectory(currentDirectory, splitLine[1])
      ) {
        currentDirectory.directories?.push({
          name: splitLine[1],
          files: [],
          directories: [],
          size: 0,
        })
      } else if (!getDoesDirectoryIncludeFile(currentDirectory, splitLine[1])) {
        currentDirectory.files?.push({
          size: +splitLine[0],
          name: splitLine[1],
        })
      }
    }
  })

  setFileSizesInDirectory(fileSystem)

  const totalDiskSpace = 70000000
  const spaceNeededForUpdate = 30000000
  const totalSizeOfOutermostDirectory = fileSystem.size
  const unusedSpace = totalDiskSpace - totalSizeOfOutermostDirectory
  const targetAmount = spaceNeededForUpdate - unusedSpace

  let lowestOfContenders: number = totalDiskSpace

  const gatherContenders = (directory: Directory) => {
    directory.directories?.forEach((innerDirectory) => {
      if (
        innerDirectory.size > targetAmount &&
        innerDirectory.size < lowestOfContenders
      ) {
        lowestOfContenders = innerDirectory.size
      }

      gatherContenders(innerDirectory)
    })
  }

  gatherContenders(fileSystem)

  return lowestOfContenders
}

console.log("Part Two:", getPartTwoResult())
