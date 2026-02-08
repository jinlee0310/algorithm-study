const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const getDepthByRight = (root, rc) => {
  let depth = 0;
  let cur = root;
  while (rc[cur]) {
    cur = rc[cur];
    depth++;
  }
  return depth;
};

const solution = (input) => {
  const lc = Array(N + 1).fill(0);
  const rc = Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    if (b !== -1) lc[a] = b;
    if (c !== -1) rc[a] = c;
  }

  const depth = getDepthByRight(1, rc);
  console.log(2 * (N - 1) - depth);
};

solution(input);
