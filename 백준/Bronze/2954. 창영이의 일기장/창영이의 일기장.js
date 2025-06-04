const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const solution = (input) => {
  const vowels = ["apa", "epe", "ipi", "opo", "upu"];

  let str = input;
  for (let vowel of vowels) {
    str = str.replaceAll(vowel, vowel[0]);
  }
  console.log(str);
};

solution(input);
