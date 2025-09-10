#include <iostream>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    int arr[N];
    for(int i=0;i<N;i++){
        cin >> arr[i];
    }

    for(int i=0;i<N;i++){
        for(int j=0;j<N-i-1;j++){
            if(arr[j]>arr[j+1]) swap(arr[j],arr[j+1]);
        }
    }

    for(int i=0;i<N;i++){
        cout << arr[i] << "\n";
    }
    return 0;
}