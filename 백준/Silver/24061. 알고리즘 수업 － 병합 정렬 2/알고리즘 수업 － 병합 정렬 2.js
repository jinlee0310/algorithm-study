const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);

let cnt = 0;
let answer = -1;

const tmp = new Array(N);

const merge = (p, q, r) => {
  let i = p;
  let j = q + 1;
  let t = 0;

  // 두 구간을 정렬 상태로 병합하면서 tmp에 먼저 채운다
  while (i <= q && j <= r) {
    if (A[i] <= A[j]) tmp[t++] = A[i++];
    else tmp[t++] = A[j++];
  }
  while (i <= q) tmp[t++] = A[i++];
  while (j <= r) tmp[t++] = A[j++];

  // 이제 tmp를 A[p..r]에 다시 써 넣는다: 이 때가 '저장'으로 카운트됨
  for (let k = 0; k < t; k++) {
    A[p + k] = tmp[k];
    cnt++;
    if (cnt === K) {
      answer = A.join(" "); // 또는 tmp[k]
      // 계속 진행(정렬은 끝까지 돌아야 함)
    }
  }
};

const mergeSort = (p, r) => {
  if (p >= r) return;
  const q = Math.floor((p + r) / 2);
  mergeSort(p, q);
  mergeSort(q + 1, r);
  merge(p, q, r);
};

mergeSort(0, N - 1);
console.log(answer);
