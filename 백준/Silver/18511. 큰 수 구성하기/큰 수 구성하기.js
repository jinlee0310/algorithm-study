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
  const [N, kSize] = input[0].split(" ").map(Number);
  const K = input[1].split(" ").map(Number).sort((a, b) => b - a); // 내림차순 정렬
  const strN = N.toString();
  const lenN = strN.length;

  let result = "";

  for (let i = 0; i < lenN; i++) {
    let found = false;
    for (let j = 0; j < K.length; j++) {
      if (K[j] <= Number(strN[i])) {
        result += K[j];
        found = true;

        // 현재 자릿수가 N보다 작으면 이후는 최대값으로 채우기
        if (K[j] < Number(strN[i])) {
          result += K[0].toString().repeat(lenN - i - 1);
          console.log(result);
          return;
        }
        break;
      }
    }

    // 만약 현재 자릿수에 넣을 수 있는 값이 없다면 이전 자리 줄이기
    if (!found) {
      let idx = i - 1;

      while (idx >= 0) {
        const curNum = Number(result[idx]);

        // 현재 자리에서 가능한 작은 수를 찾는다
        let nextSmaller = -1;
        for (let j = 0; j < K.length; j++) {
          if (K[j] < curNum) {
            nextSmaller = K[j];
            break;
          }
        }

        // 작은 수를 찾았다면, 이후 자릿수를 최대값으로 채우기
        if (nextSmaller !== -1) {
          result = result.slice(0, idx) + nextSmaller;
          result += K[0].toString().repeat(lenN - idx - 1);
          console.log(result);
          return;
        }

        idx--;
      }

      // 만약 이전 자리에서도 불가능하면 한 자릿수 줄이기
      result = K[0].toString().repeat(lenN - 1);
      console.log(result);
      return;
    }
  }

  console.log(result);
};

solution(input);