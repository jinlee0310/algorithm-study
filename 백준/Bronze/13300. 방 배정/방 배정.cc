#include <iostream>

using namespace std;

int main()
{
    int N,K;
    cin >> N >> K;

    int arr[1001][2]={0,};
    for(int i=0;i<N;i++){
        int S,Y;
        cin >> S >> Y;

        arr[Y][S]++;
    }
    int cnt=0;
    for(int i=0;i<1001;i++){
        if(arr[i][0]>0){
            if(arr[i][0]%K!=0){
                cnt++;
            }
            cnt+=(arr[i][0]/K);
        }
        if(arr[i][1]>0){
            if(arr[i][1]%K!=0){
                cnt++;
            }
            cnt+=(arr[i][1]/K);
        }
    }
    cout << cnt;
    return 0;
}