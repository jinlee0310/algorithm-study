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

const bfs = (graph, start, end) => {
  const visited = Array.from({ length: graph.length }, () =>
    Array.from({ length: graph[0].length }, () =>
      Array(graph[0][0].length).fill(0),
    ),
  );
  const queue = [start];

  const dx = [1, -1, 0, 0, 0, 0];
  const dy = [0, 0, 1, -1, 0, 0];
  const dz = [0, 0, 0, 0, 1, -1];

  while (queue.length) {
    const [x, y, z] = queue.shift();
    if (x === end[0] && y === end[1] && z === end[2]) break;

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
        (graph[nz][ny][nx] === "." || graph[nz][ny][nx] === "E") &&
        visited[nz][ny][nx] === 0
      ) {
        visited[nz][ny][nx] = visited[z][y][x] + 1;
        queue.push([nx, ny, nz]);
      }
    }
  }
  // console.log(visited);
  return visited[end[2]][end[1]][end[0]];
};

const solution = (input) => {
  let index = 0;

  while (true) {
    // 첫 번째 줄에서 L, R, C를 가져옴
    const [L, R, C] = input[index].split(" ").map(Number);
    index++;

    // L, R, C가 모두 0이면 입력 종료
    if (L === 0 && R === 0 && C === 0) break;

    // 현재 테스트 케이스의 빌딩 정보 저장
    let building = [];
    for (let i = 0; i < L; i++) {
      let floor = [];
      for (let j = 0; j < R; j++) {
        floor.push(input[index].split(""));
        index++;
      }
      building.push(floor);
      index++; // 층 사이의 빈 줄 건너뜀
    }

    // console.log("L:", L, "R:", R, "C:", C);
    // console.log("Building:", building);
    const start = [];
    const end = [];
    for (let k = 0; k < L; k++) {
      for (let j = 0; j < R; j++) {
        for (let i = 0; i < C; i++) {
          if (building[k][j][i] === "S") {
            start.push(i, j, k);
          } else if (building[k][j][i] === "E") {
            end.push(i, j, k);
          }
        }
      }
    }

    const sec = bfs(building, start, end);
    console.log(sec === 0 ? "Trapped!" : `Escaped in ${sec} minute(s).`);
  }
};

solution(input);
