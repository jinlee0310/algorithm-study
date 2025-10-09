const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim();

const croatian = /(dz=|c=|c-|d-|lj|nj|s=|z=)/g;

const replaced = input.replace(croatian, "*");
console.log(replaced.length);
