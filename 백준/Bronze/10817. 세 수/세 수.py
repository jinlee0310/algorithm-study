import sys

A,B,C=map(int,sys.stdin.readline().split(' '))

def second_largest(A, B, C):
    numbers = [A, B, C]
    numbers.sort()  # 정렬 후
    return numbers[1]  # 두 번째로 큰 값 반환


print(second_largest(A,B,C))

