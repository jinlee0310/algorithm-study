#include <iostream>
using namespace std;

int main() {
    double A, B;
    cin >> A >> B;
    cout.precision(12);      // 소수점 10자리까지 출력
    cout << fixed << A / B;  // fixed를 사용해 소수점 고정
    return 0;
}