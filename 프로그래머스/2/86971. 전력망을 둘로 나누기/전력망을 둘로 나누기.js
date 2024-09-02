const dfs=(graph,v,visited,nodes)=>{
    visited[v]=true;
    nodes.push(v)
    
    for(const node of graph[v]){
        if(!visited[node]){
            dfs(graph,node,visited,nodes)
        }
    }
    return nodes
}

function solution(n, wires) {
    // 1. 하나빼고 그래프 연결한 다음에
    // 2. dfs 돌리면 되지
   const cand=[]
  wires.forEach((v, idx) => {
    const splitWire = [...wires.slice(0, idx), ...wires.slice(idx + 1)];
    const graph = Array.from({ length: n + 1 }, () => []);

    for (const wire of splitWire) {
      const [s, e] = wire;
      graph[s].push(e);
      graph[e].push(s);
    }
    const visited = new Array(n + 1).fill(false);

    const a = dfs(graph, v[0], visited, []);
    const b = dfs(graph, v[1], visited, []);

    cand.push(Math.abs(a.length - b.length));
  });
    
    return Math.min(...cand);
}