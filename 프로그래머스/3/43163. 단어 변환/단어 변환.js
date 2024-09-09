const canTranslate=(word1,word2)=>{
    let cnt=0
    for(let i=0;i<word1.length;i++){
        if(word1[i]===word2[i]) cnt++
    }
    return cnt===word1.length-1
}

const bfs=(graph,start,end,visited)=>{
    const queue=[start]
    visited[start]++
    
    while(queue.length!==0){
        const word=queue.shift()
        
        for(const node of graph[word]){
            if(visited[node]===0){
                queue.push(node)
                visited[node]=visited[word]+1
                
            }
        }
    }
    return visited[end]
}

function solution(begin, target, words) {
    if(!words.includes(target)) return 0
    words.push(begin)
    const graph={}
    const visited={}
    for(const word of words){
        graph[word]=[]
        visited[word]=0
    }
    for(let i=0;i<words.length;i++){
        for(let j=i;j<words.length;j++){
            if(canTranslate(words[i],words[j])){
                graph[words[i]].push(words[j])
                graph[words[j]].push(words[i])
            }
        }
    }
    // console.log(graph)
    const answer=bfs(graph,begin,target,visited)
    // console.log(answer)
    return answer-1
}