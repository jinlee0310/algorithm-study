import sys

A=int(sys.stdin.readline())
B=int(sys.stdin.readline())

b1=B//100
b2=(B%100)//10
b3=((B%100)%10)

print(A*b3)
print(A*b2)
print(A*b1)
print(A*B)