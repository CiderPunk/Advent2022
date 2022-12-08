import { readFile } from "fs/promises"

export const day1A = async():Promise<number>=>{
  return readFile("./input/day1.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    let t = 0, best = 0
    lines.forEach(l=>{ 
      if (l.length > 0){
        t+= Number.parseInt(l) ?? 0
      }
      else{
        best = t > best ? t : best
        t = 0
      }
    })
    return best
  }) 
}

export const day1B = async():Promise<number>=>{
  return readFile("./input/day1.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/)
    let t = 0
    let all = new Array<number>()
    lines.forEach(l=>{ 
      if (l.length > 0){
        t+= Number.parseInt(l) ?? 0
      }
      else{
        all.push(t)
        t = 0
      }
    })
    //return 0
    return all.sort((a,b)=>b-a).slice(0,3).reduce((p,c)=>p+c)
    
  }) 
}


