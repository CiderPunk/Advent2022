import { readFile } from "fs/promises"

class mapCounter{
  
  map:Array<Array<boolean>>
  public count = 0
  public constructor(w:number, h:number){
    this.map = new Array<Array<boolean>>()
    for (let i =0; i < w; i++){
      this.map[i] = new Array<boolean>()

    }
  }

  add(x:number, y:number):void{
    if (this.map[x][y] && this.map[x][y] === true){
      return
    }
    this.map[x][y] = true
    this.count++
  }
}

const rowColCounter = (map:Array<string>,counter:mapCounter, x:number, y:number, dx:number, dy:number, xbound:number, ybound:number):void=>{
  let h = -1
  while(x >= 0 && y >= 0 && x<xbound && y<ybound){
    let c = parseInt(map[x][y])
    if (c > h){
      h = c
      counter.add(x,y)
      if (c == 9)
        break
    }
    x+=dx
    y+=dy
  }
}

const dirScorer = (map:Array<string>, x:number, y:number, dx:number, dy:number, xbound:number, ybound:number):number=>{
  let h = parseInt(map[y][x])
  x+=dx
  y+=dy
  let s = 0
  while(x >= 0 && y >= 0 && x<xbound && y<ybound){
    s++
    let c = parseInt(map[y][x])
    if (c >= h){
      return s
    }
    x+=dx
    y+=dy
  }
  return s
}

export const day8A = async():Promise<number>=>{
  return readFile("./input/day8.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/).filter(l=>l.length > 0)
    const xbound = lines[0].length
    const ybound = lines.length
    const counter = new mapCounter(xbound, ybound)

    for (let x = 0; x < xbound; x++){
      rowColCounter(lines, counter, x, 0, 0, 1, xbound, ybound)
      rowColCounter(lines, counter, x, ybound-1, 0, -1, xbound, ybound)
    }
    for (let y = 0; y < ybound; y++){
      rowColCounter(lines, counter, 0, y, 1, 0, xbound, ybound)
      rowColCounter(lines, counter, xbound-1, y, -1, 0, xbound, ybound)
    }
    return counter.count
  }) 
}

export const day8B = async():Promise<number>=>{
  return readFile("./input/day8.txt").then((buffer)=>{
    const lines = buffer.toString().split(/\r?\n/).filter(l=>l.length > 0)
    const xbound = lines[0].length
    const ybound = lines.length
    let best = 0

    for (let x = 1; x < xbound-1; x++){
      for (let y = 1; y < ybound-1; y++){
        const cardinals = [  
          dirScorer(lines,x,y,0,-1,xbound,ybound), //up 
          dirScorer(lines,x,y,1,0,xbound,ybound), //right
          dirScorer(lines,x,y,0,1,xbound,ybound), //down
          dirScorer(lines,x,y,-1,0,xbound,ybound) //right
        ]

        const score = cardinals.reduce((p,c)=>p*c)
        best = score > best ? score : best
      }
    }
    return best
  }) 
}



//day8A().then(r=>console.log(r)) 
//day8B().then(r=>console.log(r)) 

