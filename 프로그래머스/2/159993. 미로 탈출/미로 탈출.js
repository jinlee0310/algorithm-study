const bfs=(graph,start,end)=>{
    const visited=Array.from({length:graph.length},()=>new Array(graph[0].length).fill(0))
    const queue=[start]
    visited[start[1]][start[0]]=1
    
    const dx=[1,-1,0,0]
    const dy=[0,0,1,-1]
    
    while(queue.length){
        const [x,y]=queue.shift()
        if(graph[y][x]===graph[end[1]][end[0]]) break;
        
        for(let i=0;i<4;i++){
            const nx=x+dx[i]
            const ny=y+dy[i]
            
            if(0<=nx && nx<graph[0].length &&0<=ny && ny<graph.length&&visited[ny][nx]===0 && graph[ny][nx]!=='X'){
                visited[ny][nx]=visited[y][x]+1
                queue.push([nx,ny])
            }
        }
    }
    console.log(visited)
    return visited[end[1]][end[0]]-1
    
}

function solution(maps) {
    const graph=maps.map(v=>v.split(''))
    let start,lever,end;
    for(let j=0;j<graph.length;j++){
        for(let i=0;i<graph[0].length;i++){
            if(graph[j][i]==='S'){
                start=[i,j]
            }else if(graph[j][i]==='L'){
                lever=[i,j]
            }else if(graph[j][i]==='E'){
                end=[i,j]
            }
        }
    }

    const sToL=bfs(graph,start,lever)
    const lToE=bfs(graph,lever,end)
    console.log(sToL,lToE)
    
    if(sToL===-1||lToE===-1) return -1
    else return sToL+lToE
}