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
  const n = Number(input[0]);
  const conference = [];
  for (let i = 1; i <= n; i++) {
    const [s, e] = input[i].split(" ").map((v) => Number(v));
    conference.push([s, e]);
  }

  conference.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  let answer = 0;

  let time = 0;
  for (let i = 0; i < conference.length; i++) {
    if (conference[i][0] >= time) {
      answer++;
      time = conference[i][1];
    }
  }
  console.log(answer);
};

solution(input);
