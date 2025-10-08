const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt")
  )
  .toString()
  .trim()
  .split("\n");

const bubbleSort = (arr, k) => {
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i; j++) {
      if (arr[j] < arr[j - 1]) {
        cnt++;
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        if (cnt === k) return arr.join(" ");
      }
    }
  }
  return -1;
};

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const answer = bubbleSort(arr, k);
console.log(answer);
