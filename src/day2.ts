import { readFile } from "fs/promises"
import { textChangeRangeIsUnchanged } from "typescript"

export const day2A = async():Promise<number>=>{
  return readFile("./input/day2.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)

    const lookup = new Map<string,[number,number]>( [ 
      ["A X", [4,4]],
      ["A Y", [1,8]],
      ["A Z", [7,3]],
      ["B X", [8,1]],
      ["B Y", [5,5]],
      ["B Z", [2,9]],
      ["C X", [3,7]],
      ["C Y", [9,2]],
      ["C Z", [6,6]]
    ])

    const result = lines.map(l=>lookup.get(l.trim())??[0,0]).reduce((p,c)=> [p[0] + c[0], p[1]+c[1]])
    return result[1]
  }) 
}
export const day2B = async():Promise<number>=>{
  return readFile("./input/day2.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)

    const lookup = new Map<string,number>( [ 
      ["A X", 3],
      ["A Y", 4],
      ["A Z", 8],
      ["B X", 1],
      ["B Y", 5],
      ["B Z", 9],
      ["C X", 2],
      ["C Y", 6],
      ["C Z", 7]
    ])

    const result = lines.map(l=>lookup.get(l.trim())??0).reduce((p,c)=> p+c)
    return result
  }) 
}
