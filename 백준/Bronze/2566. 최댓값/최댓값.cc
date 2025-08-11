#include <iostream>

using namespace std;

int main()
{
    int max=-1;
    int r,c;

    for(int i=0;i<9;i++){
        for(int j=0;j<9;j++){
            int num;
            cin >> num;
            if(num>max){
                max=num;
                r=i;
                c=j;
            }
        }
    }
    cout << max << "\n" << r+1 << " " << c+1 << endl;
    return 0;
}