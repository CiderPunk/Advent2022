import { readFile } from "fs/promises"
import { stringify } from "querystring"

export const day5A = async():Promise<string>=>{

  const boxMatchReg = /\[([A-Z])\]/
  const instructionMatchReg = /^move (\d+) from (\d+) to (\d+)$/
  return readFile("./input/day5.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    const dataStart = lines.findIndex(l=>l=="")
    const stacksDef = lines.slice(0,dataStart-1)
    const instructions = lines.slice(dataStart)
    const stacks = new Array<Array<string>>()

    stacksDef.forEach(l=>{
      for (let i = 0; i < l.length; i+=4){
        const match = boxMatchReg.exec(l.substring(i,i+4))
        if(match){
          const stack = Math.floor(i/4)    
          if (!stacks[stack]){
            stacks[stack] = new Array<string>() 
          }
          stacks[stack].push(match[1])
        }
      }
    })

    instructions.forEach(i=>{
      const match = instructionMatchReg.exec(i)
      if (match){
        for (let i = 0; i< parseInt(match[1]); i++){
          const box = stacks[parseInt(match[2])-1].shift()
          if (box){
            stacks[parseInt(match[3])-1].unshift(box)
          }
        }
      }
    })

    return  stacks.map(s=>s[0]).join("")
  }) 
}
export const day5B = async():Promise<string>=>{

  const boxMatchReg = /\[([A-Z])\]/
  const instructionMatchReg = /^move (\d+) from (\d+) to (\d+)$/
  return readFile("./input/day5.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    const dataStart = lines.findIndex(l=>l=="")
    const stacksDef = lines.slice(0,dataStart-1)
    const instructions = lines.slice(dataStart)
    const stacks = new Array<Array<string>>()

    stacksDef.forEach(l=>{
      for (let i = 0; i < l.length; i+=4){
        const match = boxMatchReg.exec(l.substring(i,i+4))
        if(match){
          const stack = Math.floor(i/4)    
          if (!stacks[stack]){
            stacks[stack] = new Array<string>() 
          }
          stacks[stack].push(match[1])
        }
      }
    })

    instructions.forEach(i=>{
      const match = instructionMatchReg.exec(i)
      if (match){
        const count = parseInt(match[1])
        const from = parseInt(match[2])-1
        const to = parseInt(match[3])-1

        const move = stacks[from].slice(0,count)
        stacks[from] = stacks[from].slice(count)
        stacks[to] = move.concat(stacks[to])
      }
    })

    return  stacks.map(s=>s[0]).join("")
  }) 
}

//day5A().then(r=>console.log(r)) 
//day5B().then(r=>console.log(r)) 

