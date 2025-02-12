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

class Deque {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }
  pushBack = (value) => {
    this.storage[this.tail] = value;
    this.tail++;
  };

  size = () => this.tail - this.head;

  popBack = () => {
    if (this.size() === 0) return -1;
    const node = this.storage[this.tail - 1];
    delete this.storage[this.tail - 1];
    this.tail--;
    if (this.head === this.tail) this.reset();
    return node;
  };

  reset = () => {
    this.tail = 0;
    this.head = 0;
    this.storage = {};
  };

  pushFront = (value) => {
    this.head--;
    this.storage[this.head] = value;
  };
  popFront = () => {
    if (this.size() === 0) return -1;
    const node = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;
    if (this.head === this.tail) this.size();
    return node;
  };
  isEmpty = () => {
    if (this.size() === 0) return 1;
    return 0;
  };
  front = () => {
    if (this.size() === 0) return -1;
    return this.storage[this.head];
  };
  back = () => {
    if (this.size() === 0) return -1;
    return this.storage[this.tail - 1];
  };
}

const solution = (input) => {
  const N = Number(input[0]);
  const answer = [];
  const deque = new Deque();
  for (let i = 1; i <= N; i++) {
    const [op, value] = input[i].split(" ").map(Number);
    if (op === 1) {
      deque.pushFront(value);
    } else if (op === 2) {
      deque.pushBack(value);
    } else if (op === 3) {
      answer.push(deque.popFront());
    } else if (op === 4) {
      answer.push(deque.popBack());
    } else if (op === 5) {
      answer.push(deque.size());
    } else if (op === 6) {
      answer.push(deque.isEmpty());
    } else if (op === 7) {
      answer.push(deque.front());
    } else {
      answer.push(deque.back());
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
