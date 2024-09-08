const dfs=(graph,v,visited)=>{
    visited[v]=true
    for(const node of graph[v]){
        if(!visited[node]){
            dfs(graph,node,visited)
        }
    }
}

function solution(n, computers) {
    const graph=Array.from({length:computers.length},()=>[])
    for(let i=1;i<computers.length;i++){
        for(let j=0;j<i;j++){
            if(computers[i][j]===1){
                graph[i].push(j)
                graph[j].push(i)
            }
        }
    }
    
    const visited=new Array(graph.length).fill(false)
    let cnt=0;
    for(let i=0;i<graph.length;i++){
        if(!visited[i]){
            cnt++
            dfs(graph,i,visited)
        }
    }
    return cnt
}