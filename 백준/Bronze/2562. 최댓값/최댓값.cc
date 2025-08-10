#include <iostream>

using namespace std;

int main()
{
    int max=0;
    int idx=0;
    for(int i=1;i<=9;i++){
        int num;
        cin >> num;
        if(num>max){
            max=num;
            idx=i;
        }
    }
    cout <<max << "\n" << idx << endl;
}