class MinHeap {
    constructor() {
        this.heap = [];
    }

    #getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;

    #getRightChildIdx = (parentIdx) => parentIdx * 2 + 2;

    #getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);

    peek = () => this.heap[0];
    
    size=()=>this.heap.length

    insert = (value) => {
        this.heap.push(value);
        this.#heapifyUp();
    };

    #heapifyUp = () => {
        let idx = this.heap.length - 1; // 계속 변한다. 초기값은 맨 마지막 인덱스
        const lastInsertedNode = this.heap[idx];

        // 루트 노드가 되기 전까지
        while (idx > 0) {
            const parentIdx = this.#getParentIdx(idx); // 현재 idx의 부모 인덱스

            if (this.heap[parentIdx] > lastInsertedNode) {
                this.heap[idx] = this.heap[parentIdx];
                idx = parentIdx;
            } else break;
        }

        this.heap[idx] = lastInsertedNode;
    };

    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop(); // 마지막 노드를 루트로 올리고
            this.#heapifyDown(); // 힙 정렬
        }
        return rootNode;
    };

    #heapifyDown = () => {
        let idx = 0;
        const count = this.heap.length;
        const rootNode = this.heap[idx];

        // left child가 있을 때까지 검사
        while (this.#getLeftChildIdx(idx) < count) {
            const leftChildIdx = this.#getLeftChildIdx(idx);
            const rightChildIdx = this.#getRightChildIdx(idx);

            const smallerChildIdx =
                rightChildIdx < count &&
                this.heap[rightChildIdx] < this.heap[leftChildIdx]
                    ? rightChildIdx
                    : leftChildIdx;

            if (this.heap[smallerChildIdx] <= rootNode) {
                this.heap[idx] = this.heap[smallerChildIdx];
                idx = smallerChildIdx;
            } else break;
        }

        this.heap[idx] = rootNode;
    };
}


function solution(scoville, K) {
    // 1. 스코빌을 힙에 전부 넣는다
    // 2. 힙의 원소가 전부 K 이상인지 확인한다.
    // 3. 섞는다.
    const heap=new MinHeap()
    for(const sco of scoville){
        heap.insert(sco)
    }
    let cnt=0
    while(heap.size()>=2 && heap.peek()<K){
        const s1=heap.remove()
        const s2=heap.remove()
        heap.insert(s1+(s2*2))
        cnt++
    }
  return heap.peek() >= K ? cnt : -1;
    
}