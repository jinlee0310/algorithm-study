function solution(queue1, queue2) {
  const totalQueue = queue1.concat(queue2);
  const totalSum = totalQueue.reduce((a, b) => a + b, 0);

  // 1. 두 큐의 합이 홀수면 -1 반환
  if (totalSum % 2 !== 0) return -1;

  const target = totalSum / 2;

  let sum1 = queue1.reduce((a, b) => a + b, 0);
  let sum2 = queue2.reduce((a, b) => a + b, 0);
  let start = 0;
  let end = queue1.length;

  const n = totalQueue.length;
  let count = 0;
  const maxCount = n * 2;

  // 2. 투 포인터를 사용해 두 큐의 합이 target과 같은 경우 찾기
  while (sum1 !== target) {
    // 모든 경우를 탐색해도 안 되면 -1 반환
    if (count > maxCount) return -1;

    if (sum1 < target) {
      // 큐2에서 큐1로 값을 옮김
      sum1 += totalQueue[end % n];
      sum2 -= totalQueue[end % n];
      end++;
    } else {
      // 큐1에서 값을 제거
      sum1 -= totalQueue[start % n];
      sum2 += totalQueue[start % n];
      start++;
    }
    count++;
  }
  return count;
}