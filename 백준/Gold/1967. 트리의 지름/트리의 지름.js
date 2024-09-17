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
    let idx = 0;
    const rootNode = this.heap[0];

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

const dijkstra = (graph, start) => {
  const queue = new PriorityQueue();
  queue.heappush(0, start);
  const distance = new Array(graph.length).fill(Infinity);
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
  // console.log(distance);
  return distance.slice(1);
};

const solution = (input) => {
  const n = Number(input[0]);
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 1; i < n; i++) {
    const [a, b, c] = input[i].split(" ").map((v) => Number(v));
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }
  const distances = dijkstra(graph, 1);
  let maxIdx = 0;
  for (let i = 0; i < distances.length; i++) {
    if (distances[i] > distances[maxIdx]) {
      maxIdx = i;
    }
  }

  console.log(Math.max(...dijkstra(graph, maxIdx + 1)));
};

solution(input);
