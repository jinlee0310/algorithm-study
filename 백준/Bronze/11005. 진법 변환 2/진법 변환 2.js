// BOJ 11005 - 진법 변환 2
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(
  process.platform === 'linux' ? '/dev/stdin' : path.join(__dirname, 'input.txt'),
  'utf8'
).trim().split(' ').map(Number);

const [N, B] = input;

console.log(N.toString(B).toUpperCase());