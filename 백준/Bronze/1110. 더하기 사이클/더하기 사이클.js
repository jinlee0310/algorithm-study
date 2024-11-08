const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const cycle = (n) => {
  let cnt = 0;
  const initial = n;
  while (true) {
    cnt++;

    if (n <= 10) {
      n = Number(`0${n}`);
    }

    let n1 = Math.floor(n / 10);
    let n2 = n % 10;

    let newN2 = (n1 + n2) % 10;

    let newN = Number(`${n2}${newN2}`);

    if (initial === newN) break;
    else n = newN;
  }
  return cnt;
};

const solution = (input) => {
  const n = Number(input);
  console.log(cycle(n));
};

solution(input);
