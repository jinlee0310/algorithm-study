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

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  #getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;
  #getRightChildIdx = (parentIdx) => parentIdx * 2 + 2;
  #getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);

  heappush = (value) => {
    this.heap.push(value);
    this.#heapifyUp();
  };

  #heapifyUp = () => {
    let idx = this.heap.length - 1;
    const lastInsertedNode = this.heap[idx];

    while (idx > 0) {
      const parentIdx = this.#getParentIdx(idx);
      if (this.heap[parentIdx] < lastInsertedNode) {
        this.heap[idx] = this.heap[parentIdx];
        idx = parentIdx;
      } else break;
    }

    this.heap[idx] = lastInsertedNode;
  };

  heappop = () => {
    const rootNode = this.heap[0];
    if (this.heap.length <= 0) return 0;
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

      const largerChildIdx =
        rightChildIdx < this.heap.length &&
        this.heap[rightChildIdx] > this.heap[leftChildIdx]
          ? rightChildIdx
          : leftChildIdx;
      if (this.heap[largerChildIdx] > rootNode) {
        this.heap[idx] = this.heap[largerChildIdx];
        idx = largerChildIdx;
      } else break;
    }
    this.heap[idx] = rootNode;
  };
}

const solution = (input) => {
  const n = Number(input[0]);
  const heap = new MaxHeap();
  const answer = [];
  for (let i = 1; i <= n; i++) {
    if (Number(input[i]) === 0) {
      answer.push(heap.heappop());
    } else {
      heap.heappush(Number(input[i]));
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
