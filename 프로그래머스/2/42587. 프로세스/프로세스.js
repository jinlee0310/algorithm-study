
function solution(priorities, location) {
    const arr=[]
    for(let i=0;i<priorities.length;i++){
        arr.push({priority:priorities[i],value:i})
    }
    let node=arr.shift()
    const process=[]
    while(arr.length!==0||node){
        if(arr.find(v=>v.priority>node.priority)){
            arr.push(node)
        }else{
            process.push(node)
        }
        node=arr.shift()
    }
    // console.log(process)
    return process.findIndex(v=>v.value===location)+1
}