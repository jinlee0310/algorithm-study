#include <iostream>

using namespace std;

int main()
{
    int A,B,C;
    cin >> A >> B >> C;

    int product=A*B*C;
    int arr[10]={};

    while(product>0){
        int idx=product%10;
        arr[idx]++;
        product=product/10;
    }

    for(int i=0;i<10;i++){
        cout << arr[i] << "\n";
    }
    return 0;
}