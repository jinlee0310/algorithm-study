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

const convertBinary = (n) => {
  const binary = [];
  let num = n;
  while (num > 1) {
    binary.push(num % 2);
    num = Math.floor(num / 2);
  }
  binary.push(num);
  binary.push(...Array(6 - binary.length).fill(0));
  return binary.reverse();
};

const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

const solution = (input) => {
  const TC = Number(input[0]);
  const answer = [];

  for (let i = 1; i <= TC; i++) {
    const [hh, mm, ss] = input[i].split(":").map(Number);
    const hhBinary = convertBinary(hh);
    const mmBinary = convertBinary(mm);
    const ssBinary = convertBinary(ss);

    const transposeMatrix = transpose([hhBinary, mmBinary, ssBinary]);
    const column = transposeMatrix.map((v) => v.join("")).join("");
    const row = `${hhBinary.join("")}${mmBinary.join("")}${ssBinary.join("")}`;
    answer.push(`${column} ${row}`);
  }
  console.log(answer.join("\n"));
};

solution(input);
