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

class Heap {
  constructor() {
    this.heap = [];
  }
  #getParentIdx = (childIdx) => Math.floor((childIdx - 1) / 2);
  #getLeftChildIdx = (parentIdx) => parentIdx * 2 + 1;
  #getRightChildIdx = (parentIdx) => parentIdx * 2 + 2;

  heappush = (value, sign) => {
    const node = { value, sign };
    this.heap.push(node);
    this.#heapifyUp();
    // console.log(this.heap);
  };
  #heapifyUp = () => {
    let idx = this.heap.length - 1;
    const lastInsertedNode = this.heap[idx];

    while (idx > 0) {
      const parentIdx = this.#getParentIdx(idx);

      if (
        this.heap[parentIdx].value > lastInsertedNode.value ||
        (this.heap[parentIdx].value === lastInsertedNode.value &&
          this.heap[parentIdx].value * this.heap[parentIdx].sign >
            lastInsertedNode.value * lastInsertedNode.sign)
      ) {
        this.heap[idx] = this.heap[parentIdx];
        idx = parentIdx;
      } else break;
    }
    this.heap[idx] = lastInsertedNode;
  };

  heappop = () => {
    const rootNode = this.heap[0];
    if (this.heap.length <= 0) return { value: 0, sign: 1 };
    if (this.heap.length === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.#heapifyDown();
    }
    // console.log(this.heap);
    return rootNode;
  };

  #getRealValue = (node) => {
    return node.value * node.sign;
  };
  #heapifyDown = () => {
    let idx = 0;
    const rootNode = this.heap[0];

    while (this.#getLeftChildIdx(idx) < this.heap.length) {
      const rightChildIdx = this.#getRightChildIdx(idx);
      const leftChlidIdx = this.#getLeftChildIdx(idx);

      const smallerChildIdx =
        rightChildIdx < this.heap.length &&
        (this.heap[rightChildIdx].value < this.heap[leftChlidIdx].value ||
          (this.heap[rightChildIdx].value === this.heap[leftChlidIdx].value &&
            this.#getRealValue(this.heap[rightChildIdx]) <
              this.#getRealValue(this.heap[leftChlidIdx])))
          ? rightChildIdx
          : leftChlidIdx;

      if (
        this.heap[smallerChildIdx].value < rootNode.value ||
        (this.heap[smallerChildIdx].value === rootNode.value &&
          this.#getRealValue(this.heap[smallerChildIdx]) <
            this.#getRealValue(rootNode))
      ) {
        this.heap[idx] = this.heap[smallerChildIdx];
        idx = smallerChildIdx;
      } else break;
    }
    this.heap[idx] = rootNode;
  };
  size = () => this.heap.length;
}

const solution = (input) => {
  const N = Number(input[0]);
  const heap = new Heap();

  const answer = [];
  for (let i = 1; i <= N; i++) {
    const num = Number(input[i]);
    if (num === 0) {
      const node = heap.heappop();
      // console.log(node.value * node.sign);
      answer.push(node.value * node.sign);
    } else {
      const value = Math.abs(num);
      const sign = num < 0 ? -1 : 1;
      heap.heappush(value, sign);
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
