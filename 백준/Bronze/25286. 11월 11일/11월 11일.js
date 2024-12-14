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
  const T = Number(input[0]); // 테스트 케이스 수
  const cases = input.slice(1).map((line) => line.split(" ").map(Number));

  const getDaysInMonth = (year, month) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  const subtractDays = (year, month, day, daysToSubtract) => {
    while (daysToSubtract > 0) {
      if (daysToSubtract >= day) {
        daysToSubtract -= day;
        month--;
        if (month === 0) {
          month = 12;
          year--;
        }
        day = getDaysInMonth(year, month);
      } else {
        day -= daysToSubtract;
        daysToSubtract = 0;
      }
    }
    return [year, month, day];
  };

  const results = cases.map(([year, month]) => {
    const day = month; // m월 m일
    const daysToSubtract = month; // m일 전
    return subtractDays(year, month, day, daysToSubtract).join(" ");
  });

  console.log(results.join("\n"));
};

solution(input);