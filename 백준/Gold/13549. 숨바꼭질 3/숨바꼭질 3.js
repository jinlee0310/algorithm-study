const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  #getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;
  #getRightChildIdx = (parentIdx) => parentIdx * 2 + 2;
  #getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);

  heappush = (priority, value) => {
    const node = { priority, value };
    this.heap.push(node);
    this.#heapifyUp();
  };
  #heapifyUp = () => {
    let idx = this.heap.length - 1;
    const lastInsertedNode = this.heap[idx];

    while (idx > 0) {
      const parentIdx = this.#getParentIdx(idx);
      if (this.heap[parentIdx].priority > lastInsertedNode.priority) {
        this.heap[idx] = this.heap[parentIdx];
        idx = parentIdx;
      } else break;
    }
    this.heap[idx] = lastInsertedNode;
  };

  heappop = () => {
    const rootNode = this.heap[0];
    if (this.heap.length <= 0) return undefined;
    if (this.heap.length === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.#heapifyDown();
    }
    return rootNode;
  };
  #heapifyDown = () => {
    let idx = 0;
    const rootNode = this.heap[idx];

    while (this.#getLeftChildIdx(idx) < this.heap.length) {
      const leftChildIdx = this.#getLeftChildIdx(idx);
      const rightChildIdx = this.#getRightChildIdx(idx);

      const smallerChildIdx =
        rightChildIdx < this.heap.length &&
        this.heap[rightChildIdx].priority < this.heap[leftChildIdx].priority
          ? rightChildIdx
          : leftChildIdx;
      if (this.heap[smallerChildIdx].priority < rootNode.priority) {
        this.heap[idx] = this.heap[smallerChildIdx];
        idx = smallerChildIdx;
      } else break;
    }
    this.heap[idx] = rootNode;
  };

  size = () => this.heap.length;
}

const dijkstra = (N, K) => {
  if (N === K) return 0; // 수빈이와 동생이 같은 위치에 있는 경우

  const MAX_POSITION = 100000;
  const distance = new Array(MAX_POSITION + 1).fill(Infinity);
  const queue = new PriorityQueue();
  queue.heappush(0, N);
  distance[N] = 0;

  while (queue.size()) {
    const { priority: time, value: current } = queue.heappop();

    const nextPositions = [current - 1, current + 1, current * 2];

    for (const next of nextPositions) {
      if (0 <= next && next <= MAX_POSITION) {
        const cost = next === current * 2 ? time : time + 1;
        if (cost < distance[next]) {
          distance[next] = cost;
          queue.heappush(cost, next);
        }
      }
    }
  }
  return distance[K];
};

const solution = (input) => {
  const [s, e] = input.split(" ").map((v) => Number(v));
  console.log(dijkstra(s, e));
};

solution(input);
