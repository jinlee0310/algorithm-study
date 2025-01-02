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

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const findStart = (graph, keys) => {
  let path = 0;
  let paperCnt = 0;
  const R = graph.length,
    C = graph[0].length;

  const starts = [];
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (r === 0 && graph[r][c] !== "*") {
        if (alphabets.includes(graph[r][c])) {
          if (keys.includes(graph[r][c].toLowerCase())) {
            graph[r][c] = ".";
          }
          starts.push([r, c]);
        } else if (alphabets.toLowerCase().includes(graph[r][c])) {
          keys.push(graph[r][c]);
          graph[r][c] = ".";
          starts.push([r, c]);
        } else if (graph[r][c] === ".") {
          starts.push([r, c]);
        } else if (graph[r][c] === "$") {
          paperCnt++;
          graph[r][c] = ".";
          starts.push([r, c]);
        }
      } else if (c === 0 && graph[r][c] !== "*") {
        if (alphabets.includes(graph[r][c])) {
          if (keys.includes(graph[r][c].toLowerCase())) {
            graph[r][c] = ".";
          }
          starts.push([r, c]);
        } else if (alphabets.toLowerCase().includes(graph[r][c])) {
          keys.push(graph[r][c]);
          graph[r][c] = ".";
          starts.push([r, c]);
        } else if (graph[r][c] === ".") {
          starts.push([r, c]);
        } else if (graph[r][c] === "$") {
          paperCnt++;
          graph[r][c] = ".";
          starts.push([r, c]);
        }
      } else if (r === R - 1 && graph[r][c] !== "*") {
        if (alphabets.includes(graph[r][c])) {
          if (keys.includes(graph[r][c].toLowerCase())) {
            graph[r][c] = ".";
          }
          starts.push([r, c]);
        } else if (alphabets.toLowerCase().includes(graph[r][c])) {
          keys.push(graph[r][c]);
          graph[r][c] = ".";
          starts.push([r, c]);
        } else if (graph[r][c] === ".") {
          starts.push([r, c]);
        } else if (graph[r][c] === "$") {
          paperCnt++;
          graph[r][c] = ".";
          starts.push([r, c]);
        }
      } else if (c === C - 1 && graph[r][c] !== "*") {
        if (alphabets.includes(graph[r][c])) {
          if (keys.includes(graph[r][c].toLowerCase())) {
            graph[r][c] = ".";
          }
          starts.push([r, c]);
        } else if (alphabets.toLowerCase().includes(graph[r][c])) {
          keys.push(graph[r][c]);
          graph[r][c] = ".";
          starts.push([r, c]);
        } else if (graph[r][c] === ".") {
          starts.push([r, c]);
        } else if (graph[r][c] === "$") {
          paperCnt++;
          graph[r][c] = ".";
          starts.push([r, c]);
        }
      }
      if (graph[r][c] === ".") path++;
    }
  }
  return { starts, path, paperCnt };
};

const openDoor = (graph, start, keys) => {
  const str = graph[start[0]][start[1]];
  if (alphabets.includes(str) && !keys.includes(str.toLowerCase())) return;

  const R = graph.length,
    C = graph[0].length;
  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  visited[start[0]][start[1]] = true;
  const queue = [start];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (0 <= nr && nr < R && 0 <= nc && nc < C && !visited[nr][nc]) {
        if (graph[nr][nc] === ".") {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        } else if (
          alphabets.includes(graph[nr][nc]) &&
          keys.includes(graph[nr][nc].toLowerCase())
        ) {
          graph[nr][nc] = ".";
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        } else if (alphabets.toLowerCase().includes(graph[nr][nc])) {
          keys.push(graph[nr][nc]);
          graph[nr][nc] = ".";
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        } else if (graph[nr][nc] === "$") {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        }
      }
    }
  }
};

const findPaper = (graph, starts, keys) => {
  const queue = [];
  for (let start of starts) {
    const str = graph[start[0]][start[1]];
    if (alphabets.includes(str) && !keys.includes(str.toLowerCase())) continue;

    queue.push(start);
  }
  const R = graph.length,
    C = graph[0].length;
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  let paperCnt = 0;

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (0 <= nr && nr < R && 0 <= nc && nc < C && !visited[nr][nc]) {
        if (graph[nr][nc] === ".") {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
        } else if (graph[nr][nc] === "$") {
          queue.push([nr, nc]);
          visited[nr][nc] = true;
          paperCnt++;
        }
      }
    }
  }
  return paperCnt;
};

const countPath = (graph) => {
  let path = 0;
  for (let r = 0; r < graph.length; r++) {
    for (let c = 0; c < graph[0].length; c++) {
      if (graph[r][c] === ".") path++;
    }
  }
  return path;
};

const solution = (graph, keys) => {
  const { starts, path, paperCnt } = findStart(graph, keys);

  let prevPath = path;
  while (true) {
    starts.forEach((start) => openDoor(graph, start, keys));
    const path = countPath(graph);

    if (prevPath === path) break;
    else prevPath = path;
  }
  const answer = findPaper(graph, starts, keys);
  return answer + paperCnt;
};

const main = (input) => {
  const T = Number(input[0]);
  let lineIdx = 1;
  const answers = [];
  for (let t = 0; t < T; t++) {
    const [h, w] = input[lineIdx].split(" ").map(Number);
    lineIdx++;

    const graph = [];
    for (let i = 0; i < h; i++) {
      graph.push(input[lineIdx].split(""));
      lineIdx++;
    }
    const keys = input[lineIdx].split("");
    lineIdx++;
    const answer = solution(graph, keys);
    answers.push(answer);
  }
  console.log(answers.join("\n"));
};

main(input);
