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

const inorder = (tree, visited, cur, result = []) => {
  for (let node of tree[cur]) {
    if (!visited[node]) {
      result.push(node);
      visited[node] = true;
      inorder(tree, visited, node, result);
    }
  }
  return result;
};

const solution = (input) => {
  const K = Number(input[0]);
  const order = input[1].split(" ").map(Number);

  const tree = Array.from({ length: K }, () => []);

  const buildTree = (arr, depth) => {
    if (arr.length === 0) return;

    const mid = Math.floor(arr.length / 2);
    tree[depth].push(arr[mid]);

    buildTree(arr.slice(0, mid), depth + 1); // 왼쪽 서브트리
    buildTree(arr.slice(mid + 1), depth + 1); // 오른쪽 서브트리
  };

  buildTree(order, 0);

  tree.forEach((level) => {
    console.log(level.join(" "));
  });
};

solution(input);
