const fs = require("fs");
const path = require("path");
const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "/input.txt"),
  )
  .toString()
  .trim();

const solution = (input) => {
  const [F, S, G, U, D] = input.split(" ").map(Number);

  const bfs = () => {
    const visited = Array(F).fill(0);
    visited[S - 1] = 1;

    const queue = [S - 1];
    const move = [U, -1 * D];

    while (queue.length) {
      const cur = queue.shift();
      if (cur === G - 1) {
        return visited[G - 1];
      }

      for (let i = 0; i < 2; i++) {
        const next = cur + move[i];

        if (0 <= next && next < visited.length && visited[next] === 0) {
          visited[next] = visited[cur] + 1;
          queue.push(next);
        }
      }
    }
  };
  const answer = bfs();

  console.log(answer ? answer - 1 : "use the stairs");
};

solution(input);
