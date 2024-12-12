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
  const [A, B] = input[0].split(" ").map(Number);

  // 톰이 가지고 있는 치즈의 무게는 (B - A) / B
  const numerator = B - A; // 분자
  const denominator = B; // 분모

  // 최대공약수를 구해서 기약분수로 만들기
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

  const divisor = gcd(numerator, denominator);
  const reducedNumerator = numerator / divisor;
  const reducedDenominator = denominator / divisor;

  console.log(reducedNumerator, reducedDenominator);
};

solution(input);