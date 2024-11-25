import sys
from collections import deque

def main():
  N=int(sys.stdin.readline())
  lst=deque([])
  for i in range(N):
    lst.append(i+1)
  while len(lst)>1:
    lst.popleft()
    a=lst.popleft()
    lst.append(a)
  print(lst[0])

main()