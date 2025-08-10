#include <iostream>

using namespace std;

int main()
{
    int N,M;
    cin >> N >> M;

    int arr[101]={};
    for(int i=0;i<M;i++){
        int a,b,c;
        cin >> a >> b >> c;
        for(int j=a;j<=b;j++){
            arr[j]=c;
        }
    }
    for(int i=1;i<=N;i++){
        cout << arr[i] << " ";
    }
    return 0;
}