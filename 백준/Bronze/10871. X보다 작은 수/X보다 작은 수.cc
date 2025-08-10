#include <iostream>

using namespace std;

int main()
{
    cin.tie(NULL);
    ios::sync_with_stdio(false);

    int N,X;
    cin >> N >> X;

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