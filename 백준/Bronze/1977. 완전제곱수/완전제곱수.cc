#include <iostream>

using namespace std;

int main()
{
    int N,M;
    cin >> M >> N;

    int st=0;
    for(int i=1;i*i<M;i++){
        st=i;
    }

    int sum=0;
    for(int i=(st+1);i*i<=N;i++){
        sum+=(i*i);
    }
    if(sum==0){
        cout << -1;
    }else{
        cout << sum << "\n" << (st+1)*(st+1);
    }

    return 0;
}