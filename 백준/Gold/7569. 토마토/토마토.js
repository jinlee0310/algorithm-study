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

class Queue {
  constructor() {
    this.storage = {};
    this.head = 0;
    this.tail = 0;
  }
  size() {
    if (this.storage[this.tail] === undefined) {
      return 0;
    } else {
      return this.tail - this.tail + 1;
    }
  }
  add(value) {
    if (this.size() === 0) {
      this.storage["0"] = value;
    } else {
      this.tail += 1;
      this.storage[this.tail] = value;
    }
    // console.log(this.storage, this.head, this.tail);
  }

  popleft() {
    let temp;
    if (this.head === this.tail) {
      temp = this.storage[this.head];
      delete this.storage[this.head];
      // 같으면 0으로 초기화
      this.head = 0;
      this.tail = 0;
    } else {
      temp = this.storage[this.head];
      delete this.storage[this.head];
      this.head++;
    }
    // console.log(this.storage, this.head, this.tail);
    return temp;
  }
}

const bfs = (graph, starts) => {
  const visited = Array.from({ length: graph.length }, () =>
    Array.from({ length: graph[0].length }, () =>
      Array(graph[0][0].length).fill(0),
    ),
  );
  const queue = new Queue();
  starts.forEach(([x, y, z]) => {
    visited[z][y][x] = 1;
    queue.add([x, y, z]);
  });

  const dx = [1, -1, 0, 0, 0, 0];
  const dy = [0, 0, 1, -1, 0, 0];
  const dz = [0, 0, 0, 0, 1, -1];

  while (queue.size()) {
    const [x, y, z] = queue.popleft();

    for (let i = 0; i < 6; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const nz = z + dz[i];

      if (
        0 <= nx &&
        nx < graph[0][0].length &&
        0 <= ny &&
        ny < graph[0].length &&
        0 <= nz &&
        nz < graph.length &&
        // visited[nz][ny][nx] === 0 &&
        graph[nz][ny][nx] === 0
      ) {
        visited[nz][ny][nx] = visited[z][y][x] + 1;
        graph[nz][ny][nx] = 1;
        queue.add([nx, ny, nz]);
      }
    }
  }
  let max = 0;
  for (let k = 0; k < graph.length; k++) {
    for (let j = 0; j < graph[0].length; j++) {
      for (let i = 0; i < graph[0][0].length; i++) {
        if (graph[k][j][i] === 0) return -1;
        max = Math.max(visited[k][j][i], max);
      }
    }
  }
  // console.log(visited);
  return max;
};

const solution = (input) => {
  const [n, m, h] = input
    .shift()
    .split(" ")
    .map((v) => Number(v));

  const graph = Array.from({ length: h }, () => []);
  for (let i = 1; i <= h; i++) {
    for (let j = 1; j <= m; j++) {
      graph[i - 1].push(input[0].split(" ").map((v) => Number(v)));
      input.shift();
    }
  }
  const starts = [];
  for (let k = 0; k < h; k++) {
    for (let j = 0; j < m; j++) {
      for (let i = 0; i < n; i++) {
        if (graph[k][j][i] === 1) {
          starts.push([i, j, k]);
        }
      }
    }
  }
  // console.log(graph);
  const time = bfs(graph, starts);
  console.log(time === -1 ? -1 : time - 1);
};

solution(input);
