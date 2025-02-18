function solution(n, m, x, y, r, c, k) {
  // 이동할 수 있는 4가지 방향을 알파벳 순서대로 (아래, 왼쪽, 오른쪽, 위) 정의
  const directions = [
    [1, 0, "d"],
    [0, -1, "l"], 
    [0, 1, "r"], 
    [-1, 0, "u"],
  ];

  // 현재 위치 (x, y)가 미로 내에 있는지 확인하는 함수
  const isValid = (x, y) => x >= 1 && x <= n && y >= 1 && y <= m;

  // 현재 위치에서 목표 지점 (r, c)까지의 최소 거리를 반환하는 함수
  const getDistance = (x, y) => Math.abs(r - x) + Math.abs(c - y);

  // 탈출 지점까지 이동할 수 없는 경우 "impossible"을 반환
  if (getDistance(x, y) > k || k % 2 !== getDistance(x, y) % 2)
    return "impossible";

  let answer = "";
  while (k > 0) {
    // k번 이동해야 하므로 k가 0이 될 때까지 반복
    for (const [dx, dy, dir] of directions) {
      // 가능한 4가지 방향에 대해 탐색 시작
      const nx = x + dx; 
      const ny = y + dy; 

      // 이동할 칸이 미로 내에 있고, 해당 칸을 통해 탈출 지점까지 이동 가능한 경우
      if (isValid(nx, ny) && k >= getDistance(nx, ny)) {
        answer += dir; // 해당 방향 문자를 결과 문자열에 추가
        x = nx; 
        y = ny; 
        k--; // 남은 이동 횟수 감소
        break; 
      }
    }
  }

  return answer;
}