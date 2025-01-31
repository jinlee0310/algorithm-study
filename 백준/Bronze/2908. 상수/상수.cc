#include <iostream>
#include <algorithm>

using namespace std;

// 문자열을 뒤집고 정수로 변환하는 함수
int reverseNumber(int num) {
    string str = to_string(num);
    reverse(str.begin(), str.end());
    return stoi(str);
}

int main() {
    int a, b;
    cin >> a >> b;

    // 두 숫자를 뒤집어서 비교
    int revA = reverseNumber(a);
    int revB = reverseNumber(b);

    // 더 큰 숫자 출력
    cout << max(revA, revB) << endl;

    return 0;
}