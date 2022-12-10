import { readFile } from "fs/promises"
import { reduceEachLeadingCommentRange } from "typescript"

interface File{
  name:string
  size:number

}

class Directory{
  public constructor(public name:string, public parent?:Directory){}
  files = new Array<File>()
  dirs = new Array<Directory>()

  calcSize = ():number=>{
    return this.files.map(f=>f.size).reduce((p,c)=>p+c,0) + this.dirs.map(d=>d.calcSize()).reduce((p,c)=>p+c,0)
  }

  sumSmallDirs():number{
    const size = this.calcSize()
    return this.dirs.map(d=>d.sumSmallDirs()).reduce((p,c)=>p+c,0) + (size < 100000 ? size : 0)
  }

  findSmallest(min:number):number{
    const size  = this.calcSize()
    if (size > min){
      const child = this.dirs.map(d=>d.findSmallest(min)).filter(v=>(v>0)).sort((a,b)=>a-b)
      if (child.length > 0){
        return child[0]
      }
      return size
    }
    return 0

  }
}

const day7 = async():Promise<Directory>=>{
  const linematch = /^(\$ cd \.\.)|(\$ cd \/)|(\$ cd (.+))|(\$ ls)|((\d+) (.+))|(dir (.+))$/
  return readFile("./input/day7.txt").then((buffer)=>{
    const root = new Directory("/")
    let current = root
    const lines = buffer.toString().split(/\r?\n/)
    lines.forEach(l=>{  
      const match = linematch.exec(l)
      if (match){
        if (match[1]){
          current = current.parent!
        }
        else if(match[2]){
          current = root
        }       
        else if(match[3]){
          current = current.dirs.find(d=>d.name == match[4])!
        }
        else if(match[6]){
          current.files.push({ name: match[8], size:parseInt(match[7])})
        }
        else if(match[9]){
          current.dirs.push(new Directory(match[10], current))
        }
      }
    })
    return root
  }) 
}


export const day7A = async():Promise<number>=>{
  return day7().then((dir)=>{
    return dir.sumSmallDirs()
  })
}
export const day7B = async():Promise<number>=>{
  return day7().then((dir)=>{
    const freeSpace =  70000000 - dir.calcSize()
    const reqSpace = 30000000 - freeSpace

    return dir.findSmallest(reqSpace)
  })
}

//day7B().then(r=>console.log(r)) 

