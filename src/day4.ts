import { readFile } from "fs/promises"

export const day4A = async():Promise<number>=>{
  const rangeParseRx = /^(\d+)\-(\d+),(\d+)\-(\d+)$/

  return readFile("./input/day4.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    const hits =  lines.filter(l=>{
      const parts = rangeParseRx.exec(l)
      if (parts!= null){
        const range = parts.slice(1).map(v=>parseInt(v))
        return ((range[0] <= range[2] && range[1] >= range[3]) ||
          (range[2] <= range[0] && range[3] >= range[1]))
      }
      return false
    })
    return hits.length 
  }) 
}
export const day4B = async():Promise<number>=>{
  const rangeParseRx = /^(\d+)\-(\d+),(\d+)\-(\d+)$/

  return readFile("./input/day4.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    const hits =  lines.filter(l=>{
      const parts = rangeParseRx.exec(l)
      if (parts!= null){
        const range = parts.slice(1).map(v=>parseInt(v))
        return ((range[0] <= range[2] && range[1] >= range[2]) ||
          (range[2] <= range[0] && range[3] >= range[0]))
      }
      return false
    })
    return hits.length 
  }) 
}


