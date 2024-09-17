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

class Tree {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  insert = (value, left, right) => {
    const tree = new Tree(value, left, right);
    if (value === this.left) {
      this.left = tree;
    } else if (value === this.right) {
      this.right = tree;
    }
  };
  traverse = () => {
    console.log(this.value);
    if (this?.left) {
      console.log(this.left);
      this.left.traverse();
    }
  };
}

const preorder = (tree, node, order) => {
  if (node === ".") return;
  order.push(node);
  preorder(tree, tree[node][0], order);
  preorder(tree, tree[node][1], order);
};

const inorder = (tree, node, order) => {
  if (node === ".") return;
  inorder(tree, tree[node][0], order);
  order.push(node);
  inorder(tree, tree[node][1], order);
};

const postorder = (tree, node, order) => {
  if (node === ".") return;
  postorder(tree, tree[node][0], order);
  postorder(tree, tree[node][1], order);
  order.push(node);
};

const solution = (input) => {
  const n = Number(input[0]);
  const tree = {};
  for (let i = 1; i <= n; i++) {
    const [root, left, right] = input[i].split(" ");
    tree[root] = [left, right];
  }
  // console.log(tree);
  const orders = [[], [], []];
  preorder(tree, "A", orders[0]);
  inorder(tree, "A", orders[1]);
  postorder(tree, "A", orders[2]);
  orders.forEach((order) => console.log(order.join("")));
};

solution(input);
