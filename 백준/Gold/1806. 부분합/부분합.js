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
  const [n, s] = input[0].split(" ");
  const numArr = input[1].split(" ").map((v) => Number(v));

  if (numArr.reduce((acc, cur) => acc + cur, 0) < s) {
    console.log(0);
    return;
  }

  let en = 0,
    len = n,
    sum = numArr[0];
  for (let st = 0; st < n; st++) {
    while (en < n && sum < s) {
      en++;
      sum += numArr[en];
    }
    // console.log(sum, st, en);
    if (en >= n) break;
    len = Math.min(len, en - st + 1);
    sum -= numArr[st];
  }
  console.log(len);
};

solution(input);
