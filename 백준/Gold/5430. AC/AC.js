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
  const T = Number(input[0]);
  const answer = [];
  for (let i = 0; i < T; i++) {
    const operations = input[i * 3 + 1].split("");
    const n = Number(input[i * 3 + 2]);
    const numArr = input[i * 3 + 3]
      .slice(1, input[i * 3 + 3].length - 1)
      .split(",")
      .map((v) => Number(v));
    let st = 0;
    let en = n - 1;
    let length = n;

    for (const op of operations) {
      if (op === "R") {
        [st, en] = [en, st];
      } else if (op === "D") {
        st > en ? (st -= 1) : (st += 1);
        length -= 1;
      }
      if (length < 0) break;
    }
    let str = "error";
    if (length > 0) {
      const arr =
        st < en ? numArr.slice(st, en + 1) : numArr.slice(en, st + 1).reverse();
      str = `[${arr.join(",")}]`;
    } else if (length === 0) {
      str = "[]";
    }
    answer.push(str);
  }
  console.log(answer.join("\n"));
};

solution(input);
