import { readFile } from "fs/promises"

/*
export const day6A = async():Promise<number>=>{
  return readFile("./input/day6.txt").then((buffer)=>{
    for (let i =0; i<buffer.length; i++){
      if (buffer[i] != buffer[i+1] && buffer[i] != buffer[i+2] && buffer[i] != buffer[i+3] && buffer[i+1] != buffer[i+2] && buffer[i+1] != buffer[i+3] && buffer[i+2]!= buffer[i+3]){
        return i+4
      }
    }
   return 0
  })
}
*/

export const day6A = async():Promise<number>=> day6(4)
export const day6B = async():Promise<number>=> day6(14)


export const day6 = async(length:number):Promise<number>=>{

  const boxMatchReg = /\[([A-Z])\]/
  const instructionMatchReg = /^move (\d+) from (\d+) to (\d+)$/
  return readFile("./input/day6.txt").then((buffer)=>{
    let candidates = -1
    for (let i =0; i<buffer.length; i++){
      candidates++    
      const searchFor = buffer[i]
      for (let j =1; j < candidates; j++){
        if (buffer[i-j] == searchFor){
          candidates = j
          break;
        }
      }
      if (candidates == length){
        return i+1
      }
    }
    return 0
  })
}

//day6(4).then(r=>console.log(r)) 
//day6(14).then(r=>console.log(r)) 
//day5B().then(r=>console.log(r)) 

