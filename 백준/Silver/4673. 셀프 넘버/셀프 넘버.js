const solution = () => {
  const dp = new Array(10001).fill(0);
  for (let i = 1; i < dp.length; i++) {
    if (dp[i] === 1) {
      continue;
    } else {
      let d = i;

      while (d < 10001) {
        d =
          d +
          d
            .toString()
            .split("")
            .map((v) => Number(v))
            .reduce((acc, cur) => acc + cur, 0);
        dp[d] = 1;
      }
    }
  }
  for (let i = 1; i <= dp.length; i++) {
    if (dp[i] === 0) console.log(i);
  }
};

solution();
