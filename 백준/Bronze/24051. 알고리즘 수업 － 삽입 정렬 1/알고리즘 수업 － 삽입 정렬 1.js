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

const insertionSort = (arr, k) => {
  let cnt = 0;
  for (let i = 1; i < arr.length; i++) {
    let loc = i - 1;
    const newItem = arr[i];

    while (0 <= loc && newItem < arr[loc]) {
      cnt++;
      if (k === cnt) return arr[loc];
      arr[loc + 1] = arr[loc];
      loc--;
    }
    if (loc + 1 !== i) {
      cnt++;
      if (k === cnt) return newItem;
      arr[loc + 1] = newItem;
    }
  }
  return -1;
};

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const answer = insertionSort(arr, k);
console.log(answer);
