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

const backtracking = (symbols, numbers, pointer, result, results) => {
  if (pointer === numbers.length) {
    results.push(result);
    return;
  }

  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] > 0) {
      symbols[i]--;
      if (i === 0) {
        backtracking(
          symbols,
          numbers,
          pointer + 1,
          result + numbers[pointer],
          results,
        );
      } else if (i === 1) {
        backtracking(
          symbols,
          numbers,
          pointer + 1,
          result - numbers[pointer],
          results,
        );
      } else if (i === 2) {
        backtracking(
          symbols,
          numbers,
          pointer + 1,
          result * numbers[pointer],
          results,
        );
      } else {
        if (result > 0) {
          backtracking(
            symbols,
            numbers,
            pointer + 1,
            Math.floor(result / numbers[pointer]),
            results,
          );
        } else {
          backtracking(
            symbols,
            numbers,
            pointer + 1,
            Math.floor((result * -1) / numbers[pointer]) * -1,
            results,
          );
        }
      }
      symbols[i]++;
    }
  }
};

const solution = (input) => {
  const N = Number(input[0]);

  const numbers = input[1].split(" ").map(Number);
  const symbols = input[2].split(" ").map(Number);

  const results = [];
  backtracking(symbols, numbers, 1, numbers[0], results);
  console.log(`${Math.max(...results)}\n${Math.min(...results)}`);
};

solution(input);
