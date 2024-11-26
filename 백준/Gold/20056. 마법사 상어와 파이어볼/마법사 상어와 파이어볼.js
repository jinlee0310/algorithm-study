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

const move = (fireballs, N) => {
  // r,c
  const dir = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  for (let i = 0; i < fireballs.length; i++) {
    const { r, c, m, d, s } = fireballs[i];
    const newR = (r + dir[d][0] * s) % N;
    const newC = (c + dir[d][1] * s) % N;
    fireballs[i] = {
      r: newR <= 0 ? newR + N : newR,
      c: newC <= 0 ? newC + N : newC,
      m,
      d,
      s,
    };
  }
};

const divide = (fireballs, N) => {
  const newFireballs = [];
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      const fireballToMerge = fireballs.filter(
        ({ r, c }) => r === i && c === j,
      );
      if (fireballToMerge.length > 1) {
        const newM = Math.floor(
          fireballToMerge.reduce((acc, cur) => acc + cur.m, 0) / 5,
        );
        const newS = Math.floor(
          fireballToMerge.reduce((acc, cur) => acc + cur.s, 0) /
            fireballToMerge.length,
        );
        let dir;
        const cnt = fireballToMerge.reduce((acc, cur) => acc + (cur.d % 2), 0);
        if (0 < cnt && cnt < fireballToMerge.length) {
          dir = [1, 3, 5, 7];
        } else {
          dir = [0, 2, 4, 6];
        }
        if (newM > 0) {
          for (let k = 0; k < 4; k++) {
            newFireballs.push({ r: i, c: j, m: newM, s: newS, d: dir[k] });
          }
        }
      } else {
        newFireballs.push(...fireballToMerge);
      }
    }
  }
  // console.log(newFireballs);
  return newFireballs;
};

const solution = (input) => {
  let [N, M, K] = input[0].split(" ").map(Number);
  let fireballs = [];
  for (let i = 1; i <= M; i++) {
    const [r, c, m, s, d] = input[i].split(" ").map(Number);
    fireballs.push({ r, c, m, s, d });
  }
  // console.log(fireballs);
  while (K > 0) {
    K--;
    move(fireballs, N);
    fireballs = divide(fireballs, N);
  }
  console.log(fireballs.reduce((acc, cur) => acc + cur.m, 0));
};

solution(input);
