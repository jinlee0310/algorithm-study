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

const tornado = (N, grid) => {
  // 흩날림 비율 설정 (왼쪽, 아래, 오른쪽, 위 순서)
  const spread = {
    left: [
      [-1, 1, 0.01],
      [1, 1, 0.01],
      [-1, 0, 0.07],
      [1, 0, 0.07],
      [-2, 0, 0.02],
      [2, 0, 0.02],
      [-1, -1, 0.1],
      [1, -1, 0.1],
      [0, -2, 0.05],
    ],
    down: [
      [-1, -1, 0.01],
      [-1, 1, 0.01],
      [0, -1, 0.07],
      [0, 1, 0.07],
      [0, -2, 0.02],
      [0, 2, 0.02],
      [1, -1, 0.1],
      [1, 1, 0.1],
      [2, 0, 0.05],
    ],
    right: [
      [-1, -1, 0.01],
      [1, -1, 0.01],
      [-1, 0, 0.07],
      [1, 0, 0.07],
      [-2, 0, 0.02],
      [2, 0, 0.02],
      [-1, 1, 0.1],
      [1, 1, 0.1],
      [0, 2, 0.05],
    ],
    up: [
      [1, -1, 0.01],
      [1, 1, 0.01],
      [0, -1, 0.07],
      [0, 1, 0.07],
      [0, -2, 0.02],
      [0, 2, 0.02],
      [-1, -1, 0.1],
      [-1, 1, 0.1],
      [-2, 0, 0.05],
    ],
  };

  // 방향 이동 (왼쪽, 아래, 오른쪽, 위 순서)
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  // 토네이도 중심 시작 위치
  let x = Math.floor(N / 2);
  let y = Math.floor(N / 2);

  let direction = 0; // 초기 방향 (왼쪽)
  let steps = 1; // 초기 이동 단계
  let outSand = 0;

  const inBounds = (nx, ny) => nx >= 0 && ny >= 0 && nx < N && ny < N;

  while (steps < N) {
    for (let i = 0; i < 2; i++) {
      for (let step = 0; step < steps; step++) {
        // 토네이도 이동
        const [dx, dy] = directions[direction];
        x += dx;
        y += dy;

        if (x < 0 || y < 0) return outSand;

        // 모래 흩날림 계산
        const spreadPattern = Object.values(spread)[direction];
        let totalSpread = 0;

        for (const [sx, sy, ratio] of spreadPattern) {
          const nx = x + sx;
          const ny = y + sy;
          const sand = Math.floor(grid[x][y] * ratio);

          if (inBounds(nx, ny)) {
            grid[nx][ny] += sand;
          } else {
            outSand += sand;
          }
          totalSpread += sand;
        }

        // 알파 위치 모래 계산
        const alphaX = x + directions[direction][0];
        const alphaY = y + directions[direction][1];
        const alphaSand = grid[x][y] - totalSpread;

        if (inBounds(alphaX, alphaY)) {
          grid[alphaX][alphaY] += alphaSand;
        } else {
          outSand += alphaSand;
        }

        grid[x][y] = 0; // 현재 위치 모래 제거
      }
      direction = (direction + 1) % 4; // 방향 변경
    }
    steps++;
  }

  // 마지막 N칸 처리
  for (let step = 0; step < N - 1; step++) {
    const [dx, dy] = directions[direction];
    x += dx;
    y += dy;

    if (x < 0 || y < 0) return outSand;

    // 모래 흩날림 계산
    const spreadPattern = Object.values(spread)[direction];
    let totalSpread = 0;

    for (const [sx, sy, ratio] of spreadPattern) {
      const nx = x + sx;
      const ny = y + sy;
      const sand = Math.floor(grid[x][y] * ratio);

      if (inBounds(nx, ny)) {
        grid[nx][ny] += sand;
      } else {
        outSand += sand;
      }
      totalSpread += sand;
    }

    // 알파 위치 모래 계산
    const alphaX = x + directions[direction][0];
    const alphaY = y + directions[direction][1];
    const alphaSand = grid[x][y] - totalSpread;

    if (inBounds(alphaX, alphaY)) {
      grid[alphaX][alphaY] += alphaSand;
    } else {
      outSand += alphaSand;
    }

    grid[x][y] = 0; // 현재 위치 모래 제거
  }

  return outSand;
};

const solution = (input) => {
  const N = Number(input[0]);
  const grid = input.slice(1).map((line) => line.split(" ").map(Number));
  console.log(tornado(N, grid));
};

solution(input);
