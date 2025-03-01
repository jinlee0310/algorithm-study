from collections import deque
import sys

input=sys.stdin.readline
n=input().strip()
lst=list(map(int,input().split()))

def solution(input_data):
    deque_list = deque([[int(v), idx + 1] for idx, v in enumerate(input_data)])
    answer = []

    v, idx = deque_list.popleft()  # 첫 번째 요소 제거
    answer.append(idx)

    while deque_list:
        if v > 0:
            for _ in range(v):
                node = deque_list.popleft()
                deque_list.append(node)
            v, idx = deque_list.pop()  # 오른쪽 끝에서 하나 제거
            answer.append(idx)
        else:
            for _ in range(abs(v)):
                node = deque_list.pop()
                deque_list.appendleft(node)
            v, idx = deque_list.popleft()  # 왼쪽 끝에서 하나 제거
            answer.append(idx)

    print(" ".join(map(str, answer)))


solution(lst)