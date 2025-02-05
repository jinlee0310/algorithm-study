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

const solution = (input) => {
  const N = Number(input[0]);

  const queue = [];
  const answer = [];
  let head = 0;
  let tail = 0;

  for (let i = 1; i <= N; i++) {
    const cmdStr = input[i];
    const blankIdx = input[i].indexOf(" ");
    const op = blankIdx !== -1 ? cmdStr.substring(0, blankIdx) : cmdStr;
    const x =
      blankIdx !== -1 ? parseInt(cmdStr.substring(blankIdx + 1), 10) : 0;

    if (op === "push") {
      queue.push(x);
      tail++;
    } else if (op === "pop") {
      if (head === tail) answer.push(-1);
      else {
        answer.push(queue[head]);
        head++;
      }
    } else if (op === "size") {
      answer.push(tail - head);
    } else if (op === "empty") {
      answer.push(head === tail ? 1 : 0);
    } else if (op === "front") {
      answer.push(head === tail ? -1 : queue[head]);
    } else if (op === "back") {
      answer.push(head === tail ? -1 : queue[tail - 1]);
    }
  }
  console.log(answer.join("\n"));
};

solution(input);
