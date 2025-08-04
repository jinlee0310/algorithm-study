#include <iostream>

using namespace std;

int main()
{
    int N,X;
    cin >> N >> X;

    int arr[N];

    for (int i = 0; i < N; i++) {
        int a;
        cin >> a;
        if (a < X) {
            cout << a << ' ';
        }
    }
    cout << '\n';


    return 0;
}