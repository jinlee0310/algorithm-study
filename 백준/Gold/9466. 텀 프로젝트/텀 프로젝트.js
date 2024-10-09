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

const solution = (input) => {
  const T = Number(input[0]);

  for (let t = 0; t < T; t++) {
    const n = Number(input[t * 2 + 1]);
    const selected = input[t * 2 + 2].split(" ").map(Number);
    selected.unshift(0); // 인덱스 맞추기 위해 0 추가

    const visited = Array(n + 1).fill(false); // 방문 여부
    const done = Array(n + 1).fill(false); // 팀 결성 여부
    let answer = n;

    const dfs = (cur) => {
      let stack = [];
      while (!visited[cur]) {
        visited[cur] = true;
        stack.push(cur);
        cur = selected[cur];
      }

      // 사이클을 찾으면 처리
      if (!done[cur]) {
        let cycle_len = 0;
        while (stack.length && stack[stack.length - 1] !== cur) {
          cycle_len++;
          done[stack.pop()] = true;
        }
        done[cur] = true; // 사이클의 시작점도 처리
        answer -= cycle_len + 1; // 사이클에 속한 학생 수를 뺀다
      }

      // 탐색 완료된 학생들 처리
      while (stack.length) {
        done[stack.pop()] = true;
      }
    };

    for (let i = 1; i <= n; i++) {
      if (!visited[i]) {
        dfs(i);
      }
    }

    console.log(answer);
  }
};

solution(input);