#include <iostream>

using namespace std;

int main()
{
    ios::sync_with_stdio(0);
	cin.tie(nullptr);

    int n;
    cin >> n;
    int num_arr[n];
    for(int i=0;i<n;i++){
        cin >> num_arr[i];
    }
    int x;
    cin >> x;
    int arr[2000001]={0,};

    int cnt=0;
    for(int i=0;i<n;i++){
        int num=num_arr[i];
        if(arr[num]==1){
            cnt++;
        }
        else{
            if(x-num>0){
                arr[x-num]=1;
            }
        }
    }
    cout << cnt;
    return 0;
}