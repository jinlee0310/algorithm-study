#include <iostream>
#include <cmath>

using namespace std;

int main()
{
    cin.tie(NULL);
    ios::sync_with_stdio(false);
    
    int N;
    cin >> N;

    int min=pow(10,6)+1;
    int max=pow(10,6)*(-1)-1;

    for(int i=0;i<N;i++){
        int num;
        cin >> num;

        if(num<min){
            min=num;
        }
        if(num>max){
            max=num;
        }
    }
    cout << min<< " " <<max << endl;

    return 0;
}