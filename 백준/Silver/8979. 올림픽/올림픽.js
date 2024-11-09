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
  const [N, K] = input[0].split(" ").map(Number);

  const countries = [];

  for (let i = 1; i <= N; i++) {
    const [name, gold, silver, bronze] = input[i].split(" ").map(Number);
    countries.push({ name, gold, silver, bronze, rank: 0 });
  }
  let rank = 1;
  countries.sort(
    (a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze,
  );

  for (let i = 0; i < N; i++) {
    const { gold, silver, bronze } = countries[i];
    countries[i].rank = rank;
    const same = countries.filter(
      (v) => gold === v.gold && silver === v.silver && bronze === v.bronze,
    );
    if (same.length > 1) {
      same.forEach((v) => (v.rank = rank));
      rank += same.length;
      i += same.length - 1;
    } else {
      rank++;
    }
  }
  // console.log(countries);
  console.log(countries.find((v) => v.name === K).rank);
};

solution(input);
