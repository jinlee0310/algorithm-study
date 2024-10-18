import sys

T=int(sys.stdin.readline())

arr=[350.34,230.90,190.55,125.30,180.90]

for i in range(T):
  a,b,c,d,e=map(int,sys.stdin.readline().split(' '))
  num=a*arr[0]+b*arr[1]+c*arr[2]+d*arr[3]+e*arr[4]
  print('${:.2f}'.format(num))