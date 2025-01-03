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

  pushFront = (value) => {
    this.head--;
    this.storage[this.head] = value;
  };

  popBack = () => {
    if (this.head === this.tail) {
      return -1;
    }

    this.tail--;
    const temp = this.storage[this.tail];
    delete this.storage[this.tail];

    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }
    return temp;
  };

  popFront = () => {
    if (this.head === this.tail) {
      return -1;
    }

    const temp = this.storage[this.head];
    delete this.storage[this.head];
    this.head++;

    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
    }
    return temp;
  };

  size = () => this.tail - this.head;

  front = () => this.storage[this.head] ?? -1;
  back = () => this.storage[this.tail - 1] ?? -1;

  isEmpty = () => (this.size() === 0 ? 1 : 0);
}

const solution = (input) => {
  const n = Number(input[0]);
  const deque = new Deque();
  const answer = [];
  for (let i = 1; i <= n; i++) {
    const [op, num] = input[i].split(" ");
    switch (op) {
      case "push_front":
        deque.pushFront(Number(num));
        break;
      case "push_back":
        deque.pushBack(Number(num));
        break;
      case "pop_front":
        answer.push(deque.popFront());
        break;
      case "pop_back":
        answer.push(deque.popBack());
        break;
      case "size":
        answer.push(deque.size());
        break;
      case "empty":
        answer.push(deque.isEmpty());
        break;
      case "front":
        answer.push(deque.front());
        break;
      case "back":
        answer.push(deque.back());
        break;
      default:
        break;
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
