import { readFile } from "fs/promises"


export const charToPri = (c:string):number =>{
  let pri = c.charCodeAt(0)
  return pri >96 ? pri - 96 : pri -38
}

export const day3A = async():Promise<number>=>{
  return readFile("./input/day3.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    return lines.map(l=>{
      const size = l.length/2
      const part1 = l.substring(0,size)
      const part2 = l.substring(size)
      for(let i =0; i < size; i++){
        if (part2.indexOf(part1[i]) > -1){
          return charToPri(part1[i])
        }
      }  
      return 0
    }).reduce((p,c)=>p+c)

  }) 
}

export const day3B = async():Promise<number>=>{
  return readFile("./input/day3.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    let total = 0
    for(let i = 0; i<lines.length; i+=3){
      for(let j = 0; j<lines[i].length; j++){
        const c = lines[i][j]
        if (lines[i+1].indexOf(c) > -1 && lines[i+2].indexOf(c) > -1){
          total += charToPri(c)
          break
        }
      }
    }
    return total
  }) 
}


