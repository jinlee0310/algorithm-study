#include <iostream>

using namespace std;

bool isPrime(int N)
{
    if(N==1) return false;
    for(int i=2;i<N;i++){
        if(N%i==0) return false;
    }
    return true;
}

int main()
{
    int N;
    cin >> N;

    int cnt=0;
    for(int i=0;i<N;i++){
        int n;
        cin >> n;
        if(isPrime(n)) cnt++;
    }
    cout << cnt;
}