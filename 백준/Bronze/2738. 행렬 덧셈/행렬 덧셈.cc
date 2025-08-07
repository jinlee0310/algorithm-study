#include <iostream>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N,M;
    cin >> N >> M;

    int arr1[N][M], arr2[N][M];

    for(int i=0;i<N;i++){
        for(int j=0;j<M;j++){
            cin >>arr1[i][j];
        }
    }
    for(int i=0;i<N;i++){
        for(int j=0;j<M;j++){
            cin >>arr2[i][j];
        }
    }

    for(int i=0;i<N;i++){
        for(int j=0;j<M;j++){
            cout << arr1[i][j]+arr2[i][j]<<" ";
        }
        cout << "\n";
    }

    return 0;
}