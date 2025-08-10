#include <iostream>

using namespace std;

int main()
{
    int N,M;

    cin >> N >> M;
    
    int arr[N+1];
    for(int i=1;i<=N;i++){
        arr[i]=i;
    }
    for(int i=0;i<M;i++){
        int a,b;
        cin >> a >> b;
        int temp;
        temp=arr[a];
        arr[a]=arr[b];
        arr[b]=temp;
    }
    
    for(int i=1;i<=N;i++){
        cout << arr[i] << " ";
    }
    return 0;
}