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

const rolling = (x, y, graph, ops) => {
  const dice = [0, 0, 0, 0, 0, 0];

  const moves = [
    [0, 1], // 동쪽
    [0, -1], // 서쪽
    [-1, 0], // 북쪽
    [1, 0], // 남쪽
  ];

  // 주사위 면 변경 규칙
  const dir = [
    [3, 1, 0, 5, 4, 2], // 동쪽: 1이 3으로, 3이 바닥(1)으로, 5와 2가 상하
    [2, 1, 5, 0, 4, 3], // 서쪽: 3이 5로, 5가 바닥(1)으로, 0과 2가 상하
    [4, 0, 2, 3, 5, 1], // 북쪽: 1이 4로, 4가 바닥(1)으로, 1과 5가 상하
    [1, 5, 2, 3, 0, 4], // 남쪽: 4가 바닥, 5가 위로 가며 0과 1이 바뀜
  ];

  ops.forEach((op) => {
    // 다음 이동 좌표
    const nx = x + moves[op - 1][0];
    const ny = y + moves[op - 1][1];

    // 지도를 벗어나는지 확인
    if (nx >= 0 && nx < graph.length && ny >= 0 && ny < graph[0].length) {
      // 주사위 면 갱신
      const newDice = [...dice];
      for (let i = 0; i < 6; i++) {
        newDice[i] = dice[dir[op - 1][i]];
      }
      dice.splice(0, 6, ...newDice); // dice 배열 업데이트

      // 위치 갱신
      x = nx;
      y = ny;

      // 지도와 주사위의 바닥면 값을 비교하여 업데이트
      if (graph[x][y] === 0) {
        graph[x][y] = dice[5]; // 주사위 바닥면 값을 지도에 복사
      } else {
        dice[5] = graph[x][y]; // 지도 값을 주사위 바닥면에 복사
        graph[x][y] = 0; // 지도 위치를 0으로 초기화
      }

      // 주사위 상단면 값 출력 (dice[0])
      console.log(dice[0]);
    }
  });
};

const solution = (input) => {
  const [N, M, x, y, K] = input[0].split(" ").map(Number);

  const graph = [];
  for (let i = 1; i <= N; i++) {
    graph.push(input[i].split(" ").map(Number));
  }
  const op = input[input.length - 1].split(" ").map(Number);
  rolling(x, y, graph, op);
};

solution(input);
