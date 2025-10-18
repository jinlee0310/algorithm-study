const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const D = (n) => {
  return (n * 2) % 10000;
};

const S = (n) => {
  if (n === 0) return 9999;
  else return n - 1;
};

const L = (n) => {
  let num = n;
  const d1 = Math.floor(num / 1000);
  num %= 1000;
  num *= 10;
  return num + d1;
};

const R = (n) => {
  let num = n;
  const d4 = num % 10;
  num = Math.floor(num / 10);
  return d4 * 1000 + num;
};

const getOperation = (start, target) => {
  const queue = [[start, ""]];
  const commands = ["D", "S", "L", "R"];
  const visited = Array(10000).fill(false);

  while (queue.length) {
    const [now, route] = queue.shift();

    if (now === target) {
      return route;
    }

    for (let command of commands) {
      if (command === "D") {
        const d = D(now);
        if (!visited[d]) {
          visited[d] = true;
          queue.push([d, `${route}D`]);
        }
      } else if (command === "S") {
        const s = S(now);
        if (!visited[s]) {
          visited[s] = true;
          queue.push([s, `${route}S`]);
        }
      } else if (command === "L") {
        const l = L(now);
        if (!visited[l]) {
          visited[l] = true;
          queue.push([l, `${route}L`]);
        }
      } else {
        const r = R(now);
        if (!visited[r]) {
          visited[r] = true;
          queue.push([r, `${route}R`]);
        }
      }
    }
  }
};

const solution = (input) => {
  const T = Number(input[0]);
  const answer = [];
  for (let i = 1; i <= T; i++) {
    const [start, target] = input[i].split(" ").map(Number);
    const operation = getOperation(start, target);
    answer.push(operation);
  }
  console.log(answer.join("\n"));
};

solution(input);
