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

const moves = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const DARK = 0;
const LIGHT = 1;
const isIn = (r, c, N) => 0 <= r && r < N && 0 <= c && c < N;

const bfs = (switches, room) => {
  const N = room.length;
  const queue = [[0, 0]];
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[0][0] = true;

  let lightRoom = 1;  // 시작 방은 이미 불이 켜져 있음
  let newLight = true;

  while (newLight) {
    newLight = false;
    const nextQueue = [];

    while (queue.length) {
      const [r, c] = queue.shift();

      // 현재 방에서 불을 켜는 스위치 작동
      for (const [sr, sc] of switches[r][c]) {
        if (room[sr][sc] === DARK) {
          room[sr][sc] = LIGHT;
          lightRoom++;
          newLight = true;

          // 불이 켜진 방이 방문 가능한지 체크
          for (const [dr, dc] of moves) {
            const nr = sr + dr;
            const nc = sc + dc;
            if (isIn(nr, nc, N) && visited[nr][nc]) {
              nextQueue.push([sr, sc]);
              visited[sr][sc] = true;
              break;
            }
          }
        }
      }

      // 상하좌우로 이동 가능한 방 탐색
      for (const [dr, dc] of moves) {
        const nr = r + dr;
        const nc = c + dc;

        if (isIn(nr, nc, N) && !visited[nr][nc] && room[nr][nc] === LIGHT) {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    queue.push(...nextQueue);
  }

  return lightRoom;
};

const solution = (input) => {
  const [N, M] = input[0].split(" ").map(Number);
  const switches = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );
  const room = Array.from({ length: N }, () => Array(N).fill(DARK));
  room[0][0] = LIGHT;

  for (let i = 1; i <= M; i++) {
    const [x, y, a, b] = input[i].split(" ").map(Number);
    switches[x - 1][y - 1].push([a - 1, b - 1]);
  }

  const answer = bfs(switches, room);
  console.log(answer);
};

solution(input);