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
  const distance = Array(graph.length).fill(Infinity);
  const queue = new PriorityQueue();
  queue.heappush(0, start);
  distance[start] = 0;

  while (queue.size()) {
    const { priority: dist, value: now } = queue.heappop();

    for (const node of graph[now]) {
      const cost = dist + node[1];
      if (cost < distance[node[0]]) {
        distance[node[0]] = cost;
        queue.heappush(cost, node[0]);
      }
    }
  }
  // console.log(distance);
  return distance;
};

const solution = (input) => {
  const [N, E] = input[0].split(" ").map((v) => Number(v));
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(" ").map((v) => Number(v));
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }
  const [u, v] = input[input.length - 1].split(" ").map((v) => Number(v));

  const from1 = dijkstra(graph, 1);
  const fromu = dijkstra(graph, u);
  const fromv = dijkstra(graph, v);

  const dist1 = from1[u] + fromu[v] + fromv[N];
  const dist2 = from1[v] + fromv[u] + fromu[N];

  const answer = Math.min(dist1, dist2);
  console.log(answer === Infinity ? -1 : answer);
};

solution(input);
