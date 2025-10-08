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

const isSameArr = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const selectionSort = (arr, compareArr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let max = 0,
      maxIdx = -1;
    for (let j = 0; j <= i; j++) {
      if (arr[j] > max) {
        max = arr[j];
        maxIdx = j;
      }
    }

    if (max !== arr[i]) {
      const temp = arr[i];
      arr[i] = max;
      arr[maxIdx] = temp;
    }
    if (isSameArr(arr, compareArr)) return 1;
  }
  return 0;
};

const n = Number(input[0]);

const arr1 = input[1].split(" ").map(Number);
const arr2 = input[2].split(" ").map(Number);

if (isSameArr(arr1, arr2)) {
  console.log(1);
} else {
  const answer = selectionSort(arr1, arr2);
  console.log(answer);
}
