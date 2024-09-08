const bfs=(graph)=>{
    const visited=Array.from({length:graph.length},()=>new Array(graph[0].length).fill(0))
    
    const queue=[[0,0]]
    
    const dx=[1,-1,0,0]
    const dy=[0,0,1,-1]
    
    while(queue.length!==0){
        const [x,y]=queue.shift()
        
        for(let i=0;i<4;i++){
            const nx=x+dx[i]
            const ny=y+dy[i]
            
            if(0<=nx && nx<graph[0].length && 0<=ny&&ny<graph.length&&visited[ny][nx]===0&&graph[ny][nx]===1){
                visited[ny][nx]=visited[y][x]+1
                queue.push([nx,ny])
            }
        }
    }
    return visited[graph.length-1][graph[0].length-1]
}

function solution(maps) {
    const answer = bfs(maps);
    return answer===0? -1:answer+1;
}