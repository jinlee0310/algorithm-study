#include <iostream>

using namespace std;

int main()
{
    int N,M;
    cin >> N >> M;

    int minVal=min(N,M);
    int lcm=0;
    for(int i=1;i<=minVal;i++){
        if(N%i==0 && M%i==0){
            lcm=i;
        }
    }

    cout << lcm << "\n" <<(N/lcm)*(M/lcm)*lcm << "\n";
    return 0;
}