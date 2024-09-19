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

  peek = () => this.heap[0];

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

      if (this.heap[smallerChildIdx].priority < this.heap[idx].priority) {
        this.heap[idx] = this.heap[smallerChildIdx];
        idx = smallerChildIdx;
      } else break;
    }

    this.heap[idx] = rootNode;
  };

  size = () => this.heap.length;
}

const dijkstra = (graph, start) => {
  const distance = new Array(graph.length).fill(Infinity);
  const queue = new PriorityQueue();
  queue.heappush(0, start);
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
  // console.log(distance.map((v) => (v === Infinity ? 0 : v)));
  return distance.map((v) => (v === Infinity ? 0 : v));
};

const solution = (input) => {
  const v = Number(input[0]);
  const graph = Array.from({ length: v + 1 }, () => []);
  for (let i = 1; i <= v; i++) {
    const nums = input[i].split(" ").map((v) => Number(v));
    let j = 1;
    let node = nums[0];
    while (nums[j] !== -1) {
      graph[node].push([nums[j], nums[j + 1]]);
      graph[nums[j]].push([node, nums[j + 1]]);
      j += 2;
    }
  }
  const distance = dijkstra(graph, 1);
  const maxDistance = Math.max(...distance);
  const maxIdx = distance.findIndex((v) => v === maxDistance);
  console.log(Math.max(...dijkstra(graph, maxIdx)));
};

solution(input);
