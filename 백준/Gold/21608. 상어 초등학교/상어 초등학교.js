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

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

const firstCondition = (graph, favorites) => {
  let candidates = [];
  let max = 0;
  for (let r = 0; r < graph.length; r++) {
    for (let c = 0; c < graph[0].length; c++) {
      if (graph[r][c] === 0) {
        let cnt = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];

          if (
            0 <= nr &&
            nr < graph.length &&
            0 <= nc &&
            nc < graph[0].length &&
            favorites.includes(graph[nr][nc])
          ) {
            cnt++;
          }
        }

        if (cnt > max) {
          max = cnt;
          candidates = [[r, c]];
        } else if (cnt === max) {
          candidates.push([r, c]);
        }
      }
    }
  }
  return candidates;
};

const getEmptySeat = (graph, seats) => {
  let candidates = [];

  let max = 0;
  for (const seat of seats) {
    const [r, c] = seat;
    let cnt = 0;
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (
        0 <= nr &&
        nr < graph.length &&
        0 <= nc &&
        nc < graph[0].length &&
        graph[nr][nc] === 0
      ) {
        cnt++;
      }
    }

    if (cnt > max) {
      max = cnt;
      candidates = [[r, c]];
    } else if (cnt === max) {
      candidates.push([r, c]);
    }
  }
  return candidates;
};

const calculateSatisfaction = (graph, students) => {
  let satisfaction = 0;
  for (let r = 0; r < graph.length; r++) {
    for (let c = 0; c < graph[0].length; c++) {
      const student = graph[r][c];
      const favorites = students[student];

      let cnt = 0;
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          0 <= nr &&
          nr < graph.length &&
          0 <= nc &&
          nc < graph[0].length &&
          favorites.includes(graph[nr][nc])
        ) {
          cnt++;
        }
      }
      if (cnt === 4) {
        satisfaction += 1000;
      } else if (cnt === 3) {
        satisfaction += 100;
      } else if (cnt === 2) {
        satisfaction += 10;
      } else if (cnt === 1) {
        satisfaction += 1;
      } else {
        satisfaction += 0;
      }
    }
  }
  return satisfaction;
};

const solution = (input) => {
  const N = Number(input[0]);
  const graph = Array.from({ length: N }, () => Array(N).fill(0));
  const students = Array.from({ length: N * N + 1 }, () => []);

  for (let i = 1; i <= N * N; i++) {
    const [student, ...favorites] = input[i].split(" ").map(Number);
    students[student].push(...favorites);

    let candidates = firstCondition(graph, favorites);

    if (candidates.length > 1) {
      candidates = getEmptySeat(graph, candidates);
      if (candidates.length > 1) {
        candidates.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        const [r, c] = candidates[0];
        graph[r][c] = student;
      } else if (candidates.length === 1) {
        const [r, c] = candidates[0];
        graph[r][c] = student;
      }
    } else if (candidates.length === 1) {
      const [r, c] = candidates[0];
      graph[r][c] = student;
    }
  }
  // console.log(graph);
  console.log(calculateSatisfaction(graph, students));
};

solution(input);
