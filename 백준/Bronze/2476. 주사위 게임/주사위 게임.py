import sys

def calculate_prize(dice):
    a, b, c = dice
    if a == b == c:
        return 10000 + a * 1000 
    elif a == b or a == c:
        return 1000 + a * 100
    elif b == c:
        return 1000 + b * 100
    else:
        return max(a, b, c) * 100

def main():
    N = int(sys.stdin.readline())
    max_prize = 0

    for _ in range(N):
        dice = list(map(int, sys.stdin.readline().split(' ')))
        prize = calculate_prize(dice)
        if prize > max_prize:
            max_prize = prize

    print(max_prize)

main()