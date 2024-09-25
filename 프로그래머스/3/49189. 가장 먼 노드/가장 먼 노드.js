class Heap{
    constructor(){
        this.heap=[]
    }
    
    #getLeftChildIdx=(parentIdx)=>parentIdx*2+1
    #getRightChildIdx=(parentIdx)=>parentIdx*2+2
    #getParentIdx=(childIdx)=>Math.floor((childIdx-1)/2)
    
    heappush=(priority,value)=>{
        const node={priority,value}
        this.heap.push(node)
        this.#heapifyUp()
    }
    #heapifyUp=()=>{
        let idx=this.heap.length-1
        const lastInsertedNode=this.heap[idx]
        
        while(idx>0){
            const parentIdx=this.#getParentIdx(idx)
            
            if(this.heap[parentIdx].priority>lastInsertedNode.priority){
                this.heap[idx]=this.heap[parentIdx]
                idx=parentIdx
            }else break;
        }
        this.heap[idx]=lastInsertedNode
    }
    
    heappop=()=>{
        const rootNode=this.heap[0]
        if(this.heap.length<=0) return undefined
        if(this.heap.length===1) this.heap=[]
        else{
            this.heap[0]=this.heap.pop()
            this.#heapifyDown()
        }
        return rootNode
    }
    #heapifyDown=()=>{
        const rootNode=this.heap[0]
        let idx=0;
        
        while(this.#getLeftChildIdx(idx)<this.heap.length){
            const leftChildIdx=this.#getLeftChildIdx(idx)
            const rightChildIdx=this.#getRightChildIdx(idx)
            
            const smallerChildIdx=rightChildIdx<this.heap.length && this.heap[rightChildIdx].priority<this.heap[leftChildIdx].priority? rightChildIdx:leftChildIdx
            
            if(this.heap[smallerChildIdx].priority<rootNode.priority){
                this.heap[idx]=this.heap[smallerChildIdx]
                idx=smallerChildIdx
            } else break
        }
        this.heap[idx]=rootNode
    }
    size=()=>this.heap.length
}

const dijkstra=(graph,start)=>{
    const distance=Array(graph.length).fill(Infinity)
    const queue=new Heap()
    queue.heappush(0,start)
    distance[start]=0
    
    while(queue.size()){
        const {priority:dist,value:now}=queue.heappop()
        
        for(const node of graph[now]){
            const cost=dist+node[1]
            if(cost<distance[node[0]]){
                distance[node[0]]=cost
                queue.heappush(cost,node[0])
            }
        }
    }
    console.log(distance)
    return distance.slice(1)
}

function solution(n, edge) {
    // 1. 1번노드에서 모든 노드가 도착점으로 하는 bfs 수행
    const graph=Array.from({length:n+1},()=>[])
    for(const v of edge){
        const [s,e]=v
        graph[s].push([e,1])
        graph[e].push([s,1])
    }
    const distance=dijkstra(graph,1)
    const max=Math.max(...distance)
    return distance.filter(v=>v===max).length
    
}