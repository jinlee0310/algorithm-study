// BOJ 20955 - Node.js
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let idx = 0;
const N = input[idx++], M = input[idx++];

const parent = Array.from({ length: N + 1 }, (_, i) => i);
const rank = Array(N + 1).fill(0);

function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}

function union(a, b) {
  a = find(a); b = find(b);
  if (a === b) return false; // 이미 같은 집합 => 이 간선은 사이클을 만든다
  if (rank[a] < rank[b]) [a, b] = [b, a];
  parent[b] = a;
  if (rank[a] === rank[b]) rank[a]++;
  return true;
}

let cycle = 0;
for (let i = 0; i < M; i++) {
  const u = input[idx++], v = input[idx++];
  if (!union(u, v)) cycle++;
}

// 컴포넌트 수 K
let K = 0;
for (let i = 1; i <= N; i++) {
  if (find(i) === i) K++;
}

const ans = cycle + (K - 1);
console.log(ans);