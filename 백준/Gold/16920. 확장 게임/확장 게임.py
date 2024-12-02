import sys
from collections import deque
input = sys.stdin.readline

n, m, p = map(int, input().split())  # 격자 크기와 플레이어 수
castle = [deque() for _ in range(p + 1)]  # 각 플레이어의 성 위치를 저장
power = [0] + list(map(int, input().split()))  # 각 플레이어의 이동 거리
graph = [list(input().rstrip()) for _ in range(n)]  # 격자판 상태
cnt = [0] * (p + 1)  # 각 플레이어의 성의 수

# 초기 성 위치 저장 및 초기 성의 수 계산
for i in range(n):
    for j in range(m):
        if graph[i][j].isdigit():
            player_index = int(graph[i][j])
            castle[player_index].append((i, j))
            cnt[player_index] += 1

# 4방향 이동 정의
directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

# BFS를 통한 확장
def expand_game():
    while any(castle):
        for player_index in range(1, p + 1):
            for _ in range(power[player_index]):
                if not castle[player_index]:
                    break
                for _ in range(len(castle[player_index])):
                    x, y = castle[player_index].popleft()
                    for dx, dy in directions:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < n and 0 <= ny < m and graph[nx][ny] == '.':
                            graph[nx][ny] = str(player_index)
                            cnt[player_index] += 1
                            castle[player_index].append((nx, ny))

expand_game()

# 결과 출력
print(" ".join(map(str, cnt[1:])))