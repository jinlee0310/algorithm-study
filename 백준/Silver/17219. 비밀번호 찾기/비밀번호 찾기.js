const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const obj = {};
for (let i = 1; i <= n; i++) {
  const [site, password] = input[i].split(" ");
  obj[site] = password;
}

const answer = [];
for (let i = n + 1; i <= n + m + 1; i++) {
  answer.push(obj[input[i]]);
}
console.log(answer.join("\n"));
