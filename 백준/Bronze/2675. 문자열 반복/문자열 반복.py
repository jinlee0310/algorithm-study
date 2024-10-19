import sys

T=int(sys.stdin.readline())

for i in range(T):
  R,S=sys.stdin.readline().split(' ')
  R=int(R)
  str=''
  for j in range(len(S)-1):
    str+=S[j]*R
  print(str)