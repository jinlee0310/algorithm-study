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
  const [king, queen, look, bishop, knight, phone] = input
    .split(" ")
    .map(Number);

  console.log(
    `${1 - king} ${1 - queen} ${2 - look} ${2 - bishop} ${2 - knight} ${
      8 - phone
    }`
  );
};

solution(input);
