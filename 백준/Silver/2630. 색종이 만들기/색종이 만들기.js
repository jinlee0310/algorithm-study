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

const hasSameColor = (paper) => {
  const num = paper[0][0];
  for (let i = 0; i < paper.length; i++) {
    for (let j = 0; j < paper.length; j++) {
      if (paper[j][i] !== num) return false;
    }
  }
  return true;
};

let blue = 0,
  white = 0;

const cutting = (paper, n) => {
  const cuts = [[], [], [], []];

  for (let j = 0; j < n; j++) {
    cuts[0].push(paper[j].slice(0, n));
    cuts[1].push(paper[j].slice(n));
  }

  for (let j = n; j < paper.length; j++) {
    cuts[2].push(paper[j].slice(0, n));
    cuts[3].push(paper[j].slice(n));
  }
  cuts.forEach((cut) => {
    if (hasSameColor(cut)) {
      cut[0][0] === 1 ? (blue += 1) : (white += 1);
    } else {
      cutting(cut, n / 2);
    }
  });
};

const solution = (input) => {
  const n = Number(input[0]);
  const paper = [];
  for (let i = 1; i <= n; i++) {
    paper.push(input[i].split(" ").map((v) => Number(v)));
  }
  if (hasSameColor(paper)) {
    paper[0][0] === 1 ? (blue += 1) : (white += 1);
  } else {
    cutting(paper, n / 2);
  }
  console.log(white);
  console.log(blue);
};

solution(input);
