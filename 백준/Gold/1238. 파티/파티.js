const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

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
    const rootNode = this.heap[0];
    let idx = 0;

    while (this.#getLeftChildIdx(idx) < this.heap.length) {
      const rightChildIdx = this.#getRightChildIdx(idx);
      const leftChildIdx = this.#getLeftChildIdx(idx);

      const smallerChildIdx =
        rightChildIdx < this.heap.length &&
        this.heap[rightChildIdx].priority < this.heap[leftChildIdx].priority
          ? rightChildIdx
          : leftChildIdx;
      if (this.heap[smallerChildIdx].priority > rootNode.priority) {
        this.heap[idx] = this.heap[smallerChildIdx];
        idx = smallerChildIdx;
      } else break;
    }
    this.heap[idx] = rootNode;
  };
  size = () => this.heap.length;
}

const dijkstra = (graph, start, x) => {
  const queue = new PriorityQueue();
  queue.heappush(0, start);
  const distance = new Array(graph.length).fill(Infinity);
  distance[0] = 0;
  distance[start] = 0;

  while (queue.size()) {
    const { priority: dist, value: now } = queue.heappop();

    if (distance[now] < dist) continue;

    for (const node of graph[now]) {
      const cost = dist + node[1];
      if (cost < distance[node[0]]) {
        distance[node[0]] = cost;
        queue.heappush(cost, node[0]);
      }
    }
  }
  return distance;
};

const solution = (input) => {
  const [n, m, x] = input[0].split(" ").map((v) => Number(v));
  const graph = Array.from({ length: n + 1 }, () => []);
  const reverseGraph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i <= m; i++) {
    const [a, b, dist] = input[i].split(" ").map((v) => Number(v));
    graph[a].push([b, dist]);
    reverseGraph[b].push([a, dist]);
  }
  const toX = dijkstra(reverseGraph, x);
  const fromX = dijkstra(graph, x);
  const sum = toX.map((v, idx) => v + fromX[idx]);
  console.log(Math.max(...sum));
};

solution(input);
