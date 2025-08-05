#include <iostream>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    int arr[N]; // 정수 10개 저장할 배열

    for (int i = 0; i < N; i++) {
        cin >> arr[i]; // 공백 기준으로 자동으로 나눠서 입력됨
    }

    int v;
    cin >> v;

    int cnt=0;

    for(int i=0;i<N;i++){
        if(arr[i]==v) cnt++;
    }

    cout << cnt;
    return 0;

}